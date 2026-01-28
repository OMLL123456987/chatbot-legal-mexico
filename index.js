const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  const input = (req.body.pregunta || "").toLowerCase();

  /* =========================
     ESTADOS
  ========================= */
  const estados = {
    "cdmx": "Ciudad de México",
    "ciudad de mexico": "Ciudad de México",
    "jalisco": "Jalisco",
    "nuevo leon": "Nuevo León",
    "estado de mexico": "Estado de México",
    "edomex": "Estado de México",
    "puebla": "Puebla",
    "queretaro": "Querétaro",
    "guanajuato": "Guanajuato",
    "veracruz": "Veracruz",
    "sonora": "Sonora",
    "sinaloa": "Sinaloa",
    "chihuahua": "Chihuahua",
    "coahuila": "Coahuila",
    "tamaulipas": "Tamaulipas",
    "yucatan": "Yucatán",
    "quintana roo": "Quintana Roo",
    "baja california": "Baja California"
  };

  let estado = "No detectado";
  for (let e in estados) {
    if (input.includes(e)) estado = estados[e];
  }

  /* =========================
     EDAD
  ========================= */
  let edad = "No indicada";
  const edadMatch = input.match(/\b\d{2}\b/);
  if (edadMatch) edad = edadMatch[0] + " años";

  /* =========================
     MATERIA
  ========================= */
  let materia = "No determinada";

  if (
    input.includes("robo") || input.includes("robe") ||
    input.includes("arma") || input.includes("lesion") ||
    input.includes("matar") || input.includes("amenaza") ||
    input.includes("fraude") || input.includes("extorsion")
  ) materia = "PENAL";

  if (
    input.includes("debo") || input.includes("deuda") ||
    input.includes("banco") || input.includes("contrato")
  ) materia = "CIVIL / MERCANTIL";

  if (
    input.includes("divorcio") || input.includes("custodia") ||
    input.includes("pension") || input.includes("hijos")
  ) materia = "FAMILIAR";

  if (
    input.includes("choque") || input.includes("accidente") ||
    input.includes("alcohol")
  ) materia = "TRÁNSITO";

  /* =========================
     DELITO
  ========================= */
  let delito = "No determinado";

  if (input.includes("robo") && input.includes("arma")) delito = "Robo con violencia";
  else if (input.includes("carro") || input.includes("vehiculo")) delito = "Robo de vehículo";
  else if (input.includes("robo")) delito = "Robo simple";
  else if (input.includes("lesion")) delito = "Lesiones";
  else if (input.includes("matar") || input.includes("murio")) delito = "Homicidio";
  else if (input.includes("fraude")) delito = "Fraude";
  else if (input.includes("extorsion")) delito = "Extorsión";
  else if (input.includes("divorcio")) delito = "Divorcio contencioso";
  else if (input.includes("choque")) delito = "Accidente de tránsito";
  else if (input.includes("allanamiento")) delito = "Allanamiento de morada";

  /* =========================
     AGRAVANTES
  ========================= */
  let agravantes = [];
  if (input.includes("arma")) agravantes.push("Uso de arma");
  if (input.includes("violencia")) agravantes.push("Violencia");
  if (input.includes("grave")) agravantes.push("Lesiones graves");
  if (input.includes("menor")) agravantes.push("Involucra menores");

  /* =========================
     PENAS ORIENTATIVAS
  ========================= */
  let pena = "No es posible estimar sin más datos.";

  switch (delito) {
    case "Robo simple":
      pena = "Prisión aproximada de 6 meses a 4 años y multa.";
      break;
    case "Robo con violencia":
      pena = "Prisión aproximada de 5 a 15 años.";
      break;
    case "Robo de vehículo":
      pena = "Prisión aproximada de 5 a 10 años.";
      break;
    case "Lesiones":
      pena = "Desde multas hasta prisión, según gravedad.";
      break;
    case "Homicidio":
      pena = "Prisión aproximada de 12 a 30 años.";
      break;
    case "Fraude":
      pena = "Prisión y multa según monto defraudado.";
      break;
    case "Divorcio contencioso":
      pena = "No hay prisión. Puede haber pensión, custodia y reparto de bienes.";
      break;
    case "Accidente de tránsito":
      pena = "Multas, reparación del daño y posible prisión si hubo alcohol o lesiones.";
      break;
  }

  /* =========================
     QUÉ HACER
  ========================= */
  let queHacer = `
• Reunir pruebas
• No declarar sin abogado
• Consultar asesoría legal
• Valorar denuncia o defensa
`;

  /* =========================
     INFO FALTANTE
  ========================= */
  let faltante = [];
  if (estado === "No detectado") faltante.push("Estado de la República");
  if (edad === "No indicada") faltante.push("Edad");
  if (!input.includes("denuncia")) faltante.push("¿Existe denuncia?");
  if (materia === "PENAL" && !input.includes("arma")) faltante.push("¿Hubo arma?");
  if (!input.includes("lesion")) faltante.push("¿Hubo lesiones y qué gravedad?");
  if (delito.includes("Robo") && !input.includes("recuper")) faltante.push("¿Se recuperó el bien?");

  /* =========================
     RESPUESTA
  ========================= */
  let respuesta = `⚖️ ANÁLISIS JURÍDICO INTEGRAL (FINES EDUCATIVOS)

📌 Hechos narrados:
${input}

📂 Clasificación jurídica:
• Materia: ${materia}
• Delito / Asunto: ${delito}
• Estado: ${estado}
• Edad: ${edad}

⚠️ Agravantes:
${agravantes.length ? agravantes.join(", ") : "Ninguno detectado"}

⏳ Posibles consecuencias (ORIENTATIVAS):
${pena}

📌 ¿Qué hacer?
${queHacer}

📍 Información que FALTA:
${faltante.length ? faltante.map(f => "• " + f).join("\n") : "• Información suficiente para análisis general."}

⚠️ AVISO LEGAL:
Uso educativo. No sustituye asesoría legal profesional.
`;

  res.json({ respuesta });
});

app.listen(3000, () => {
  console.log("Chatbot legal activo en http://localhost:3000");
});
