"use strict";
///<reference path="persona.ts" />
///<reference path="empleado.ts" />
var Controladora = /** @class */ (function () {
    function Controladora() {
    }
    Controladora.AgregarEmpleado = function () {
        var nombre = document.getElementById("nombre").value;
        var apellido = document.getElementById("apellido").value;
        var horario = document.getElementById("horario").value;
        var edad = Number(document.getElementById("edad").value);
        var legajo = Number(document.getElementById("legajo").value);
        var empleadosStorage = localStorage.getItem("Empleados");
        var arrayEmpleados = Array();
        var empleadoNuevo = new Empleado(nombre, apellido, edad, horario, legajo);
        if (empleadosStorage == null) {
            arrayEmpleados = new Array();
            arrayEmpleados.push(empleadoNuevo);
            localStorage.setItem("Empleados", JSON.stringify(arrayEmpleados));
        }
        else {
            var index = document.getElementById("indexModificar").value;
            arrayEmpleados = JSON.parse(localStorage.getItem("Empleados"));
            if (index !== "") {
                var i = Number(index);
                console.log("Empleado a modificar");
                console.log(arrayEmpleados[i]);
                arrayEmpleados.splice(i, 1);
                localStorage.clear();
            }
            arrayEmpleados.push(empleadoNuevo);
            localStorage.setItem("Empleados", JSON.stringify(arrayEmpleados));
            Controladora.LimpiarForm();
        }
    };
    Controladora.LimpiarForm = function () {
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("horario").value = "Mañana";
        document.getElementById("legajo").value = "";
        document.getElementById("indexModificar").value = "";
    };
    Controladora.MostrarEmpleados = function () {
        var stringTabla;
        stringTabla = "<table class='table'><thead><tr><th>NOMBRE</th>" +
            "<th>APELLIDO</th><th>EDAD</th><th>LEGAJO</th><th>HORARIO</th><th>ACCION</th></tr>";
        var valoresTabla = " ";
        var arrayEmpleados = JSON.parse(localStorage.getItem("Empleados"));
        for (var i = 0; i < arrayEmpleados.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayEmpleados[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayEmpleados[i].apellido + "</td>";
            valoresTabla += "<td>" + arrayEmpleados[i].edad + "</td>";
            valoresTabla += "<td>" + arrayEmpleados[i].legajo + "</td>";
            valoresTabla += "<td>" + arrayEmpleados[i].horario + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><br><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
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
        document.getElementById("nombre").value = arrayEmpleados[index].nombre;
        document.getElementById("apellido").value = arrayEmpleados[index].apellido;
        document.getElementById("edad").value = arrayEmpleados[index].edad;
        document.getElementById("horario").value = arrayEmpleados[index].horario;
        document.getElementById("legajo").value = arrayEmpleados[index].legajo;
        document.getElementById("indexModificar").value = index.toString();
    };
    Controladora.FiltrarPorHorario = function () {
        var filtro;
        filtro = document.getElementById("horario").value;
        var stringTabla;
        stringTabla = "<table class='table'><thead><tr><th>NOMBRE</th>" +
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
        document.getElementById("divTabla").innerHTML = stringTabla + valoresTabla;
    };
    Controladora.PromedioEdadPorHorario = function () {
        var filtro;
        filtro = document.getElementById("horario").value;
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
        document.getElementById("promedio").innerHTML = stringPromedio;
    };
    return Controladora;
}());
