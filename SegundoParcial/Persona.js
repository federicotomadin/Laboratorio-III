var clases;
(function (clases) {
    var Persona = /** @class */ (function () {
        function Persona(nom, ed, cant) {
            this.nombre = nom;
            this.edad = ed;
            this.cantidad_patas = cant;
        }
        Persona.prototype.PersonaJson = function () {
            return this.nombre + ", " + this.edad + ", " + this.cantidad_patas;
        };
        return Persona;
    }());
    clases.Persona = Persona;
})(clases || (clases = {}));
