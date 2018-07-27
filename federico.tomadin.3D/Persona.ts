 
 namespace  clases
 {
 
 export class  Persona
{
    nombre:string;
    apellido:string
    edad:number;
  


constructor(nom:string,ape:string,ed:number)
{
    this.nombre=nom;
    this.apellido=ape;
    this.edad=ed;

}



public PersonaJson():string
{
    return `${this.nombre}, ${this.edad}`;
}



}
 }
