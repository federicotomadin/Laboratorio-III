 
 namespace  clases
 {
 
    export class  Persona
    {
        nombre:string;
      

    constructor(nom:string)
    {
        this.nombre=nom;
    
    }



    public PersonaJson():string
    {
        return `${this.nombre}`;
    }

    }
}
