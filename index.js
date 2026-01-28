function enviar() {
  const input = document.getElementById("input").value.toLowerCase();
  const out = document.getElementById("respuesta");

  if (!input.trim()) {
    out.innerText = "⚠️ Describe un caso para analizar.";
    return;
  }

  /* =========================
     DETECCIÓN DE ESTADO
  ========================= */
  const estados = [
    "cdmx","ciudad de mexico","jalisco","nuevo leon","edomex","estado de mexico",
    "puebla","queretaro","guanajuato","veracruz","sonora","sinaloa","chihuahua",
    "coahuila","tamaulipas","yucatan","quintana roo","baja california"
  ];

  let estado = "No detectado";
  estados.forEach(e => {
    if (input.includes(e)) estado = e.toUpperCase();
  });

  /* =========================
     DETECCIÓN DE EDAD
  ========================= */
  let edad = "No indicada";
  const edadMatch = input.match(/\b\d{2}\b/);
  if (edadMatch) edad = edadMatch[0];

  /* =========================
     CLASIFICACIÓN DE MATERIA
  ========================= */
  let materia = "No determinada";

  if (
    input.includes("robe") ||
    input.includes("robo") ||
    input.includes("lesion") ||
    input.includes("golpee") ||
    input.includes("arma") ||
    input.includes("amenaza")
  ) materia = "PENAL";

  if (
    input.includes("debo") ||
    input.includes("deuda") ||
    input.includes("banco") ||
    input.includes("contrato")
  ) materia = "CIVIL / MERCANTIL";

  if (
    input.includes("divorcio") ||
    input.includes("custodia") ||
    input.includes("pension") ||
    input.includes("hijos")
  ) materia = "FAMILIAR";

  if (
    input.includes("choque") ||
    input.includes("accidente") ||
    input.includes("alcohol")
  ) materia = "TRANSITO";

  /* =========================
     DETECCIÓN DE DELITO
  ========================= */
  let delito = "No determinado";

  if (input.includes("robo") && input.includes("arma")) delito = "Robo con violencia";
  else if (input.includes("robo")) delito = "Robo simple";
  else if (input.includes("lesion")) delito = "Lesiones";
  else if (input.includes("matar")) delito = "Homicidio";
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
    pena = "Prisión aproximada de 5 a 15 años, agravantes aumentan pena.";
  }

  if (delito === "Lesiones") {
    pena = "De multas hasta prisión, depende si son leves, graves o permanentes.";
  }

  if (delito === "Fraude") {
    pena = "Prisión y multa dependiendo del monto defraudado.";
  }

  if (delito === "Divorcio contencioso") {
    pena = "No hay prisión. Puede haber obligaciones económicas y custodia.";
  }

  /* =========================
     QUÉ HACER SI TE PASÓ A TI
  ========================= */
  let queHacer = `
• Reunir pruebas
• Evitar confrontaciones
• Consultar abogado
• Valorar denuncia o defensa
`;

  /* =========================
     INFORMACIÓN FALTANTE
  ========================= */
  let faltante = [];

  if (!input.includes("denuncia")) faltante.push("¿Existe denuncia formal?");
  if (!input.includes("arma") && materia === "PENAL") faltante.push("¿Se utilizó algún arma?");
  if (!input.includes("lesion")) faltante.push("¿Hubo lesiones? ¿Qué gravedad?");
  if (!input.includes("recuperado") && delito.includes("Robo")) faltante.push("¿Se recuperó el bien?");
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

⚠️ Agravantes detectados:
${agravantes.length ? agravantes.join(", ") : "Ninguno detectado"}

⏳ Posibles consecuencias (ORIENTATIVAS):
${pena}

📌 ¿Qué hacer?
${queHacer}

📍 Información que FALTA para una estimación más precisa:
`;

  if (faltante.length === 0) {
    respuesta += "• Información suficiente para análisis general.";
  } else {
    faltante.forEach(f => respuesta += "• " + f + "\n");
  }

  respuesta += `
⚠️ AVISO LEGAL:
Uso educativo. No sustituye asesoría legal profesional.
`;

  out.innerText = respuesta;
}
