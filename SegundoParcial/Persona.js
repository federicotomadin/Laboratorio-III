var clases;
(function (clases) {
    var Persona = /** @class */ (function () {
        function Persona(nom) {
            this.nombre = nom;
        }
        Persona.prototype.PersonaJson = function () {
            return "" + this.nombre;
        };
        return Persona;
    }());
    clases.Persona = Persona;
})(clases || (clases = {}));
