/// <reference path="Persona.ts" />

namespace clases
{
    
    export class Alumno extends clases.Persona
    {
    legajo:number;
    materia:string;
    nota:number
    id:number
   

    constructor(id:number,nombre:string,legajo:number,materia:string,nota:number)
    {
        super(nombre);
        this.id=id;
        this.legajo=legajo;
        this.materia=materia;
        this.nota=nota;
    }

    public PersonaJson():string{
        let json= super.PersonaJson() +  `${this.legajo},${this.materia},${this.nota}`
        return json;

    }
    }
}


 


 


