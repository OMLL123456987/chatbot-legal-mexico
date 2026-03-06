function enviar() {

const input = document.getElementById("input").value.toLowerCase();
const out = document.getElementById("respuesta");

if(!input.trim()){
out.innerText = "⚠️ Describe una situación legal para analizar.";
return;
}

/* =========================
ESTADOS DE MÉXICO
========================= */

const estados = [
"cdmx","ciudad de mexico",
"edomex","estado de mexico",
"jalisco","nuevo leon","puebla",
"queretaro","guanajuato",
"veracruz","sonora","sinaloa",
"chihuahua","coahuila",
"tamaulipas","yucatan",
"quintana roo","baja california",
"baja california sur",
"zacatecas","durango",
"michoacan","guerrero",
"oaxaca","chiapas",
"tabasco","campeche",
"aguascalientes",
"san luis potosi",
"nayarit","colima",
"hidalgo","morelos",
"tlaxcala"
];

let estado = "No detectado";

estados.forEach(e=>{
if(input.includes(e)){
estado = e.toUpperCase();
}
});

/* =========================
DETECCIÓN DE EDAD
========================= */

let edad = "No indicada";

const edadRegex = input.match(/\b\d{1,2}\b/);

if(edadRegex){
edad = edadRegex[0];
}

/* =========================
MATERIAS DEL DERECHO
========================= */

let materia = "No determinada";

/* PENAL */

if(
input.includes("robo") ||
input.includes("arma") ||
input.includes("matar") ||
input.includes("homicidio") ||
input.includes("lesion") ||
input.includes("golpee") ||
input.includes("amenaza") ||
input.includes("fraude") ||
input.includes("extorsion") ||
input.includes("secuestro")
){
materia = "PENAL";
}

/* CIVIL */

if(
input.includes("deuda") ||
input.includes("debo") ||
input.includes("banco") ||
input.includes("contrato") ||
input.includes("demanda civil") ||
input.includes("pagaré")
){
materia = "CIVIL / MERCANTIL";
}

/* FAMILIAR */

if(
input.includes("divorcio") ||
input.includes("custodia") ||
input.includes("pension") ||
input.includes("hijos") ||
input.includes("patria potestad")
){
materia = "FAMILIAR";
}

/* TRANSITO */

if(
input.includes("choque") ||
input.includes("accidente") ||
input.includes("atropelle") ||
input.includes("atropellé") ||
input.includes("maneje borracho") ||
input.includes("alcohol") ||
input.includes("conduciendo")
){
materia = "TRANSITO";
}

/* FISCAL */

if(
input.includes("sat") ||
input.includes("impuestos") ||
input.includes("evasión") ||
input.includes("defraudacion fiscal")
){
materia = "FISCAL";
}

/* =========================
DELITOS
========================= */

let delito = "No determinado";

if(input.includes("robo") && input.includes("arma")){
delito = "Robo con violencia";
}

else if(input.includes("robo")){
delito = "Robo simple";
}

else if(input.includes("robo de carro") || input.includes("robo de auto")){
delito = "Robo de vehículo";
}

else if(input.includes("fraude")){
delito = "Fraude";
}

else if(input.includes("extorsion")){
delito = "Extorsión";
}

else if(input.includes("lesion") || input.includes("golpee")){
delito = "Lesiones";
}

else if(input.includes("matar") || input.includes("homicidio")){
delito = "Homicidio";
}

else if(input.includes("secuestro")){
delito = "Secuestro";
}

else if(input.includes("atropelle") || input.includes("atropellé")){
delito = "Atropellamiento / Accidente de tránsito";
}

else if(input.includes("choque")){
delito = "Accidente de tránsito";
}

else if(input.includes("divorcio")){
delito = "Divorcio contencioso";
}

else if(input.includes("custodia")){
delito = "Disputa de custodia";
}

else if(input.includes("deuda")){
delito = "Incumplimiento de deuda";
}

else if(input.includes("impuestos")){
delito = "Posible evasión fiscal";
}

/* =========================
AGRAVANTES
========================= */

let agravantes = [];

if(input.includes("arma")){
agravantes.push("Uso de arma");
}

if(input.includes("violencia")){
agravantes.push("Violencia");
}

if(input.includes("menor")){
agravantes.push("Involucra menores");
}

if(input.includes("grave")){
agravantes.push("Daño grave");
}

if(input.includes("borracho") || input.includes("alcohol")){
agravantes.push("Conducción bajo alcohol");
}

/* =========================
PENAS ORIENTATIVAS
========================= */

let pena = "No es posible estimar sin más información.";

if(delito === "Robo simple"){
pena = "6 meses a 4 años de prisión dependiendo del estado.";
}

if(delito === "Robo con violencia"){
pena = "5 a 15 años de prisión dependiendo del código penal estatal.";
}

if(delito === "Robo de vehículo"){
pena = "7 a 20 años dependiendo del estado.";
}

if(delito === "Fraude"){
pena = "3 a 12 años dependiendo del monto.";
}

if(delito === "Extorsión"){
pena = "8 a 20 años de prisión.";
}

if(delito === "Homicidio"){
pena = "10 a 40 años dependiendo agravantes.";
}

if(delito === "Lesiones"){
pena = "Multa o prisión dependiendo gravedad.";
}

if(delito === "Atropellamiento / Accidente de tránsito"){
pena = "Puede implicar responsabilidad civil, multas o prisión si hubo lesiones.";
}

if(delito === "Divorcio contencioso"){
pena = "No hay prisión. Puede implicar custodia y pensión.";
}

/* =========================
QUE HACER
========================= */

let queHacer = `

• Reunir pruebas
• Consultar abogado
• Analizar denuncia o defensa
• Documentar hechos
`;

/* =========================
INFO FALTANTE
========================= */

let faltante = [];

if(!input.includes("denuncia")){
faltante.push("¿Existe denuncia formal?");
}

if(materia === "PENAL" && !input.includes("arma")){
faltante.push("¿Se utilizó algún arma?");
}

if(!input.includes("lesion")){
faltante.push("¿Hubo lesiones?");
}

if(delito.includes("Robo") && !input.includes("recuperado")){
faltante.push("¿Se recuperó el bien robado?");
}

if(estado === "No detectado"){
faltante.push("¿En qué estado ocurrió?");
}

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

⏳ Posibles consecuencias:
${pena}

📌 ¿Qué hacer?
${queHacer}

📍 Información faltante:
`;

if(faltante.length === 0){
respuesta += "• Información suficiente para análisis general.";
}else{
faltante.forEach(f=>{
respuesta += "• " + f + "\n";
});
}

respuesta += `

⚠️ AVISO LEGAL:
Uso educativo. No sustituye asesoría legal profesional.
`;

out.innerText = respuesta;

}
