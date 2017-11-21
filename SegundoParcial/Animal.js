"use strict";
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.AnimalJson = function () {
        return this.nombre + ", " + this.edad + ", " + this.cantidad_patas;
    };
    return Animal;
}());
