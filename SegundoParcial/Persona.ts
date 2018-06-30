 
 namespace  clases
 {
 
    export class  Persona
    {
        id:number;
        nombre:string;
        apellido: string;
      

    constructor(id:number,nom:string,ape:string)
    {
        this.id=id;
        this.nombre=nom;
        this.apellido=ape;
    
    }



    public PersonaJson():string
    {
        return `${this.nombre}`;
    }

    }
}
