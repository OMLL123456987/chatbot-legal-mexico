<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Chatbot Legal México</title>
  <style>
    body { font-family: Arial; padding: 20px; background: #f5f5f5; }
    textarea { width: 100%; height: 80px; }
    button { padding: 10px 20px; margin-top: 10px; }
    pre { white-space: pre-wrap; background: #fff; padding: 15px; }
  </style>
</head>
<body>

<h2>⚖️ Chatbot Legal (México)</h2>
<p><strong>Uso educativo. No sustituye asesoría legal.</strong></p>

<textarea id="input" placeholder="Describe el caso con estado y edad..."></textarea>
<br>
<button onclick="enviar()">Enviar</button>

<pre id="respuesta"></pre>

<script>
function enviar() {
  const input = document.getElementById("input").value.toLowerCase();
  const out = document.getElementById("respuesta");

  if (!input.trim()) {
    out.innerText = "⚠️ Describe un caso para analizar.";
    return;
  }

  /* =========================
     ESTADOS
  ========================= */
  const estados = {
    "cdmx": "Ciudad de México",
    "ciudad de mexico": "Ciudad de México",
    "jalisco": "Jalisco",
    "nuevo leon": "Nuevo León",
    "edomex": "Estado de México",
    "estado de mexico": "Estado de México",
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
    input.includes("matar") || input.includes("amenaza")
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
     DELITO / ASUNTO
  ========================= */
  let delito = "No determinado";

  if (input.includes("robo") && input.includes("arma")) delito = "Robo con violencia";
  else if (input.includes("robo") || input.includes("robe")) delito = "Robo simple";
  else if (input.includes("vehiculo") || input.includes("carro")) delito = "Robo de vehículo";
  else if (input.includes("lesion") || input.includes("golpe")) delito = "Lesiones";
  else if (input.includes("matar") || input.includes("murio")) delito = "Homicidio";
  else if (input.includes("fraude")) delito = "Fraude";
  else if (input.includes("extorsion")) delito = "Extorsión";
  else if (input.includes("divorcio")) delito = "Divorcio contencioso";
  else if (input.includes("choque")) delito = "Accidente de tránsito";

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

  if (delito === "Robo simple") {
    pena = "Prisión aproximada de 6 meses a 4 años y multa (varía por estado).";
  }
  if (delito === "Robo con violencia") {
    pena = "Prisión aproximada de 5 a 15 años; agravantes aumentan la pena.";
  }
  if (delito === "Robo de vehículo") {
    pena = "Prisión aproximada de 5 a 10 años.";
  }
  if (delito === "Lesiones") {
    pena = "Desde multas hasta prisión, según gravedad.";
  }
  if (delito === "Homicidio") {
    pena = "Prisión aproximada de 12 a 30 años.";
  }
  if (delito === "Fraude") {
    pena = "Prisión y multa dependiendo del monto.";
  }
  if (delito === "Divorcio contencioso") {
    pena = "No hay prisión. Puede haber pensión, custodia y bienes.";
  }

  /* =========================
     QUÉ HACER
  ========================= */
  let queHacer = `
• Reunir pruebas
• Evitar confrontaciones
• Consultar abogado
• Valorar denuncia o defensa legal
`;

  /* =========================
     INFO FALTANTE
  ========================= */
  let faltante = [];
  if (!input.includes("denuncia")) faltante.push("¿Existe denuncia formal?");
  if (materia === "PENAL" && !input.includes("arma")) faltante.push("¿Se utilizó arma?");
  if (!input.includes("lesion")) faltante.push("¿Hubo lesiones y qué gravedad?");
  if (delito.includes("Robo") && !input.includes("recuper")) faltante.push("¿Se recuperó el bien?");
  if (estado === "No detectado") faltante.push("Estado de la República");

  /* =========================
     RESPUESTA FINAL
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

  out.innerText = respuesta;
}
</script>

</body>
</html>
