 if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { pregunta } = req.body;

  if (!pregunta) {
    return res.status(400).json({ respuesta: "⚠️ No se recibió ninguna pregunta." });
  }

  const texto = pregunta.toLowerCase();

  let materia = "No determinada";
  let delito = "No identificado";
  let pena = "No se puede estimar con la información actual.";

  /* =========================
     CLASIFICACIÓN BÁSICA
  ========================= */

  if (
    texto.includes("robo") ||
    texto.includes("robe") ||
    texto.includes("arma") ||
    texto.includes("golpee") ||
    texto.includes("lesion") ||
    texto.includes("matar")
  ) {
    materia = "Penal";
  }

  if (
    texto.includes("deuda") ||
    texto.includes("banco") ||
    texto.includes("contrato")
  ) {
    materia = "Civil / Mercantil";
  }

  if (
    texto.includes("divorcio") ||
    texto.includes("custodia") ||
    texto.includes("pension") ||
    texto.includes("hijos")
  ) {
    materia = "Familiar";
  }

  if (
    texto.includes("choque") ||
    texto.includes("accidente") ||
    texto.includes("alcohol")
  ) {
    materia = "Tránsito";
  }

  /* =========================
     DELITOS
  ========================= */

  if (texto.includes("robo") && texto.includes("arma")) {
    delito = "Robo con violencia";
    pena = "Aproximadamente 5 a 15 años de prisión dependiendo del estado.";
  }

  else if (texto.includes("robo")) {
    delito = "Robo simple";
    pena = "Entre 6 meses y 4 años de prisión dependiendo del estado.";
  }

  else if (texto.includes("lesion") || texto.includes("golpee")) {
    delito = "Lesiones";
    pena = "Puede ir desde multa hasta varios años de prisión según la gravedad.";
  }

  else if (texto.includes("matar") || texto.includes("homicidio")) {
    delito = "Homicidio";
    pena = "De 8 a 20 años de prisión o más dependiendo del estado.";
  }

  else if (texto.includes("fraude")) {
    delito = "Fraude";
    pena = "Multa y prisión dependiendo del monto.";
  }

  else if (texto.includes("divorcio")) {
    delito = "Divorcio contencioso";
    pena = "No hay prisión. Es un procedimiento civil.";
  }

  /* =========================
     RESPUESTA
  ========================= */

  const respuesta = `
⚖️ ANÁLISIS JURÍDICO (EDUCATIVO)

📌 Hechos narrados:
${pregunta}

📂 Clasificación:
• Materia: ${materia}
• Posible delito/asunto: ${delito}

⏳ Posibles consecuencias orientativas:
${pena}

📍 Para un análisis más preciso sería útil saber:
• Estado de la República
• Edad de las personas
• Si hubo violencia
• Si existe denuncia

⚠️ AVISO LEGAL:
Uso educativo. No sustituye asesoría legal profesional.
`;

  res.status(200).json({ respuesta });

}
