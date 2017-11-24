"use strict";
/// <reference path="enum.ts" />
/// <reference path="Mascota.ts" />
/// <reference path="node_modules/jquery/dist/jquery.min.js" />
$(document).ready(function () {
    alert("esta funcionando");
    $("#CargarMascota").click(AgregarMascota);
    CargarSelect();
});
//localStorage.setItem("Mascotas",JSON.stringify(ArrayMascotas));
function AgregarMascota() {
    var id = Number($("#id").val());
    var nombre = String($("#nombre").val());
    var cantidad_patas = Number($("#cantidad_patas").val());
    var edad = Number($("#edad").val());
    var ObjetoMascota = new clases.Mascota(id, nombre, edad, cantidad_patas);
    var ArrayMascotas = new Array();
    ArrayMascotas.push(ObjetoMascota);
    console.log(ArrayMascotas);
}
function CargarSelect() {
    for (var i = 0; i < 6; i++) {
        $("#lista").append(new Option(clases.Tipos[i]));
    }
}
