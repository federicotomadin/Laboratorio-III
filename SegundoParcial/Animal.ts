abstract class  Animal
{
    nombre:string;
    edad:number;
    cantidad_patas:number;



public AnimalJson():string
{
    return `${this.nombre}, ${this.edad}, ${this.cantidad_patas}`;
}



}
