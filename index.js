function enviar() {
  const texto = document.getElementById("input").value.toLowerCase();
  const respuestaDiv = document.getElementById("respuesta");

  if (!texto.trim()) {
    respuestaDiv.innerText = "⚠️ Escribe un caso para analizar.";
    return;
  }

  let estado = "No detectado";
  if (texto.includes("cdmx")) estado = "Ciudad de México";
  if (texto.includes("jalisco")) estado = "Jalisco";
  if (texto.includes("nuevo león")) estado = "Nuevo León";

  let edadMatch = texto.match(/\d{2}/);
  let edad = edadMatch ? edadMatch[0] : "No indicada";

  let delito = "No determinado";
  if (texto.includes("robo")) delito = "Robo";
  if (texto.includes("arma")) delito = "Robo con violencia";
  if (texto.includes("choque")) delito = "Delito de tránsito";
  if (texto.includes("divorcio")) delito = "Divorcio";

  let faltante = [];
  if (!texto.includes("violencia")) faltante.push("¿Hubo violencia?");
  if (!texto.includes("arma")) faltante.push("¿Se usó algún arma?");
  if (!texto.includes("denuncia")) faltante.push("¿Existe denuncia formal?");
  if (!texto.includes("daño")) faltante.push("¿Qué daño se causó?");

  let respuesta = `⚖️ ANÁLISIS JURÍDICO INTEGRAL (FINES EDUCATIVOS)

📌 Hechos narrados:
${texto}

📂 Clasificación jurídica:
• Delito / Asunto: ${delito}
• Estado: ${estado}
• Edad: ${edad}

👨‍⚖️ Posibles consecuencias (ORIENTATIVAS):
Dependen del Código Penal del estado, gravedad y agravantes.

📍 Información que FALTA para una mejor estimación:
`;

  if (faltante.length === 0) {
    respuesta += "• Información suficiente para un análisis general.";
  } else {
    faltante.forEach(p => {
      respuesta += "• " + p + "\n";
    });
  }

  respuesta += `

⚠️ AVISO LEGAL:
Uso educativo. No sustituye asesoría legal profesional.`;

  respuestaDiv.innerText = respuesta;
}
