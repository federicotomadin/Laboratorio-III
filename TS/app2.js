"use strict";
///<reference path="validaciones/textos.ts"/>
var validaciones;
(function (validaciones) {
    function validarCadena(texto) {
        if (texto.length > 3) {
            return true;
        }
        return false;
    }
    validaciones.validarCadena = validarCadena;
    function validarNumero(texto) {
        if (texto.length > 0) {
            return true;
        }
        return false;
    }
    console.log(validarCadena("Juan"));
})(validaciones || (validaciones = {}));
console.log(validaciones.validarCadena("Juan"));
