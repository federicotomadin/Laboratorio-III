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
var Mascota = /** @class */ (function (_super) {
    __extends(Mascota, _super);
    function Mascota(nom, ed, cantPatas, identidad) {
        var _this = _super.call(this) || this;
        _this.nombre = nom;
        _this.edad = ed;
        _this.cantidad_patas = cantPatas;
        _this.id = identidad;
        return _this;
    }
    Mascota.prototype.MascotaJson = function () {
        var json = _super.prototype.AnimalJson.call(this) + ("" + this.id);
        return json;
    };
    return Mascota;
}(Animal));
var mascota = new Mascota("perro", 20, 4, 1);
console.log(mascota);
