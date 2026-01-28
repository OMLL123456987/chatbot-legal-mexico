const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ===== CATÁLOGOS =====
const estados = [
  "aguascalientes","baja california","baja california sur","campeche",
  "chiapas","chihuahua","cdmx","ciudad de mexico","coahuila","colima",
  "durango","guanajuato","guerrero","hidalgo","jalisco","mexico",
  "michoacan","morelos","nayarit","nuevo leon","oaxaca","puebla",
  "queretaro","quintana roo","san luis potosi","sinaloa","sonora",
  "tabasco","tamaulipas","tlaxcala","veracruz","yucatan","zacatecas"
];

// ===== UTILIDADES =====
function detectarEstado(texto){
  for (let e of estados) {
    if (texto.includes(e)) return e.toUpperCase();
  }
  return "NO INDICADO";
}

function detectarEdad(texto){
  const m = texto.match(/\b([1-9][0-9])\s*años\b/);
  return m ? m[1] : "NO INDICADA";
}

// ===== CLASIFICACIÓN =====
function clasificar(texto){
  // CIVIL / MERCANTIL
  if (texto.includes("debo") || texto.includes("deuda") || texto.includes("banco")) {
    return { materia:"CIVIL / MERCANTIL", asunto:"Deuda / Incumplimiento de pago" };
  }

  // FAMILIAR
  if (texto.includes("divorcio") || texto.includes("pensión") || texto.includes("custodia")) {
    return { materia:"FAMILIAR", asunto:"Conflicto familiar" };
  }

  // TRÁNSITO
  if (texto.includes("choque") || texto.includes("accidente") || texto.includes("alcohol")) {
    return { materia:"TRÁNSITO", asunto:"Delito o falta vial" };
  }

  // PENAL – ROBO
  if (texto.includes("robe") || texto.includes("robo")) {
    if (texto.includes("arma")) {
      return { materia:"PENAL", asunto:"Robo con violencia" };
    }
    return { materia:"PENAL", asunto:"Robo simple" };
  }

  // PENAL – LESIONES
  if (texto.includes("pele") || texto.includes("golpe") || texto.includes("lesion")) {
    return { materia:"PENAL", asunto:"Lesiones" };
  }

  return { materia:"NO DETERMINADA", asunto:"Por determinar" };
}

// ===== CONSECUENCIAS =====
function consecuencias(materia, asunto){
  if (materia === "CIVIL / MERCANTIL") {
    return `
• Demandas mercantiles
• Embargo de bienes o cuentas
• Intereses moratorios
• Reporte en buró de crédito
🚫 NO hay cárcel por deudas
`;
  }

  if (materia === "FAMILIAR") {
    return `
• Resoluciones judiciales
• Pensiones
• Custodia o régimen de visitas
• Multas por incumplimiento
`;
  }

  if (materia === "TRÁNSITO") {
    return `
• Multas
• Suspensión de licencia
• Responsabilidad civil
• Prisión SOLO si hubo lesiones graves o muerte
`;
  }

  if (materia === "PENAL") {
    if (asunto.includes("violencia")) {
      return `
• Prisión (años variables según estado)
• Multas elevadas
• Antecedentes penales
• Reparación del daño
`;
    }
    return `
• Prisión o sanciones alternativas
• Multas
• Reparación del daño
`;
  }

  return "No es posible estimar consecuencias sin clasificar el asunto.";
}

// ===== INFO FALTANTE INTELIGENTE =====
function infoFaltante(materia, asunto){
  if (materia === "CIVIL / MERCANTIL") {
    return `
• Monto de la deuda
• Tiempo de atraso
• Tipo de crédito
• Si existe demanda
`;
  }

  if (materia === "PENAL") {
    return `
• Gravedad del daño
• Uso de armas
• Existencia de denuncia
• Antecedentes
`;
  }

  if (materia === "FAMILIAR") {
    return `
• Estado civil
• Existencia de hijos
• Resoluciones previas
`;
  }

  return "Se requiere mayor detalle del caso.";
}

// ===== ENDPOINT =====
app.post("/chat", (req, res) => {
  const texto = (req.body.pregunta || "").toLowerCase();

  const estado = detectarEstado(texto);
  const edad = detectarEdad(texto);
  const { materia, asunto } = clasificar(texto);

  const respuesta = `
⚖️ ANÁLISIS JURÍDICO INTEGRAL (FINES EDUCATIVOS)

📌 Hechos narrados:
${req.body.pregunta}

📂 Clasificación jurídica:
• Materia: ${materia}
• Asunto: ${asunto}
• Estado: ${estado}
• Edad: ${edad}

⏳ Posibles consecuencias ORIENTATIVAS:
${consecuencias(materia, asunto)}

📍 Información que FALTA para una estimación más precisa:
${infoFaltante(materia, asunto)}

⚠️ AVISO LEGAL:
Uso educativo. No sustituye asesoría legal profesional.
`;

  res.json({ respuesta });
});

// ===== PUERTO =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Chatbot legal activo");
});
