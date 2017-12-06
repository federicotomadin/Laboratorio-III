"use strict";
/// <reference path="Persona.ts" />
/// <reference path="Empleado.ts" />
$(document).ready(function () {
    alert("Bienvenido al sistema");
    Controladora.CargarSelect();
    Controladora.MostrarEmpleado();
});
var foto_string = null;
var Controladora = /** @class */ (function () {
    function Controladora() {
    }
    Controladora.AgregarEmpleado = function () {
        var id = Number($("#ID").val());
        var nombre = String($("#Nombre").val());
        var edad = Number($("#Edad").val());
        var tipo = String($("#Tipo").val());
        var IndiceStorage = localStorage.getItem("Indice");
        var arrayIndice = Array();
        var EmpleadoStorage = localStorage.getItem("Empleado");
        var arrayEmpleado = Array();
        // let ObjetoEmpleado: clases.Empleado = new clases.Empleado(id, nombre, edad, tipo,foto_string);
        if (EmpleadoStorage == null) {
            //  console.log("agregar");
            var ObjetoEmpleado_1 = new clases.Empleado(id, nombre, edad, tipo, foto_string);
            ObjetoEmpleado_1.id = 0;
            var variable = String(ObjetoEmpleado_1.id);
            localStorage.setItem("Indice", variable);
            arrayEmpleado = new Array();
            arrayEmpleado.push(ObjetoEmpleado_1);
            localStorage.setItem("Empleado", JSON.stringify(arrayEmpleado));
            Controladora.MostrarEmpleado();
            Controladora.LimpiarForm();
            return;
        }
        //sino es NULL quiere decir que estoy modificando esa posicion de memoria.
        var index = $("#indexModificar").val();
        arrayEmpleado = JSON.parse(localStorage.getItem('Empleado'));
        if (index !== "") {
            var i = Number(index);
            var aux = Number(arrayEmpleado[index].id);
            var paraEnum = new Array();
            var ObjetoEmpleado_2 = new clases.Empleado(aux, nombre, edad, tipo, foto_string);
            //  console.log("Mascota a modificar");
            //console.log(arrayMascotas[i]);
            arrayEmpleado.splice(i, 1);
            arrayEmpleado.push(ObjetoEmpleado_2);
            //guardo los id en un array numerico para ordenarlo
            for (var i_1 = 0; i_1 < arrayEmpleado.length; i_1++) {
                paraEnum.push(arrayEmpleado[i_1].id);
            }
            paraEnum.sort(Controladora.funcionDeComparacion);
            //creo un array auxiliar y voy comparando cada enum con el 
            //elemento del array
            var arrayEmpleado2 = new Array();
            for (var i_2 = 0; i_2 < paraEnum.length; i_2++) {
                for (var j = 0; j < arrayEmpleado.length; j++) {
                    if (paraEnum[i_2] == arrayEmpleado[j].id) {
                        arrayEmpleado2.push(arrayEmpleado[j]);
                    }
                }
            }
            localStorage.setItem("Empleado", JSON.stringify(arrayEmpleado2));
            Controladora.LimpiarForm();
            Controladora.MostrarEmpleado();
            return;
        }
        var ObjetoEmpleado = new clases.Empleado(id, nombre, edad, tipo, foto_string);
        arrayIndice = new Array();
        arrayIndice = JSON.parse(localStorage.getItem("Indice"));
        arrayIndice.push(6);
        localStorage.setItem("Indice", JSON.stringify(arrayIndice));
        arrayIndice = JSON.parse(localStorage.getItem("Indice"));
        ObjetoEmpleado.id = arrayIndice.length;
        arrayEmpleado.push(ObjetoEmpleado);
        localStorage.setItem("Empleado", JSON.stringify(arrayEmpleado));
        Controladora.LimpiarForm();
        Controladora.MostrarEmpleado();
    };
    Controladora.funcionDeComparacion = function (a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        // a debe ser igual b
        return 0;
    };
    Controladora.encodeImageFileAsURL = function () {
        var filesSelected = document.getElementById("inputFileToLoad").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result;
                foto_string = srcData;
            };
            fileReader.readAsDataURL(fileToLoad);
        }
        /* let file_data = $('#file').val();
         let  FotoStorage = localStorage.getItem("foto");

         localStorage.setItem("foto", JSON.stringify(file_data));

         localStorage.getItem('foto');
         let variable='<img src="file_data">';
         
       console.log(file_data);
         $('#respuesta').html('<img src='+ file_data + '/>');
         */
        /*$('#file').change(function() {
            
                        var file = (this.files[0].name).toString();
            
                        $('#respuesta').empty().text(file);
            
                        portrait_uploader.reader.onload = function(e)
                        {
                            $('#respuesta').attr('src', e.target.result);
                        }
            
     
        
    })*/
    };
    Controladora.LimpiarForm = function () {
        $("#ID").val("");
        $("#Nombre").val("");
        $("#Edad").val("");
        $("#Tipo").val("perro");
        $("#foto").val("");
    };
    Controladora.MostrarEmpleado = function () {
        var stringTabla;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>EDAD</th><th>TIPO</th><th>FOTO</th><th>ACCION</th></tr></thead>";
        var valoresTabla = " ";
        var arrayEmpleado = JSON.parse(localStorage.getItem("Empleado"));
        for (var i = 0; i < arrayEmpleado.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayEmpleado[i].id + "</td>";
            valoresTabla += "<td>" + arrayEmpleado[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayEmpleado[i].edad + "</td>";
            valoresTabla += "<td>" + arrayEmpleado[i].tipo + "</td>";
            valoresTabla += "<td>" + "<img src='" + arrayEmpleado[i].foto + "' height='50' alt=''></td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    //------------------------------PROMEDIO --------------------------------------------------//
    Controladora.PromedioEdad = function () {
        var arrayEmpleado = JSON.parse(localStorage.getItem("Empleado"));
        var total = 0;
        var suma = arrayEmpleado.reduce(function (total, elemento) {
            return total += elemento.edad;
        }, 0);
        $("#promedio").html(String((suma / arrayEmpleado.length)));
    };
    //----------------------------- CARGA SELECT --------------------------------------//
    Controladora.CargarSelect = function () {
        for (var i = 0; i < 4; i++) {
            $("#Tipo").append(new Option(clases.Tipos[i]));
        }
    };
    //--------------------------------  FILTROS  -----------------------------------//
    Controladora.FiltroColID = function () {
        var arrayEmpleado = JSON.parse(localStorage.getItem("Empleado"));
        var arrayMapEmpleado = arrayEmpleado.map(function (elemeto) {
            return (elemeto.id);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapEmpleado.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayEmpleado[i].id + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.FiltroColNombre = function () {
        var arrayEmpleado = JSON.parse(localStorage.getItem("Empleado"));
        var arrayMapEmpleado = arrayEmpleado.map(function (elemeto) {
            return (elemeto.nombre);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Nombre</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapEmpleado.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayEmpleado[i].nombre + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.FiltroColEdad = function () {
        var arrayEmpleado = JSON.parse(localStorage.getItem("Empleado"));
        var arrayMapEmpleado = arrayEmpleado.map(function (elemeto) {
            return (elemeto.edad);
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Edad</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < arrayMapEmpleado.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayEmpleado[i].edad + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    Controladora.EliminarEmpleado = function (index) {
        var arrayEmpleado = JSON.parse(localStorage.getItem("Empleado"));
        arrayEmpleado.splice(index, 1);
        localStorage.setItem("Empleado", JSON.stringify(arrayEmpleado));
        Controladora.MostrarEmpleado();
    };
    Controladora.ModificarEmpleado = function (index) {
        var arrayEmpleado = JSON.parse(localStorage.getItem("Empleado"));
        console.log(arrayEmpleado);
        $("#ID").val(arrayEmpleado[index].id);
        $("#Nombre").val(arrayEmpleado[index].nombre);
        $("#Edad").val(arrayEmpleado[index].edad);
        $("#Tipo").val(arrayEmpleado[index].tipo);
        // $("#foto").val(arrayEmpleado[index].foto);
        $("#indexModificar").val(index.toString());
    };
    Controladora.FiltrarPorTipo = function () {
        var arrayEmpleado = JSON.parse(localStorage.getItem("Empleado"));
        var EmpleadoFiltradas = arrayEmpleado.filter(function (elemento) {
            return elemento.tipo == $("#Tipo_Modal").val();
        });
        EmpleadoFiltradas.map(function (user) {
            return { id: user.id, nombre: user.nombre, edad: user.edad, tipo: user.tipo, foto: user.foto };
        });
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>EDAD</th><th>TIPO</th><th>FOTO</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        for (var i = 0; i < EmpleadoFiltradas.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + EmpleadoFiltradas[i].id + "</td>";
            valoresTabla += "<td>" + EmpleadoFiltradas[i].nombre + "</td>";
            valoresTabla += "<td>" + EmpleadoFiltradas[i].edad + "</td>";
            valoresTabla += "<td>" + EmpleadoFiltradas[i].tipo + "</td>";
            valoresTabla += "<td>" + "<img src='" + EmpleadoFiltradas[i].foto + "' height='50' alt=''></td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    return Controladora;
}());
