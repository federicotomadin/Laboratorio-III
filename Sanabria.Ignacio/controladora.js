"use strict";
///<reference path="persona.ts" />
///<reference path="empleado.ts" />
$(document).ready(function () {
    /* $("#myInput").on("keyup", function() {
     var value = $(this).val().toLowerCase();
     $("#divTabla").filter(function() {
       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)*/
    Controladora.MostrarEmpleados();
});
/* });
});*/
var Controladora = /** @class */ (function () {
    function Controladora() {
    }
    Controladora.AgregarEmpleado = function () {
        //tomo los datos
        var nombre = $("#nombre").val();
        var apellido = $("#apellido").val();
        var horario = $("#horario").val();
        var edad = Number($("#edad").val());
        var legajo = Number($("#legajo").val());
        //creo el localstorage Empleados
        var empleadosStorage = localStorage.getItem("Empleados");
        //defino un array para guardar el bojeto
        var arrayEmpleados = Array();
        //creo el objeto con las variables traidas el html
        var empleadoNuevo = new Empleado(nombre, apellido, edad, horario, legajo);
        //si el lugar en el array esta vacio, si es que no lo estoy modificando, instancion un nuevo
        //array y pusheo el objeto, despues lo mando al local storage como string en JSON 
        //ese obeto convertido en array.
        if (empleadosStorage == null) {
            arrayEmpleados = new Array();
            arrayEmpleados.push(empleadoNuevo);
            localStorage.setItem("Empleados", JSON.stringify(arrayEmpleados));
        }
        else {
            //sino es NULL quiere decir que estoy modificando esa posicion de memoria.
            var index = $("#indexModificar").val();
            arrayEmpleados = JSON.parse(localStorage.getItem("Empleados"));
            if (index !== "") {
                var i = Number(index);
                //    console.log("Empleado a modificar");
                //  console.log(arrayEmpleados[i]);
                arrayEmpleados.splice(i, 1);
            }
            arrayEmpleados.push(empleadoNuevo);
            localStorage.setItem("Empleados", JSON.stringify(arrayEmpleados));
            Controladora.LimpiarForm();
        }
        Controladora.MostrarEmpleados();
    };
    Controladora.LimpiarForm = function () {
        $("#nombre").val("");
        $("#apellido").val("");
        $("#edad").val("");
        $("#horario").val("Mañana");
        $("#legajo").val("");
        $("#indexModificar").val("");
    };
    Controladora.MostrarEmpleados = function () {
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>NOMBRE</th>" +
            "<th>APELLIDO</th><th>EDAD</th><th>LEGAJO</th><th>HORARIO</th><th>ACCION</th></tr></thead>";
        var valoresTabla = " ";
        var arrayEmpleados = JSON.parse(localStorage.getItem("Empleados"));
        for (var i = 0; i < arrayEmpleados.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayEmpleados[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayEmpleados[i].apellido + "</td>";
            valoresTabla += "<td>" + arrayEmpleados[i].edad + "</td>";
            valoresTabla += "<td>" + arrayEmpleados[i].legajo + "</td>";
            valoresTabla += "<td>" + arrayEmpleados[i].horario + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        document.getElementById("divTabla").innerHTML = stringTabla + valoresTabla;
    };
    Controladora.EliminarEmpleado = function (index) {
        var arrayEmpleados = JSON.parse(localStorage.getItem("Empleados"));
        arrayEmpleados.splice(index, 1);
        localStorage.setItem("Empleados", JSON.stringify(arrayEmpleados));
        Controladora.MostrarEmpleados();
    };
    Controladora.ModificarEmpleado = function (index) {
        var arrayEmpleados = JSON.parse(localStorage.getItem("Empleados"));
        $("#nombre").val(arrayEmpleados[index].nombre);
        $("#apellido").val(arrayEmpleados[index].apellido);
        $("#edad").val(arrayEmpleados[index].edad);
        $("#horario").val(arrayEmpleados[index].horario);
        $("#legajo").val(arrayEmpleados[index].legajo);
        $("#indexModificar").val(index.toString());
    };
    Controladora.FiltrarPorHorario = function () {
        var filtro;
        filtro = $("#horario").val();
        var stringTabla;
        stringTabla = "<table class='table table-bordered'><thead><tr><th>NOMBRE</th>" +
            "<th>APELLIDO</th><th>EDAD</th><th>LEGAJO</th><th>HORARIO</th></tr>";
        var valoresTabla = " ";
        var arrayEmpleados = JSON.parse(localStorage.getItem("Empleados"));
        var EmpleadosFiltrados;
        EmpleadosFiltrados = arrayEmpleados.filter(function (elemento) {
            return elemento.horario == filtro;
        });
        for (var i = 0; i < EmpleadosFiltrados.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + EmpleadosFiltrados[i].nombre + "</td>";
            valoresTabla += "<td>" + EmpleadosFiltrados[i].apellido + "</td>";
            valoresTabla += "<td>" + EmpleadosFiltrados[i].edad + "</td>";
            valoresTabla += "<td>" + EmpleadosFiltrados[i].legajo + "</td>";
            valoresTabla += "<td>" + EmpleadosFiltrados[i].horario + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.PromedioEdadPorHorario = function () {
        var filtro;
        filtro = $("#horario").val();
        var arrayEmpleados = JSON.parse(localStorage.getItem("Empleados"));
        var EmpleadosFiltrados;
        EmpleadosFiltrados = arrayEmpleados.filter(function (elemento) {
            return elemento.horario == filtro;
        });
        var total = 0;
        var suma = EmpleadosFiltrados.reduce(function (total, elemento) {
            return total += elemento.edad;
        }, 0);
        var promedio = (suma / EmpleadosFiltrados.length);
        console.log(suma);
        console.log(promedio);
        var stringPromedio;
        stringPromedio = "<input type='text' value=" + promedio + " />";
        $("#promedio").html(String(promedio));
    };
    return Controladora;
}());
