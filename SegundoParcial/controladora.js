"use strict";
/// <reference path="Animal.ts" />
/// <reference path="Mascota.ts" />
$(document).ready(function () {
    Controladora.MostrarMascotas();
    Controladora.CargarSelect();
});
var Controladora = /** @class */ (function () {
    function Controladora() {
    }
    Controladora.AgregarMascota = function () {
        var id = Number($("#ID").val());
        var nombre = String($("#Nombre").val());
        var edad = Number($("#Edad").val());
        var tipo = String($("#Tipo").val());
        var cantidad_patas = Number($("#cantidad_patas").val());
        var MascotasStorage = localStorage.getItem("Mascotas");
        var arrayMascotas = Array();
        var ObjetoMascota = new clases.Mascota(id, nombre, edad, cantidad_patas, tipo);
        if (MascotasStorage == null) {
            arrayMascotas = new Array();
            arrayMascotas.push(ObjetoMascota);
            localStorage.setItem("Mascotas", JSON.stringify(arrayMascotas));
        }
        else {
            //sino es NULL quiere decir que estoy modificando esa posicion de memoria.
            var index = $("#indexModificar").val();
            arrayMascotas = JSON.parse(localStorage.getItem("Mascotas"));
            if (index !== "") {
                var i = Number(index);
                //    console.log("Empleado a modificar");
                //  console.log(arrayMascotas[i]);
                arrayMascotas.splice(i, 1);
            }
            arrayMascotas.push(ObjetoMascota);
            localStorage.setItem("Mascotas", JSON.stringify(arrayMascotas));
            Controladora.LimpiarForm();
        }
        Controladora.MostrarMascotas();
    };
    Controladora.LimpiarForm = function () {
        $("#ID").val("");
        $("#Nombre").val("");
        $("#Edad").val("");
        $("#Tipo").val("perro");
        $("#CantidadPatas").val("");
    };
    Controladora.MostrarMascotas = function () {
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>EDAD</th><th>CANTIDAD DE PATAS</th><th>TIPO</th><th>ACCION</th></tr></thead>";
        var valoresTabla = " ";
        if ($("#chID").is(":checked")) {
            var arrayMapMascotas = arrayMascotas.map(function (elemeto) {
                return (elemeto.id);
            });
            var stringTabla_1 = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th><th>ACCION</th></tr></thead>";
            var valoresTable = "";
            for (var i = 0; i < arrayMapMascotas.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayMascotas[i].id + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla_1 + valoresTabla);
        }
        if ($("#chNombre").is(":checked")) {
            var arrayMapMascotas = arrayMascotas.map(function (elemeto) {
                return (elemeto.id);
            });
            var stringTabla_2 = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Nombre</th><th>ACCION</th></tr></thead>";
            var valoresTable = "";
            for (var i = 0; i < arrayMapMascotas.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayMascotas[i].nombre + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla_2 + valoresTabla);
        }
        var arrayMascotas = JSON.parse(localStorage.getItem("Mascotas"));
        for (var i = 0; i < arrayMascotas.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayMascotas[i].id + "</td>";
            valoresTabla += "<td>" + arrayMascotas[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayMascotas[i].edad + "</td>";
            valoresTabla += "<td>" + arrayMascotas[i].cantidad_patas + "</td>";
            valoresTabla += "<td>" + arrayMascotas[i].tipo + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.EliminarEmpleado = function (index) {
        var arrayMascotas = JSON.parse(localStorage.getItem("Mascotas"));
        arrayMascotas.splice(index, 1);
        localStorage.setItem("Mascotas", JSON.stringify(arrayMascotas));
        Controladora.MostrarMascotas();
    };
    Controladora.ModificarMascotas = function (index) {
        var arrayMascotas = JSON.parse(localStorage.getItem("Mascotas"));
        $("#ID").val(arrayMascotas[index].id);
        $("#Nombre").val(arrayMascotas[index].nombre);
        $("#Edad").val(arrayMascotas[index].edad);
        $("#CantidadPatas").val(arrayMascotas[index].cantidad_patas);
        $("#Tipo").val(arrayMascotas[index].tipo);
    };
    Controladora.FiltrarPorTipo = function () {
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>EDAD</th><th>CANTIDAD DE PATAS</th><th>TIPO</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        var arrayMascotas = JSON.parse(localStorage.getItem("Mascotas"));
        var MascotasFiltradas = arrayMascotas.filter(function (elemento) {
            return elemento.tipo == $("#Tipo").val();
        });
        for (var i = 0; i < MascotasFiltradas.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + MascotasFiltradas[i].id + "</td>";
            valoresTabla += "<td>" + MascotasFiltradas[i].nombre + "</td>";
            valoresTabla += "<td>" + MascotasFiltradas[i].edad + "</td>";
            valoresTabla += "<td>" + MascotasFiltradas[i].cantidad_patas + "</td>";
            valoresTabla += "<td>" + MascotasFiltradas[i].tipo + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.PromedioPatas = function () {
        var arrayMascotas = JSON.parse(localStorage.getItem("Mascotas"));
        var total = 0;
        var suma = arrayMascotas.reduce(function (total, elemento) {
            return total += elemento.cantidad_patas;
        }, 0);
        $("#promedio").html(String((suma / arrayMascotas.length)));
    };
    Controladora.CargarSelect = function () {
        for (var i = 0; i < 6; i++) {
            $("#Tipo").append(new Option(clases.Tipos[i]));
        }
    };
    return Controladora;
}());