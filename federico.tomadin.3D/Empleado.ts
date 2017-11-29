/// <reference path="Persona.ts" />
namespace clases
{
    
 export class Empleado extends clases.Persona
{
   id:number;
   tipo:string;
   foto:string
   

   constructor(identidad:number,nom:string,ed:number,tip:string)
   {
       super(nom,ed);
       this.id=identidad;
       this.tipo=tip;

   }

   public MascotaJson():string{
      let json= super.AnimalJson() +  `${this.id},${this.tipo}`
      return json;

   }
}
}
