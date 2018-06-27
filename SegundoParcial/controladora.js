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
        var legajo = Number($("#Legajo").val());
        var materia = String($("#Materia").val());
        var nota = Number($("#Nota").val());
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var ObjetoAlumno = new clases.Alumno(id, nombre, legajo, materia, nota);
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
                    arrayAlumnos[i].nota = ObjetoAlumno.legajo;
                    arrayAlumnos[i].materia = ObjetoAlumno.materia;
                    arrayAlumnos[i].nota = ObjetoAlumno.nota;
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
        $("#Legajo").val("");
        $("#Materia").val("morocho");
        $("#Nota").val("");
    };
    Controladora.MostrarAlumnos = function () {
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>LEGAJO</th><th>MATERIA</th><th>NOTA</th><th>ACCION</th></tr></thead>";
        var valoresTabla = " ";
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        for (var i = 0; i < arrayAlumnos.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayAlumnos[i].id + "</td>";
            valoresTabla += "<td>" + arrayAlumnos[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayAlumnos[i].legajo + "</td>";
            valoresTabla += "<td>" + arrayAlumnos[i].materia + "</td>";
            valoresTabla += "<td>" + arrayAlumnos[i].nota + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarAlumno(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarAlumno(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    //----------------------------------PROMEDIO --------------------------------------------------//
    Controladora.PromedioNotas = function () {
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var total = 0;
        var suma = arrayAlumnos.reduce(function (total, elemento) {
            return total += elemento.nota;
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
    Controladora.FiltroColLegajo = function () {
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var arrayMapAlumnos = arrayAlumnos.map(function (elemeto) {
            return (elemeto.legajo);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Legajo</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapAlumnos.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayAlumnos[i].legajo + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.FiltroColMateria = function () {
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var arrayMapAlumnos = arrayAlumnos.map(function (elemeto) {
            return (elemeto.materia);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Materia</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapAlumnos.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayAlumnos[i].materia + "</td>";
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
        $("#Legajo").val(arrayAlumnos[index].legajo);
        $("#Materia").val(arrayAlumnos[index].materia);
        $("#Nota").val(arrayAlumnos[index].nota);
        $("#indexModificar").val(index.toString());
    };
    Controladora.FiltrarPorNota = function () {
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>LEGAJO</th><th>MATERIA</th><th>NOTA</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        var arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
        var AlumnosFiltradas = arrayAlumnos.filter(function (elemento) {
            return elemento.nota == $("#Nota").val();
        });
        for (var i = 0; i < AlumnosFiltradas.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + AlumnosFiltradas[i].id + "</td>";
            valoresTabla += "<td>" + AlumnosFiltradas[i].nombre + "</td>";
            valoresTabla += "<td>" + AlumnosFiltradas[i].legajo + "</td>";
            valoresTabla += "<td>" + AlumnosFiltradas[i].materia + "</td>";
            valoresTabla += "<td>" + AlumnosFiltradas[i].nota + "</td>";
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
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>LEGAJO</th><th>MATERIA</th><th>NOTA</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapAlumnos.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayMapAlumnos[i].id + "</td>";
            valoresTabla += "<td>" + arrayMapAlumnos[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayMapAlumnos[i].legajo + "</td>";
            valoresTabla += "<td>" + arrayMapAlumnos[i].materia + "</td>";
            valoresTabla += "<td>" + arrayMapAlumnos[i].nota + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarAlumno(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarAlumno(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    return Controladora;
}());
