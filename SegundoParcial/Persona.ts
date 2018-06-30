 
 namespace  clases
 {
 
    export class  Persona
    {
        id:number;
        nombre:string;
        apellido: string;
      

    constructor(nom:string,ape:string)
    {
        this.nombre=nom;
        this.apellido=ape;
    
    }



    public PersonaJson():string
    {
        return `${this.nombre}`;
    }

    }
}
