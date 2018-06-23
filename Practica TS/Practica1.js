"use strict";
// Tipos
var batmann = 'Bruce';
var supermann = "Clark";
var existee = false;
// Tuplas 
var parejaHeroesss = [batmann, supermann];
var villano = ["Lex Lutor", 5, true];
// Arreglos
var aliadoss = ["Mujer Maravilla", "Acuaman", "San", "Flash"];
//Enumeraciones
var Fuerzas;
(function (Fuerzas) {
    Fuerzas[Fuerzas["fuerzaFlash"] = 5] = "fuerzaFlash";
    Fuerzas[Fuerzas["fuerzaSuperman"] = 100] = "fuerzaSuperman";
    Fuerzas[Fuerzas["fuerzaBatman"] = 1] = "fuerzaBatman";
    Fuerzas[Fuerzas["fuerzaAcuaman"] = 0] = "fuerzaAcuaman";
})(Fuerzas || (Fuerzas = {}));
// Retorno de funciones
function activar_batiseñal() {
    return "activada";
}
function pedir_ayuda() {
    console.log("Auxilio!!!");
}
// Aserciones de Tipo
var poderr = "100";
var largoDelPoderr = poder.length;
console.log(largoDelPoder);
