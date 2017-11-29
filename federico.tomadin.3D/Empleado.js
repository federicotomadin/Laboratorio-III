"use strict";
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
/// <reference path="Persona.ts" />
var clases;
(function (clases) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(identidad, nom, ed, tip, foto) {
            var _this = _super.call(this, nom, ed) || this;
            _this.id = identidad;
            _this.tipo = tip;
            _this.foto = foto;
            return _this;
        }
        Empleado.prototype.EmpleadoJson = function () {
            var json = _super.prototype.PersonaJson.call(this) + (this.id + "," + this.tipo);
            return json;
        };
        return Empleado;
    }(clases.Persona));
    clases.Empleado = Empleado;
})(clases || (clases = {}));
