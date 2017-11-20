
// Objetos

class otra{
carroceria:string;
modelo:string;
antibalas:boolean;
pasajeros:number|undefined;
 
constructor(carro:string,mod:string,anti:boolean,pasa?:number){
 
  this.carroceria=carro;
  this.modelo=mod;
  this.antibalas=anti;
  this.pasajeros=pasa;

}

disparar(){
  console.log("disparando");
}

}

let objeto=new otra("negra","6x6",true,4);
objeto.disparar();

let villano1=new otra("negra","6x6",false);
let villano2=new otra("Erik Magnus Lehnsherr","6x6",false);

var villanos:otra[]=[villano1,villano2];


// Villanos debe de ser un arreglo de objetos personalizados
var villanos = [{
  nombre:"Lex Luthor",
  edad: 54,
  mutante:false
},{
  nombre: "Erik Magnus Lehnsherr",
  edad: 49,
  mutante: true
},{
  nombre: "James Logan",
  edad: undefined,
  mutante: true
}];

// Multiples tipos
// cree dos tipos, uno para charles y otro para apocalipsis

type charles={
 poder:string,
 estatura:number

};

type apocalipsis={
  poder:boolean,
  estatura:string[]
 };

var charles:charles = {
  poder:"psiquico",
  estatura: 1.78
};

var apocalipsis:apocalipsis = {
  lider:true,
  miembros: ["Magneto","Tormenta","Psylocke","Angel"]
}

// Mystique, debe poder ser cualquiera de esos dos mutantes (charles o apocalipsis)
var mystique;

mystique = charles;
mystique = apocalipsis;
