"use strict";
// Objetos
var otra = /** @class */ (function () {
    function otra(carro, mod, anti, pasa) {
        this.carroceria = carro;
        this.modelo = mod;
        this.antibalas = anti;
        this.pasajeros = pasa;
    }
    otra.prototype.disparar = function () {
        console.log("disparando");
    };
    return otra;
}());
var objeto = new otra("negra", "6x6", true, 4);
objeto.disparar();
var villano1 = new otra("negra", "6x6", false);
var villano2 = new otra("Erik Magnus Lehnsherr", "6x6", false);
var villanos = [villano1, villano2];
// Villanos debe de ser un arreglo de objetos personalizados
var villanos = [{
        carroceria: "Lex Luthor",
        modelo: 54,
        antibalas: false,
        pasajeros: null
    }, {
        carroceria: "Erik Magnus Lehnsherr",
        modelo: 49,
        antibalas: true,
        pasajeros: null
    }, {
        carroceria: "James Logan",
        modelo: undefined,
        antibalas: true,
        pasajeros: null
    }];
var charles = {
    poder: "psiquico",
    estatura: 1.78
};
var apocalipsis = {
    poder: true,
    estatura: ["Magneto", "Tormenta", "Psylocke", "Angel"]
};
// Mystique, debe poder ser cualquiera de esos dos mutantes (charles o apocalipsis)
var mystique;
mystique = charles;
mystique = apocalipsis;
