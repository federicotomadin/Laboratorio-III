"use strict";
var clases;
(function (clases) {
    var Persona = /** @class */ (function () {
        function Persona(id, nom, ape) {
            this.id = id;
            this.nombre = nom;
            this.apellido = ape;
        }
        Persona.prototype.PersonaJson = function () {
            return "" + this.nombre;
        };
        return Persona;
    }());
    clases.Persona = Persona;
})(clases || (clases = {}));
