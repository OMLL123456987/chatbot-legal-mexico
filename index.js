const input = document.getElementById("input");
const output = document.getElementById("output");
const btn = document.getElementById("send");

const estados = [
  "aguascalientes","baja california","baja california sur","campeche",
  "chiapas","chihuahua","cdmx","ciudad de mexico","coahuila","colima",
  "durango","guanajuato","guerrero","hidalgo","jalisco","mexico",
  "michoacan","morelos","nayarit","nuevo leon","oaxaca","puebla",
  "queretaro","quintana roo","san luis potosi","sinaloa","sonora",
  "tabasco","tamaulipas","tlaxcala","veracruz","yucatan","zacatecas"
];

function analizarTexto(texto) {
  texto = texto.toLowerCase();

  let resultado = {
    estado: null,
    edad: null,
    materia: null,
    delito: null,
    violencia: false,
    arma: false
  };

  estados.forEach(e => {
    if (texto.includes(e)) resultado.estado = e.toUpperCase();
  });

  const edadMatch = texto.match(/(\d{2})\s*años/);
  if (edadMatch) resultado.edad = edadMatch[1];

  if (texto.includes("robe") || texto.includes("robo") || texto.includes("asalto")) {
    resultado.materia = "PENAL";
    resultado.delito = "ROBO";
  }

  if (texto.includes("debo") || texto.includes("deuda") || texto.includes("banco")) {
    resultado.materia = "CIVIL / MERCANTIL";
    resultado.delito = "DEUDA";
  }

  if (texto.includes("violencia") || texto.includes("amenaza")) {
    resultado.violencia = true;
  }

  if (texto.includes("arma") || texto.includes("pistola") || texto.includes("cuchillo")) {
    resultado.arma = true;
  }

  return resultado;
}

function generarRespuesta(r) {
  let html = `⚖️ ANÁLISIS JURÍDICO INTEGRAL (EDUCATIVO)\n\n`;

  html += `📌 Hechos narrados:\n${input.value}\n\n`;

  html += `📂 Clasificación jurídica:\n`;
  html += `• Materia: ${r.materia ?? "NO DETERMINADA"}\n`;
  html += `• Delito / Asunto: ${r.delito ?? "NO DETERMINADO"}\n`;
  html += `• Estado: ${r.estado ?? "NO IDENTIFICADO"}\n`;
  html += `• Edad: ${r.edad ?? "NO INDICADA"}\n\n`;

  html += `👨‍⚖️ Posibles consecuencias (orientativas):\n`;

  if (r.delito === "ROBO") {
    if (r.arma || r.violencia) {
      html += `• Robo con violencia: penas altas según el código penal estatal.\n`;
    } else {
      html += `• Robo simple: penas menores o medidas alternas.\n`;
    }
  } else if (r.delito === "DEUDA") {
    html += `• Las deudas NO generan cárcel.\n`;
    html += `• Procede demanda civil o mercantil.\n`;
  } else {
    html += `• No es posible estimar consecuencias sin más datos.\n`;
  }

  html += `\n📍 Información que FALTA para un análisis más preciso:\n`;

  if (!r.estado) html += `• Estado de la República\n`;
  if (!r.edad) html += `• Edad exacta\n`;

  if (r.delito === "ROBO") {
    if (!r.violencia) html += `• ¿Hubo violencia o amenazas?\n`;
    if (!r.arma) html += `• ¿Se utilizó algún arma?\n`;
    html += `• ¿El vehículo fue recuperado?\n`;
    html += `• ¿Existe denuncia formal?\n`;
  }

  if (r.delito === "DEUDA") {
    html += `• Monto de la deuda\n`;
    html += `• Tipo de crédito\n`;
    html += `• Tiempo de atraso\n`;
    html += `• Si existe demanda judicial\n`;
  }

  html += `\n⚠️ AVISO LEGAL:\nUso educativo. No sustituye asesoría legal profesional.`;

  return html;
}

btn.addEventListener("click", () => {
  const texto = input.value.trim();
  if (!texto) return;

  const analisis = analizarTexto(texto);
  output.textContent = generarRespuesta(analisis);
});
