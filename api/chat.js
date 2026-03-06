export default function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"Metodo no permitido"})
}

const pregunta = req.body.pregunta || ""
const texto = pregunta.toLowerCase()

let materia="No determinada"
let delito="No identificado"
let pena="No es posible estimar."

/* =====================
ROBO
===================== */

if(texto.includes("robo") || texto.includes("robe")){

materia="Penal"
delito="Robo simple"
pena="6 meses a 4 años de prisión dependiendo del estado."

}

if(texto.includes("arma")){

delito="Robo con violencia"
pena="5 a 15 años de prisión dependiendo del estado."

}

/* =====================
LESIONES
===================== */

if(texto.includes("golpee") || texto.includes("lesion")){

materia="Penal"
delito="Lesiones"

pena="Multa o prisión dependiendo de la gravedad de las lesiones."

}

/* =====================
HOMICIDIO
===================== */

if(texto.includes("mate") || texto.includes("matar")){

materia="Penal"
delito="Homicidio"

pena="10 a 40 años de prisión dependiendo del estado."

}

/* =====================
FRAUDE
===================== */

if(texto.includes("fraude") || texto.includes("estafa")){

materia="Penal"
delito="Fraude"

pena="3 a 12 años de prisión dependiendo del monto."

}

/* =====================
EXTORSION
===================== */

if(texto.includes("extorsion")){

materia="Penal"
delito="Extorsión"

pena="8 a 20 años de prisión."

}

/* =====================
DEUDAS
===================== */

if(texto.includes("debo") || texto.includes("banco") || texto.includes("deuda")){

materia="Civil / Mercantil"
delito="Deuda"

pena="No hay cárcel por deudas en México."

}

/* =====================
DIVORCIO
===================== */

if(texto.includes("divorcio")){

materia="Familiar"
delito="Divorcio"

pena="Proceso legal sin prisión."

}

/* =====================
CUSTODIA
===================== */

if(texto.includes("custodia") || texto.includes("hijos")){

materia="Familiar"
delito="Custodia"

pena="Resolución judicial sobre patria potestad."

}

/* =====================
ACCIDENTE
===================== */

if(texto.includes("choque") || texto.includes("accidente")){

materia="Transito"
delito="Accidente de tránsito"

pena="Multas, reparación del daño o prisión si hay lesiones."

}

/* =====================
DROGAS
===================== */

if(texto.includes("droga") || texto.includes("cocaina") || texto.includes("marihuana")){

materia="Penal"
delito="Posesión de drogas"

pena="Multa o prisión dependiendo de la cantidad."

}

/* =====================
ARMAS
===================== */

if(texto.includes("arma") || texto.includes("pistola")){

materia="Penal"
delito="Portación ilegal de arma"

pena="3 a 10 años de prisión."

}

/* =====================
RESPUESTA
===================== */

const respuesta = `

⚖️ ANÁLISIS JURÍDICO (FINES EDUCATIVOS)

📌 Hechos narrados
${pregunta}

📂 Clasificación jurídica
Materia: ${materia}

Delito / asunto
${delito}

⏳ Posibles consecuencias
${pena}

📍 Información que faltaría para un análisis más preciso

• Estado de la República
• Si hubo violencia
• Si hubo denuncia
• Si hubo lesiones
• Si hubo armas

⚠️ AVISO LEGAL
Uso educativo.
No sustituye asesoría legal profesional.

`

res.status(200).json({respuesta})

}
