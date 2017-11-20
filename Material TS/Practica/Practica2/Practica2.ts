




// Funciones Básicas
function sumar( a:number, b:number ){
  return a + b;
}

var contar = function( heroes:string[] ){
  return heroes.length;
}
var superHeroes:string[] = ["Flash", "Arrow", "Superman", "Linterna Verde"];
contar(superHeroes);

//Parametros por defecto
function llamarBatman( llamar:boolean ){
  if( llamar ){
    console.log("Batiseñal activada");
  }
}

llamarBatman(true);

// Rest?
function unirheroes( ...personas:string[] ){
  return personas.join(", ");
}


// Tipo funcion
function noHaceNada( numero:number, texto:string, booleano:boolean, arreglo:string[] ):void{
 
}

// Crear el tipo de funcion que acepte la funcion "noHaceNada"
let noHaceNadaTampoco;

 noHaceNadaTampoco=noHaceNada(15,"texto",true,["hola","chau"]);
