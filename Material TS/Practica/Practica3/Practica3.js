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
        nombre: "Lex Luthor",
        edad: 54,
        mutante: false
    }, {
        nombre: "Erik Magnus Lehnsherr",
        edad: 49,
        mutante: true
    }, {
        nombre: "James Logan",
        edad: undefined,
        mutante: true
    }];
var charles = {
    poder: "psiquico",
    estatura: 1.78
};
var apocalipsis = {
    lider: true,
    miembros: ["Magneto", "Tormenta", "Psylocke", "Angel"]
};
// Mystique, debe poder ser cualquiera de esos dos mutantes (charles o apocalipsis)
var mystique;
mystique = charles;
mystique = apocalipsis;
