"use strict";
var numeros;
(function (numeros) {
    function validarNumero(texto) {
        if (texto.length > 0) {
            return true;
        }
        return false;
    }
})(numeros || (numeros = {}));
