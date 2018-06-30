/// <reference path="Persona.ts" />

namespace clases
{
    
    export class Cliente extends clases.Persona
    {
        edad:number;
        sexo:string;
 
   

    constructor(id:number,nombre:string,apellido:string,edad:number,sexo:string)
    {
        super(nombre,apellido);
        this.edad=edad;
        this.sexo=sexo;      
    }

  
    }
}


 


 


