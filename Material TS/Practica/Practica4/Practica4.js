"use strict";
// Crear interfaces
// Cree una interfaz para validar el auto (el valor enviado por parametro)
function conBatimovil(auto) {
    auto.encender = true;
    auto.velocidadMaxima = 100;
    auto.acelerar();
}
var Batimovil = {
    encender: false,
    velocidadMaxima: 0,
    acelerar: function () {
        console.log("...... run!!!");
    }
};
var Guason = {
    reir: true,
    comer: true,
    llorar: false,
    Reir: function () { }
};
function Reir(guason) {
    if (guason.reir) {
        console.log("JAJAJAJA");
    }
}
function ciudadGoticaa(ciudadanos) {
    return ciudadanos.length;
}
var Personas = /** @class */ (function () {
    function Personas(nom, ed, sexo, estado) {
        this.nombre = nom;
        this.edad = ed;
        this.sexo = sexo;
        this.estadoCivil = estado;
    }
    Personas.prototype.imprimirBio = function () {
        console.log({ "Nombre": this.nombre, "Edad": this.edad, "sexo": this.sexo, "estadoCivo": this.estadoCivil });
    };
    return Personas;
}());
