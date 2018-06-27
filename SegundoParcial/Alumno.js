/// <reference path="Persona.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var clases;
(function (clases) {
    var Alumno = /** @class */ (function (_super) {
        __extends(Alumno, _super);
        function Alumno(id, nombre, legajo, materia, nota) {
            var _this = _super.call(this, nombre) || this;
            _this.id = id;
            _this.legajo = legajo;
            _this.materia = materia;
            _this.nota = nota;
            return _this;
        }
        Alumno.prototype.PersonaJson = function () {
            var json = _super.prototype.PersonaJson.call(this) + (this.legajo + "," + this.materia + "," + this.nota);
            return json;
        };
        return Alumno;
    }(clases.Persona));
    clases.Alumno = Alumno;
})(clases || (clases = {}));
