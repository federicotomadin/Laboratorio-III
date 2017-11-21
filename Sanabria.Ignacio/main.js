"use strict";
///<reference path="persona.ts" />
///<reference path="empleado.ts" />
///<reference path="controladora.ts" />
var main;
(function (main) {
    function agregar() {
        Controladora.AgregarEmpleado();
    }
    main.agregar = agregar;
    function mostrar() {
        Controladora.MostrarEmpleados();
    }
    main.mostrar = mostrar;
    function filtrar() {
        Controladora.FiltrarPorHorario();
    }
    main.filtrar = filtrar;
    function promedioHorario() {
        Controladora.PromedioEdadPorHorario();
    }
    main.promedioHorario = promedioHorario;
})(main || (main = {}));
