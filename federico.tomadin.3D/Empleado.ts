/// <reference path="Persona.ts" />
namespace clases
{
    
 export class Empleado extends clases.Persona
{
   id:any;
   tipo:string;
   foto:string|null
   

   constructor(identidad:number,nom:string,ed:number,tip:string,foto:string|null)
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
