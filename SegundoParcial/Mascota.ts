/// <reference path="Animal.ts" />
        

class Mascota extends Animal
{
   id:number;

   

   constructor(nom:string,ed:number,cantPatas:number,identidad:number)
   {
       super();
       this.nombre=nom;
       this.edad=ed;
       this.cantidad_patas=cantPatas;
       this.id=identidad;
   }

   public MascotaJson():string{
      let json= super.AnimalJson() +  `${this.id}`
      return json;

   }
}

   let mascota:Mascota=new Mascota("perro",20,4,1);
   console.log(mascota);


 


 


