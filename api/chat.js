export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const texto = (req.body.pregunta || "").toLowerCase();

  /* =========================
     DETECCIÓN DE ESTADO
  ========================= */
  const estados = {
    "ciudad de mexico": "CDMX",
    "cdmx": "CDMX",
    "estado de mexico": "EDOMEX",
    "edomex": "EDOMEX",
    "jalisco": "Jalisco",
    "nuevo leon": "Nuevo León",
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
  for (const e in estados) {
    if (texto.includes(e)) estado = estados[e];
  }

  /* =========================
     EDAD
  ========================= */
  let edad = "No indicada";
  const edadMatch = texto.match(/\b\d{2}\b/);
  if (edadMatch) edad = edadMatch[0];

  /* =========================
     MATERIA
  ========================= */
  let materia = "No determinada";

  if (
    texto.includes("robo") ||
    texto.includes("robe") ||
    texto.includes("arma") ||
    texto.includes("golpee") ||
    texto.includes("lesion") ||
    texto.includes("matar")
  ) materia = "PENAL";

  if (
    texto.includes("debo") ||
    texto.includes("deuda") ||
    texto.includes("banco") ||
    texto.includes("contrato")
  ) materia = "CIVIL / MERCANTIL";

  if (
    texto.includes("divorcio") ||
    texto.includes("custodia") ||
    texto.includes("pension") ||
    texto.includes("hijos")
  ) materia = "FAMILIAR";

  if (
    texto.includes("choque") ||
    texto.includes("accidente") ||
    texto.includes("alcohol")
  ) materia = "TRÁNSITO";

  /* =========================
     DELITO
  ========================= */
  let delito = "No determinado";

  if (texto.includes("robo") && texto.includes("arma")) delito = "Robo con violencia";
  else if (texto.includes("robo")) delito = "Robo simple";
  else if (texto.includes("lesion")) delito = "Lesiones";
  else if (texto.includes("matar")) delito = "Homicidio";
  else if (texto.includes("fraude")) delito = "Fraude";
  else if (texto.includes("extorsion")) delito = "Extorsión";
  else if (texto.includes("divorcio")) delito = "Divorcio contencioso";
  else if (texto.includes("choque")) delito = "Accidente de tránsito";

  /* =========================
     AGRAVANTES
  ========================= */
  let agravantes = [];
  if (texto.includes("arma")) agravantes.push("Uso de arma");
  if (texto.includes("violencia")) agravantes.push("Violencia");
  if (texto.includes("grave")) agravantes.push("Lesiones graves");
  if (texto.includes("menor")) agravantes.push("Involucra menores");

  /* =========================
     PENAS ORIENTATIVAS
  ========================= */
  let pena = "No es posible estimar sin más datos.";

  if (delito === "Robo simple") {
    pena = "6 meses a 4 años de prisión y multa (varía por estado).";
  }

  if (delito === "Robo con violencia") {
    pena = "5 a 15 años de prisión, puede aumentar por agravantes.";
  }

  if (delito === "Lesiones") {
    pena = "Multa o prisión según gravedad (leves, graves o permanentes).";
  }

  if (delito === "Fraude") {
    pena = "Prisión y multa según el monto defraudado.";
  }

  if (delito === "Divorcio contencioso") {
    pena = "No hay cárcel. Puede haber pensión, custodia y reparto de bienes.";
  }

  /* =========================
     INFORMACIÓN FALTANTE
  ========================= */
  let faltante = [];

  if (estado === "No detectado") faltante.push("Estado de la República");
  if (edad === "No indicada") faltante.push("Edad");
  if (materia === "PENAL" && !texto.includes("denuncia"))
    faltante.push("¿Existe denuncia formal?");
  if (materia === "PENAL" && !texto.includes("arma"))
    faltante.push("¿Se utilizó algún arma?");
  if (delito.includes("Robo") && !texto.includes("recuperado"))
    faltante.push("¿El bien fue recuperado?");

  /* =========================
     RESPUESTA
  ========================= */
  let respuesta = `⚖️ ANÁLISIS JURÍDICO INTEGRAL (FINES EDUCATIVOS)

📌 Hechos narrados:
${texto}

📂 Clasificación jurídica:
• Materia: ${materia}
• Delito / Asunto: ${delito}
• Estado: ${estado}
• Edad: ${edad}

⚠️ Agravantes:
${agravantes.length ? agravantes.join(", ") : "No detectados"}

⏳ Posibles consecuencias (ORIENTATIVAS):
${pena}

📍 Información que FALTA para mayor precisión:
`;

  if (faltante.length === 0) {
    respuesta += "• Información suficiente para análisis general.";
  } else {
    faltante.forEach(f => respuesta += `• ${f}\n`);
  }

  respuesta += `
⚠️ AVISO:
Uso educativo. No sustituye asesoría legal profesional.
`;

  res.status(200).json({ respuesta });
}
