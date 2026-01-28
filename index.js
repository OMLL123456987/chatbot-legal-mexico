function analizar() {
  const texto = document.getElementById("input").value.toLowerCase();
  let respuesta = "⚖️ ANÁLISIS JURÍDICO INTEGRAL (FINES EDUCATIVOS)\n\n";

  let estado = "No detectado";
  if (texto.includes("cdmx")) estado = "CDMX";
  if (texto.includes("jalisco")) estado = "Jalisco";
  if (texto.includes("edomex")) estado = "Estado de México";

  let edad = texto.match(/\b\d{2}\b/);
  edad = edad ? edad[0] : "No indicada";

  let delito = "No determinado";

  if (texto.includes("robo")) delito = "Robo";
  if (texto.includes("arma")) delito = "Robo con violencia";
  if (texto.includes("choque")) delito = "Delito de tránsito";
  if (texto.includes("divorcio")) delito = "Divorcio (materia familiar)";
  if (texto.includes("fraude")) delito = "Fraude";

  respuesta += `📌 Hechos narrados:\n${texto}\n\n`;
  respuesta += `📂 Clasificación jurídica:\n`;
  respuesta += `• Delito / Asunto: ${delito}\n`;
  respuesta += `• Estado: ${estado}\n`;
  respuesta += `• Edad: ${edad}\n\n`;

  respuesta += `👨‍⚖️ Posibles consecuencias (orientativas):\n`;
  respuesta += `Dependen del tipo exacto de delito y agravantes.\n\n`;

  respuesta += `📍 Información que FALTA para un análisis más preciso:\n`;
  respuesta += `• Existencia de violencia\n`;
  respuesta += `• Uso de armas\n`;
  respuesta += `• Denuncia formal\n`;
  respuesta += `• Daño causado\n\n`;

  respuesta += `⚠️ AVISO LEGAL:\nUso educativo. No sustituye asesoría legal profesional.`;

  document.getElementById("respuesta").innerText = respuesta;
}
