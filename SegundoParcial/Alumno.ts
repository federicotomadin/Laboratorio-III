/// <reference path="Persona.ts" />

namespace clases
{
    
    export class Alumno extends clases.Persona
    {
    id:number;
    tipo:string;
   

    constructor(identidad:number,nom:string,ed:number,cantPatas:number,tip:string)
    {
        super(nom,ed,cantPatas);
        this.id=identidad;
        this.tipo=tip;
    }

    public PersonaJson():string{
        let json= super.PersonaJson() +  `${this.id},${this.tipo}`
        return json;

    }
    }
}


 


 


