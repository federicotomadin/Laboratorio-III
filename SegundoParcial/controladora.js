/// <reference path="Persona.ts" />
/// <reference path="Alumno.ts" />
$(document).ready(function () {
    alert("Bienvenido al sistema");
    Controladora.CargarSelect();
    Controladora.MostrarAlumnos();
});
var Controladora = /** @class */ (function () {
    function Controladora() {
    }
    Controladora.AgregarAlumno = function () {
        var id = this.GenerarId();
        var nombre = String($("#Nombre").val());
        var edad = Number($("#Edad").val());
        var tipo = String($("#Tipo").val());
        var cantidad_patas = Number($("#CantidadPatas").val());
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var ObjetoAlumno = new clases.Alumno(id, nombre, edad, cantidad_patas, tipo);
        if (arrayAlumnos == null) {
            console.log("agregar");
            arrayAlumnos = new Array();
            arrayAlumnos.push(ObjetoAlumno);
            localStorage.setItem("Alumnos", JSON.stringify(arrayAlumnos));
            Controladora.LimpiarForm();
            Controladora.CargarSelect();
            Controladora.MostrarAlumnos();
            return;
        }
        //sino es NULL quiere decir que estoy modificando esa posicion de memoria.
        var index = String($("#indexModificar").val());
        arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        if (index !== "") {
            var aux = Number(index);
            for (var i = 0; i < arrayAlumnos.length; i++) {
                if (aux == i) {
                    arrayAlumnos[i].nombre = ObjetoAlumno.nombre;
                    arrayAlumnos[i].edad = ObjetoAlumno.edad;
                    arrayAlumnos[i].tipo = ObjetoAlumno.tipo;
                    arrayAlumnos[i].cantidad_patas = ObjetoAlumno.cantidad_patas;
                }
            }
            localStorage.setItem("Alumnos", JSON.stringify(arrayAlumnos));
            Controladora.LimpiarForm();
            Controladora.MostrarAlumnos();
            return;
        }
        arrayAlumnos.push(ObjetoAlumno);
        localStorage.setItem("Alumnos", JSON.stringify(arrayAlumnos));
        Controladora.LimpiarForm();
        Controladora.MostrarAlumnos();
    };
    Controladora.LimpiarForm = function () {
        $("#ID").val("");
        $("#Nombre").val("");
        $("#Edad").val("");
        $("#Tipo").val("morocho");
        $("#CantidadPatas").val("");
    };
    Controladora.MostrarAlumnos = function () {
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>EDAD</th><th>CANTIDAD DE PATAS</th><th>TIPO</th><th>ACCION</th></tr></thead>";
        var valoresTabla = " ";
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        for (var i = 0; i < arrayAlumnos.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayAlumnos[i].id + "</td>";
            valoresTabla += "<td>" + arrayAlumnos[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayAlumnos[i].edad + "</td>";
            valoresTabla += "<td>" + arrayAlumnos[i].cantidad_patas + "</td>";
            valoresTabla += "<td>" + arrayAlumnos[i].tipo + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarAlumno(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarAlumno(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    //----------------------------------PROMEDIO --------------------------------------------------//
    Controladora.PromedioPatas = function () {
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var total = 0;
        var suma = arrayAlumnos.reduce(function (total, elemento) {
            return total += elemento.cantidad_patas;
        }, 0);
        $("#promedio").html(String((suma / arrayAlumnos.length)));
    };
    //-------------------------------------- CARGA SELECT --------------------------------------//
    Controladora.CargarSelect = function () {
        for (var i = 0; i < 6; i++) {
            $("#Tipo").append(new Option(clases.Tipos[i]));
        }
    };
    //--------------------------------  FILTROS  -----------------------------------//
    Controladora.FiltroColID = function () {
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var arrayMapAlumnos = arrayAlumnos.map(function (elemeto) {
            return (elemeto.id);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapAlumnos.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayAlumnos[i].id + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarAlumno(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarAlumno(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.FiltroColNombre = function () {
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var arrayMapAlumnos = arrayAlumnos.map(function (elemeto) {
            return (elemeto.nombre);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Nombre</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapAlumnos.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayAlumnos[i].nombre + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.FiltroColEdad = function () {
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var arrayMapAlumnos = arrayAlumnos.map(function (elemeto) {
            return (elemeto.edad);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Edad</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapAlumnos.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayAlumnos[i].edad + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.FiltroColCantidadPatas = function () {
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var arrayMapAlumnos = arrayAlumnos.map(function (elemeto) {
            return (elemeto.cantidad_patas);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Cantidad de Patas</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapAlumnos.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayAlumnos[i].cantidad_patas + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.EliminarAlumno = function (index) {
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        arrayAlumnos.splice(index, 1);
        localStorage.setItem("Alumnos", JSON.stringify(arrayAlumnos));
        Controladora.MostrarAlumnos();
    };
    Controladora.ModificarAlumno = function (index) {
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        $("#ID").val(arrayAlumnos[index].id);
        $("#Nombre").val(arrayAlumnos[index].nombre);
        $("#Edad").val(arrayAlumnos[index].edad);
        $("#CantidadPatas").val(arrayAlumnos[index].cantidad_patas);
        $("#Tipo").val(arrayAlumnos[index].tipo);
        $("#indexModificar").val(index.toString());
    };
    Controladora.FiltrarPorTipo = function () {
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>EDAD</th><th>CANTIDAD DE PATAS</th><th>TIPO</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var AlumnosFiltradas = arrayAlumnos.filter(function (elemento) {
            return elemento.tipo == $("#Tipo").val();
        });
        for (var i = 0; i < AlumnosFiltradas.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + AlumnosFiltradas[i].id + "</td>";
            valoresTabla += "<td>" + AlumnosFiltradas[i].nombre + "</td>";
            valoresTabla += "<td>" + AlumnosFiltradas[i].edad + "</td>";
            valoresTabla += "<td>" + AlumnosFiltradas[i].cantidad_patas + "</td>";
            valoresTabla += "<td>" + AlumnosFiltradas[i].tipo + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.GenerarId = function () {
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        if (arrayAlumnos == null)
            return 0;
        var Mayor = arrayAlumnos.reduce(function (max, elemento) {
            return (max > elemento.id) ? max : elemento.id;
        }, 0);
        return Mayor + 1;
    };
    Controladora.FiltroNombre = function () {
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var arrayMapAlumnos = arrayAlumnos.filter(function (elemento) {
            var variable = elemento.nombre;
            console.log(variable.charAt(1));
            for (var i = 0; i < variable.length; i++) {
                if (variable.charAt(i) == String($("#Buscar").val()) || variable == String($("#Buscar").val()))
                    return true;
            }
        });
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>EDAD</th><th>CANTIDAD DE PATAS</th><th>TIPO</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapAlumnos.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayMapAlumnos[i].id + "</td>";
            valoresTabla += "<td>" + arrayMapAlumnos[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayMapAlumnos[i].edad + "</td>";
            valoresTabla += "<td>" + arrayMapAlumnos[i].cantidad_patas + "</td>";
            valoresTabla += "<td>" + arrayMapAlumnos[i].tipo + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarAlumno(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarAlumno(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    return Controladora;
}());
