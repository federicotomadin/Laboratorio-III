// Tipos

class SuperHeroe{

nombre:string;
existe:boolean|undefined;




constructor(nombreParam:string,existeParam?:boolean)
{
   this.nombre=nombreParam;
   this.existe=existeParam;
}
}


let  batman=new SuperHeroe("Terry");
let  superman=new SuperHeroe("Clark");


let  existe:boolean = false;

// Tuplas
let parejaHeroes:string[]= [batman.nombre,superman.nombre];


var villano = ["Lex Lutor",5,true];


// Arreglos
let  aliados = ["Mujer Maravilla","Acuaman","San", "Flash"];

//Enumeraciones
enum Fuerza{
fuerzaFlash = 5,
fuerzaSuperman = 100,
fuerzaBatman = 1,
fuerzaAcuaman = 0
}


// Retorno de funciones
function activar_batiseñal(){
  return "activada";
}

console.log(activar_batiseñal());

function pedir_ayuda(){
  console.log("Auxilio!!!");
}

pedir_ayuda();

// Aserciones de Tipo
let poder = "100";
let largoDelPoder = poder.length;
console.log( largoDelPoder );
