
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
var villanos:otra[] = [{
  carroceria:"Lex Luthor",
  modelo: 54,
  antibalas:false, 
  pasajeros:null
},{
  carroceria: "Erik Magnus Lehnsherr",
  modelo: 49,
  antibalas: true,
  pasajeros:null
},{
  carroceria: "James Logan",
  modelo: undefined,
  antibalas: true,
  pasajeros:null
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
  poder:true,
  estatura: ["Magneto","Tormenta","Psylocke","Angel"]
}

// Mystique, debe poder ser cualquiera de esos dos mutantes (charles o apocalipsis)
var mystique;

mystique = charles;
mystique = apocalipsis;
