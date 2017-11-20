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
    llorar: false
};
function Reir(guason) {
    if (guason.reir) {
        console.log("JAJAJAJA");
    }
}
// Cree una interfaz para la siguiente funcion
function ciudadGotica(ciudadanos) {
    return ciudadanos.length;
}
// Cree una interfaz que obligue crear una clase
// con las siguientes propiedades y metodos
/*
  propiedades:
    - nombre
    - edad
    - sexo
    - estadoCivil
    - imprimirBio(): void // en consola una breve descripcion.
*/
