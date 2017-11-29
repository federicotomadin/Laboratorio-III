/// <reference path="Persona.ts" />
namespace clases
{
    
 export class Empleado extends clases.Persona
{
   id:number;
   tipo:string;
   foto:string
   

   constructor(identidad:number,nom:string,ed:number,tip:string,foto:string)
   {
       super(nom,ed);
       this.id=identidad;
       this.tipo=tip;
       this.foto=foto;
   }

   public EmpleadoJson():string{
      let json= super.PersonaJson() +  `${this.id},${this.tipo}`
      return json;

   }
}
}
