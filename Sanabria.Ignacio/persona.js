"use strict";
var Persona = /** @class */ (function () {
    function Persona(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    Persona.prototype.personaToJson = function () {
        var json = "{nombre:" + this.nombre + ",apellido:" + this.apellido + ",edad:" + this.edad + ",";
        return json;
    };
    return Persona;
}());
