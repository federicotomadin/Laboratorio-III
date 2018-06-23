// Crear interfaces

interface superheroe{
     encender:boolean,
     velocidadMaxima:number,
     acelerar():void
     
}

// Cree una interfaz para validar el auto (el valor enviado por parametro)
function conBatimovil( auto:superheroe ):void{
  auto.encender = true;
  auto.velocidadMaxima = 100;
  auto.acelerar();
}

let Batimovil:superheroe = {
  encender:false,
  velocidadMaxima:0,
  acelerar(){
    console.log("...... run!!!");
  }
}

// Cree una interfaz con que permita utilzar el siguiente objeto
// utilizando propiedades opcionales

interface Pelicula{
reir:boolean,
comer:boolean,
llorar?:boolean
Reir():void;
}


let Guason:Pelicula = {
  reir: true,
  comer:true,
  llorar:false,
  Reir() {}
}

function Reir( guason:Pelicula ):void{
  if( guason.reir ){
    console.log("JAJAJAJA");
  }
}


// Cree una interfaz para la siguiente funcion
interface Ciudad{

  ciudadGotica(variable:string[]):number;
  }
  


function ciudadGoticaa( ciudadanos:string[] ):number{
  return ciudadanos.length;
}

// Cree una interfaz que obligue crear una clase
// con las siguientes propiedades y metodos

/*
  propiedades:
    - nombre
    - edad
    - sexo
    - estadoCivil
    - imprimirBio(): void // en consola una breve descripcion.
*/


interface Propiedades {
  nombre: string;
  edad:number;
  sexo:string;
  estadoCivil:string;
  imprimirBio():void;
}

class Personas implements Propiedades
{
  nombre: string;
  edad:number;
  sexo:string;
  estadoCivil:string;

  constructor(nom:string,ed:number,sexo:string,estado:string)
  {
    this.nombre=nom;
    this.edad=ed;
    this.sexo=sexo;
    this.estadoCivil=estado;
  }

  imprimirBio()
  {
     console.log({"Nombre" : this.nombre, "Edad":this.edad, "sexo":this.sexo, "estadoCivo":this.estadoCivil} )
  }
}

