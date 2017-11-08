"use strict";
var textos;
(function (textos) {
    function validarCadena(texto) {
        if (texto.length > 3) {
            return true;
        }
        return false;
    }
    textos.validarCadena = validarCadena;
    function validarNumero(texto) {
        if (texto.length > 0) {
            return true;
        }
        return false;
    }
    console.log(validarCadena("Juan"));
})(textos || (textos = {}));
