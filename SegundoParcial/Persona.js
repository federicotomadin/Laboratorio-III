var clases;
(function (clases) {
    var Persona = /** @class */ (function () {
        function Persona(nom, ape) {
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
