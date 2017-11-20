"use strict";
// Tipos
var SuperHeroe = /** @class */ (function () {
    function SuperHeroe(nombreParam, existeParam) {
        this.nombre = nombreParam;
        this.existe = existeParam;
    }
    return SuperHeroe;
}());
var batman = new SuperHeroe("Terry");
var superman = new SuperHeroe("Clark");
var existe = false;
// Tuplas
var parejaHeroes = [batman.nombre, superman.nombre];
var villano = ["Lex Lutor", 5, true];
// Arreglos
var aliados = ["Mujer Maravilla", "Acuaman", "San", "Flash"];
//Enumeraciones
var Fuerza;
(function (Fuerza) {
    Fuerza[Fuerza["fuerzaFlash"] = 5] = "fuerzaFlash";
    Fuerza[Fuerza["fuerzaSuperman"] = 100] = "fuerzaSuperman";
    Fuerza[Fuerza["fuerzaBatman"] = 1] = "fuerzaBatman";
    Fuerza[Fuerza["fuerzaAcuaman"] = 0] = "fuerzaAcuaman";
})(Fuerza || (Fuerza = {}));
// Retorno de funciones
function activar_batiseñal() {
    return "activada";
}
console.log(activar_batiseñal());
function pedir_ayuda() {
    console.log("Auxilio!!!");
}
pedir_ayuda();
// Aserciones de Tipo
var poder = "100";
var largoDelPoder = poder.length;
console.log(largoDelPoder);
