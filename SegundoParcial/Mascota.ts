/// <reference path="Animal.ts" />
namespace clases
{
    
 export class Mascota extends clases.Animal
{
   id:number;

   

   constructor(identidad:number,nom:string,ed:number,cantPatas:number)
   {
       super(nom,ed,cantPatas);
       this.id=identidad;

       
   }

   public MascotaJson():string{
      let json= super.AnimalJson() +  `${this.id}`
      return json;

   }
}
}


 


 


