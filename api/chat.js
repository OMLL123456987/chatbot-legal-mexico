export default function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({error:"Método no permitido"});
}

const pregunta = (req.body.pregunta || "").toLowerCase().trim();

if(!pregunta){
return res.json({respuesta:"⚠️ Escribe un caso para analizar."});
}

/* ===============================
DETECCIÓN DE ESTADOS
================================ */

const estados = {
"cdmx":"Ciudad de México",
"ciudad de mexico":"Ciudad de México",
"edomex":"Estado de México",
"estado de mexico":"Estado de México",
"jalisco":"Jalisco",
"nuevo leon":"Nuevo León",
"puebla":"Puebla",
"queretaro":"Querétaro",
"guanajuato":"Guanajuato",
"veracruz":"Veracruz",
"sonora":"Sonora",
"sinaloa":"Sinaloa",
"chihuahua":"Chihuahua",
"coahuila":"Coahuila",
"tamaulipas":"Tamaulipas",
"yucatan":"Yucatán",
"quintana roo":"Quintana Roo",
"tabasco":"Tabasco",
"campeche":"Campeche",
"chiapas":"Chiapas",
"durango":"Durango",
"aguascalientes":"Aguascalientes",
"baja california":"Baja California",
"baja california sur":"Baja California Sur",
"colima":"Colima",
"guerrero":"Guerrero",
"hidalgo":"Hidalgo",
"michoacan":"Michoacán",
"morelos":"Morelos",
"nayarit":"Nayarit",
"oaxaca":"Oaxaca",
"san luis potosi":"San Luis Potosí",
"tlaxcala":"Tlaxcala",
"zacatecas":"Zacatecas"
}

let estado="No detectado"

for(let e in estados){
if(pregunta.includes(e)){
estado=estados[e]
}
}

/* ===============================
DETECCIÓN DE EDAD
================================ */

let edad="No indicada"

const edadRegex=pregunta.match(/\b([1-9][0-9])\b/)

if(edadRegex){
edad=edadRegex[1]
}

/* ===============================
DETECCIÓN DE MATERIA
================================ */

let materia="No determinada"

if(
pregunta.includes("robo")||
pregunta.includes("arma")||
pregunta.includes("golpee")||
pregunta.includes("lesion")||
pregunta.includes("matar")||
pregunta.includes("homicidio")||
pregunta.includes("droga")||
pregunta.includes("secuestro")||
pregunta.includes("violacion")||
pregunta.includes("abuso")
){
materia="Penal"
}

if(
pregunta.includes("deuda")||
pregunta.includes("banco")||
pregunta.includes("contrato")||
pregunta.includes("pagar")||
pregunta.includes("fraude")
){
materia="Civil / Mercantil"
}

if(
pregunta.includes("divorcio")||
pregunta.includes("custodia")||
pregunta.includes("pension")||
pregunta.includes("hijos")
){
materia="Familiar"
}

if(
pregunta.includes("choque")||
pregunta.includes("accidente")||
pregunta.includes("alcohol")
){
materia="Tránsito"
}

/* ===============================
DETECCIÓN DE DELITOS
================================ */

let delito="No determinado"

if(pregunta.includes("robo")&&pregunta.includes("arma")){
delito="Robo con violencia"
}

else if(pregunta.includes("robo")&&pregunta.includes("carro")){
delito="Robo de vehículo"
}

else if(pregunta.includes("robo casa")){
delito="Robo a casa habitación"
}

else if(pregunta.includes("robo")){
delito="Robo simple"
}

else if(pregunta.includes("fraude")){
delito="Fraude"
}

else if(pregunta.includes("extorsion")){
delito="Extorsión"
}

else if(pregunta.includes("abuso de confianza")){
delito="Abuso de confianza"
}

else if(pregunta.includes("despojo")){
delito="Despojo"
}

else if(pregunta.includes("lesion")||pregunta.includes("golpee")){
delito="Lesiones"
}

else if(pregunta.includes("matar")||pregunta.includes("homicidio")){
delito="Homicidio"
}

else if(pregunta.includes("secuestro")){
delito="Secuestro"
}

else if(pregunta.includes("violacion")){
delito="Violación"
}

else if(pregunta.includes("acoso")){
delito="Acoso sexual"
}

else if(pregunta.includes("abuso sexual")){
delito="Abuso sexual"
}

else if(pregunta.includes("droga")){
delito="Posesión de drogas"
}

else if(pregunta.includes("arma")){
delito="Portación ilegal de arma"
}

else if(pregunta.includes("lavado")){
delito="Lavado de dinero"
}

else if(pregunta.includes("evasión fiscal")){
delito="Evasión fiscal"
}

else if(pregunta.includes("divorcio")){
delito="Divorcio"
}

else if(pregunta.includes("choque")){
delito="Accidente de tránsito"
}

/* ===============================
AGRAVANTES
================================ */

let agravantes=[]

if(pregunta.includes("arma")){
agravantes.push("Uso de arma")
}

if(pregunta.includes("violencia")){
agravantes.push("Violencia")
}

if(pregunta.includes("grave")){
agravantes.push("Daño grave")
}

if(pregunta.includes("menor")){
agravantes.push("Menor involucrado")
}

if(pregunta.includes("grupo")){
agravantes.push("Participación de varias personas")
}

/* ===============================
PENAS ORIENTATIVAS
================================ */

let pena="No es posible estimar con precisión."

const penas={

"Robo simple":"6 meses a 4 años de prisión",

"Robo con violencia":"5 a 15 años de prisión",

"Robo de vehículo":"5 a 12 años de prisión",

"Fraude":"3 a 12 años de prisión dependiendo del monto",

"Extorsión":"5 a 15 años de prisión",

"Lesiones":"Multa o prisión según gravedad",

"Homicidio":"12 a 24 años de prisión",

"Secuestro":"40 a 80 años de prisión",

"Violación":"8 a 20 años de prisión",

"Acoso sexual":"Multa o prisión menor",

"Posesión de drogas":"Multa o prisión dependiendo cantidad",

"Portación ilegal de arma":"2 a 7 años de prisión",

"Lavado de dinero":"5 a 15 años de prisión",

"Evasión fiscal":"3 meses a 9 años de prisión",

"Divorcio":"No hay pena penal",

"Accidente de tránsito":"Multa o responsabilidad civil"
}

if(penas[delito]){
pena=penas[delito]
}

/* ===============================
QUÉ HACER
================================ */

let queHacer=`
• Reunir pruebas
• Identificar testigos
• Evitar confrontaciones
• Buscar asesoría legal
• Evaluar denuncia o defensa
`

/* ===============================
INFORMACIÓN FALTANTE
================================ */

let faltante=[]

if(!pregunta.includes("denuncia")){
faltante.push("¿Existe denuncia formal?")
}

if(estado==="No detectado"){
faltante.push("Estado donde ocurrió el hecho")
}

if(edad==="No indicada"){
faltante.push("Edad de las personas involucradas")
}

if(delito.includes("Robo")&&!pregunta.includes("recuperado")){
faltante.push("¿El bien robado fue recuperado?")
}

if(materia==="Penal"&&!pregunta.includes("arma")){
faltante.push("¿Se utilizó algún arma?")
}

/* ===============================
RESPUESTA FINAL
================================ */

let respuesta=`⚖️ ANÁLISIS JURÍDICO INTEGRAL (FINES EDUCATIVOS)

📌 Hechos narrados:
${pregunta}

📂 Clasificación jurídica
• Materia: ${materia}
• Delito / Asunto: ${delito}
• Estado: ${estado}
• Edad: ${edad}

⚠️ Agravantes detectados:
${agravantes.length?agravantes.join(", "):"Ninguno detectado"}

⏳ Posibles consecuencias (orientativas)
${pena}

📌 ¿Qué hacer?
${queHacer}

📍 Información que falta para mayor precisión
`

if(faltante.length===0){
respuesta+="• Información suficiente para análisis general."
}else{
faltante.forEach(f=>{
respuesta+="• "+f+"\n"
})
}

respuesta+=`

⚠️ AVISO LEGAL
Este chatbot es educativo y no sustituye asesoría legal profesional.
`

res.json({respuesta})

}
