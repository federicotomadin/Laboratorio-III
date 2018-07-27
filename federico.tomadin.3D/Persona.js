var clases;
(function (clases) {
    var Persona = /** @class */ (function () {
        function Persona(nom, ape, ed) {
            this.nombre = nom;
            this.apellido = ape;
            this.edad = ed;
        }
        Persona.prototype.PersonaJson = function () {
            return this.nombre + ", " + this.edad;
        };
        return Persona;
    }());
    clases.Persona = Persona;
})(clases || (clases = {}));
