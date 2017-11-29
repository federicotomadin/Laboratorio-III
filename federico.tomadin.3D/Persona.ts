 
 namespace  clases
 {
 
 export class  Persona
{
    nombre:string;
    edad:number;
  


constructor(nom:string,ed:number)
{
    this.nombre=nom;
    this.edad=ed;

}



public AnimalJson():string
{
    return `${this.nombre}, ${this.edad}, ${this.cantidad_patas}`;
}



}
 }
