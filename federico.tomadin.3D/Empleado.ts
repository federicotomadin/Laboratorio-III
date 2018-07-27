/// <reference path="Persona.ts" />
namespace clases
{
    
 export class Empleado extends clases.Persona
{
   legajo:number;
   horario:string;
   

   constructor(leg:number,nom:string,ape:string,ed:number,horario:string)
   {
       super(nom,ape,ed);       
       this.legajo=leg;
       this.horario=horario;
   }

   public EmpleadoJson():string{
      let json= super.PersonaJson() +  `${this.legajo},${this.horario}`
      return json;

   }
}
}
