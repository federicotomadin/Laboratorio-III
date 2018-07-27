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
            Controladora.MostrarClientes();
            return;
        }
        if (localStorage.getItem("Clientes") != "") {
            var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
            arrayClientes.push(ObjetoClientes);
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
            Controladora.LimpiarForm();
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
        $("#Nombre").val("Matias");
        $("#Apellido").val("Ramos");
        $("#Edad").val("30");
        $("#Sexo").val("Masculino");
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
                valoresTabla += "<tr onclick='Controladora.ModificarCliente(" + i + ")'>";
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
    Controladora.PromedioEdad = function () {
        var edadAcum = 0;
        var sexo = $("#FiltrarSexo").val();
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        var arrayMapClientes = arrayClientes.filter(function (elemento) {
            return elemento.sexo == sexo;
        }).reduce(function (previo, actual) {
            edadAcum += (previo.edad + actual.edad);
        });
        $("#Promedio").val(edadAcum / (arrayClientes.length));
    };
    //-------------------------------------- CARGA SELECT --------------------------------------//
    Controladora.CargarSelect = function () {
        for (var i = 0; i < 2; i++) {
            $("#Sexo").append(new Option(clases.Tipos[i]));
            $("#FiltrarSexo").append(new Option(clases.Tipos[i]));
        }
    };
    //--------------------------------  FILTROS  -----------------------------------//
    Controladora.FiltroColId = function () {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        var arrayMapClientes = arrayClientes.map(function (elemento) {
            return (elemento.nombre, elemento.apellido, elemento.edad, elemento.sexo);
        });
        console.log(arrayClientes);
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Sexo</th></tr></thead>";
        var valoresTabla = " ";
        for (var i = 0; i < arrayClientes.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayClientes[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].apellido + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].edad + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].sexo + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.FiltroColNombre = function () {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        var arrayMapClientes = arrayClientes.map(function (elemento) {
            return (elemento.id, elemento.apellido, elemento.edad, elemento.sexo);
        });
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>Id</th><th>Apellido</th><th>Edad</th><th>Sexo</th></tr></thead>";
        var valoresTabla = " ";
        for (var i = 0; i < arrayClientes.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayClientes[i].id + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].apellido + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].edad + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].sexo + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.FiltroColApellido = function () {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        var arrayMapClientes = arrayClientes.map(function (elemento) {
            return (elemento.id, elemento.nombre, elemento.edad, elemento.sexo);
        });
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Sexo</th></tr></thead>";
        var valoresTabla = " ";
        for (var i = 0; i < arrayClientes.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayClientes[i].id + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].edad + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].sexo + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.FiltroColEdad = function () {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        var arrayMapClientes = arrayClientes.map(function (elemento) {
            return (elemento.id, elemento.nombre, elemento.apellido, elemento.sexo);
        });
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>Id</th><th>Nombre</th><th>Apellido</th><th>Sexo</th></tr></thead>";
        var valoresTabla = " ";
        for (var i = 0; i < arrayClientes.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayClientes[i].id + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].apellido + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].sexo + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.EliminarCliente = function () {
        var index = Number($("#indexModificar").val());
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        arrayClientes.splice(index, 1);
        localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
        Controladora.MostrarClientes();
        Controladora.LimpiarForm();
    };
    Controladora.ModificarCliente = function (index) {
        var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        $("#Id").val(arrayClientes[index].id);
        $("#Nombre").val(arrayClientes[index].nombre);
        $("#Apellido").val(arrayClientes[index].apellido);
        $("#Edad").val(arrayClientes[index].edad);
        $("#Sexo").val(arrayClientes[index].sexo);
        $("#indexModificar").val(index.toString());
    };
    Controladora.LimpiarLocalStorage = function () {
        localStorage.clear();
    };
    Controladora.GenerarId = function () {
        if (localStorage.getItem("Clientes") == "")
            return 0;
        else {
            var arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
        }
        var Mayor = arrayClientes.reduce(function (max, elemento) {
            return (max > elemento.id) ? max : elemento.id;
        }, 0);
        return Mayor + 1;
    };
    return Controladora;
}());
