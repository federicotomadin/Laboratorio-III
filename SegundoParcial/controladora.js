/// <reference path="Persona.ts" />
/// <reference path="Cliente.ts" />
$(document).ready(function () {
    Controladora.CargarSelect();
    Controladora.MostrarClientes();
});
var Controladora = /** @class */ (function () {
    function Controladora() {
    }
    Controladora.AgregarCliente = function () {
        var id = this.GenerarId();
        var nombre = String($("#Nombre").val());
        var apellido = String($("#Apellido").val());
        var edad = Number($("#Edad").val());
        var sexo = String($("#Sexo").val());
        var ObjetoClientes = new clases.Cliente(id, nombre, apellido, edad, sexo);
        if (localStorage.getItem("Clientes") == "") {
            var arrayClientes = new Array();
            arrayClientes.push(ObjetoClientes);
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
            Controladora.LimpiarForm();
            Controladora.CargarSelect();
            Controladora.MostrarClientes();
            return;
        }
        if (localStorage.getItem("Clientes") != "") {
            var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
            arrayClientes.push(ObjetoClientes);
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
            Controladora.LimpiarForm();
            Controladora.CargarSelect();
            Controladora.MostrarClientes();
            return;
        }
        //  }
        //sino es NULL quiere decir que estoy modificando esa posicion de memoria.
        /*   let index:String= String($("#indexModificar").val());
            arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
            if (index !== "") {
               let aux:Number=Number(index);
           
                for (let i = 0; i < arrayClientes.length; i++)
                {
                    if(aux==i)
                    {
                        arrayClientes[i].nombre= ObjetoAlumno.nombre;
                        arrayClientes[i].nota= ObjetoAlumno.legajo;
                        arrayClientes[i].materia=ObjetoAlumno.materia;
                        arrayClientes[i].nota=ObjetoAlumno.nota;
                    }
                }
             
               localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
               Controladora.LimpiarForm();
               Controladora.MostrarClientes();
               return;

            }*/
        /*   arrayClientes.push(ObjetoClientes);
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
            Controladora.LimpiarForm();
            Controladora.MostrarClientes();*/
    };
    Controladora.LimpiarForm = function () {
        $("#Id").val("");
        $("#Nombre").val("");
        $("#Apellido").val("");
        $("#Edad").val("Masculino");
        $("#Sexo").val("");
    };
    Controladora.MostrarClientes = function () {
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Sexo</th></tr></thead>";
        var valoresTabla = " ";
        if (localStorage.getItem("Clientes") == null) {
            localStorage.setItem("Clientes", "");
        }
        else if (localStorage.getItem("Clientes") == "") {
            localStorage.setItem("Clientes", "");
        }
        else {
            var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
            for (var i = 0; i < arrayClientes.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayClientes[i].id + "</td>";
                valoresTabla += "<td>" + arrayClientes[i].nombre + "</td>";
                valoresTabla += "<td>" + arrayClientes[i].apellido + "</td>";
                valoresTabla += "<td>" + arrayClientes[i].edad + "</td>";
                valoresTabla += "<td>" + arrayClientes[i].sexo + "</td>";
                valoresTabla += "</tr>";
            }
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    //----------------------------------PROMEDIO --------------------------------------------------//
    Controladora.PromedioNotas = function () {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        var total = 0;
        var suma = arrayClientes.reduce(function (total, elemento) {
            return total += elemento.nota;
        }, 0);
        $("#promedio").html(String((suma / arrayClientes.length)));
    };
    //-------------------------------------- CARGA SELECT --------------------------------------//
    Controladora.CargarSelect = function () {
        for (var i = 0; i < 2; i++) {
            $("#Sexo").append(new Option(clases.Tipos[i]));
            $("#FiltrarSexo").append(new Option(clases.Tipos[i]));
        }
    };
    //--------------------------------  FILTROS  -----------------------------------//
    Controladora.FiltroColID = function () {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        var arrayMapClientes = arrayClientes.map(function (elemeto) {
            return (elemeto.id);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapClientes.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayClientes[i].id + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarAlumno(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarAlumno(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.FiltroColNombre = function () {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        var arrayMapClientes = arrayClientes.map(function (elemeto) {
            return (elemeto.nombre);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Nombre</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapClientes.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayClientes[i].nombre + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.FiltroColLegajo = function () {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        var arrayMapClientes = arrayClientes.map(function (elemeto) {
            return (elemeto.legajo);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Legajo</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapClientes.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayClientes[i].legajo + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.FiltroColMateria = function () {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        var arrayMapClientes = arrayClientes.map(function (elemeto) {
            return (elemeto.materia);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Materia</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapClientes.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayClientes[i].materia + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.EliminarAlumno = function (index) {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        arrayClientes.splice(index, 1);
        localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
        Controladora.MostrarClientes();
    };
    Controladora.ModificarAlumno = function (index) {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        $("#ID").val(arrayClientes[index].id);
        $("#Nombre").val(arrayClientes[index].nombre);
        $("#Legajo").val(arrayClientes[index].legajo);
        $("#Materia").val(arrayClientes[index].materia);
        $("#Nota").val(arrayClientes[index].nota);
        $("#indexModificar").val(index.toString());
    };
    Controladora.FiltrarPorNota = function () {
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>LEGAJO</th><th>MATERIA</th><th>NOTA</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        var ClientesFiltradas = arrayClientes.filter(function (elemento) {
            return elemento.nota == $("#Nota").val();
        });
        for (var i = 0; i < ClientesFiltradas.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + ClientesFiltradas[i].id + "</td>";
            valoresTabla += "<td>" + ClientesFiltradas[i].nombre + "</td>";
            valoresTabla += "<td>" + ClientesFiltradas[i].legajo + "</td>";
            valoresTabla += "<td>" + ClientesFiltradas[i].materia + "</td>";
            valoresTabla += "<td>" + ClientesFiltradas[i].nota + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.GenerarId = function () {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        if (arrayClientes == null)
            return 0;
        var Mayor = arrayClientes.reduce(function (max, elemento) {
            return (max > elemento.id) ? max : elemento.id;
        }, 0);
        return Mayor + 1;
    };
    Controladora.FiltroNombre = function () {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        var arrayMapClientes = arrayClientes.filter(function (elemento) {
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
        for (var i = 0; i < arrayMapClientes.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayMapClientes[i].id + "</td>";
            valoresTabla += "<td>" + arrayMapClientes[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayMapClientes[i].legajo + "</td>";
            valoresTabla += "<td>" + arrayMapClientes[i].materia + "</td>";
            valoresTabla += "<td>" + arrayMapClientes[i].nota + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarAlumno(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarAlumno(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    return Controladora;
}());
