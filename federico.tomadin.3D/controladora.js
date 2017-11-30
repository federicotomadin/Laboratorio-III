"use strict";
/// <reference path="Persona.ts" />
/// <reference path="Empleado.ts" />
$(document).ready(function () {
    alert("Bienvenido al sistema");
    Controladora.CargarSelect();
});
var preview = document.querySelector('img');
var Controladora = /** @class */ (function () {
    function Controladora() {
    }
    Controladora.AgregarEmpleado = function () {
        var id = Number($("#ID").val());
        var nombre = String($("#Nombre").val());
        var edad = Number($("#Edad").val());
        var tipo = String($("#Tipo").val());
        var foto = String($("#inputFileToLoad").val());
        var EmpleadoStorage = localStorage.getItem("Empleado");
        var arrayEmpleado = Array();
        var ObjetoEmpleado = new clases.Empleado(id, nombre, edad, tipo, foto);
        if (EmpleadoStorage == null) {
            //  console.log("agregar");
            arrayEmpleado = new Array();
            arrayEmpleado.push(ObjetoEmpleado);
            localStorage.setItem("Empleado", JSON.stringify(arrayEmpleado));
        }
        //sino es NULL quiere decir que estoy modificando esa posicion de memoria.
        var index = $("#indexModificar").val();
        arrayEmpleado = JSON.parse(localStorage.getItem('Empleado'));
        if (index !== "") {
            var i = Number(index);
            //  console.log("Mascota a modificar");
            //console.log(arrayMascotas[i]);
            arrayEmpleado.splice(i, 1);
        }
        arrayEmpleado.push(ObjetoEmpleado);
        localStorage.setItem("Empleado", JSON.stringify(arrayEmpleado));
        Controladora.LimpiarForm();
        Controladora.MostrarEmpleado();
    };
    Controladora.previewFile = function () {
        preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();
        reader.onload = function () {
            preview.src = reader.result;
        };
        if (file) {
            reader.readAsDataURL(file);
        }
        else {
            preview.src = "";
        }
        /*  public static  encodeImageFileAsURL() {
          
                var filesSelected = $("#inputFileToLoad").files;
                if (filesSelected.length > 0) {
                    var fileToLoad = filesSelected[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result;
                    foto_string = srcData;
                    }
                    fileReader.readAsDataURL(fileToLoad);

                   // console.log(fileToLoad)
                }*/
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
    /*  public static  encodeImageFileAsURL() {
      
            var filesSelected = $("#inputFileToLoad").files;
            if (filesSelected.length > 0) {
                var fileToLoad = filesSelected[0];
                var fileReader = new FileReader();
                fileReader.onload = function(fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result;
                foto_string = srcData;
                }
                fileReader.readAsDataURL(fileToLoad);

               // console.log(fileToLoad)
            }*/
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
    Controladora.LimpiarForm = function () {
        $("#ID").val("");
        $("#Nombre").val("");
        $("#Edad").val("");
        $("#Tipo").val("perro");
    };
    Controladora.MostrarEmpleado = function (img) {
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
            valoresTabla += "<td>" + "<img src=" + img + ">" + "</td>";
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
    Controladora.ModificarMascota = function (index) {
        var arrayEmpleado = JSON.parse(localStorage.getItem("Empleado"));
        $("#ID").val(arrayEmpleado[index].id);
        $("#Nombre").val(arrayEmpleado[index].nombre);
        $("#Edad").val(arrayEmpleado[index].edad);
        $("#Tipo").val(arrayEmpleado[index].tipo);
        $("#indexModificar").val(index.toString());
    };
    Controladora.FiltrarPorTipo = function () {
        var stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>EDAD</th><th>TIPO</th><th>ACCION</th></tr></thead>";
        var valoresTabla = "";
        var arrayEmpleado = JSON.parse(localStorage.getItem("Empleado"));
        var EmpleadoFiltradas = arrayEmpleado.filter(function (elemento) {
            return elemento.tipo == $("#Tipo").val();
        });
        for (var i = 0; i < EmpleadoFiltradas.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + EmpleadoFiltradas[i].id + "</td>";
            valoresTabla += "<td>" + EmpleadoFiltradas[i].nombre + "</td>";
            valoresTabla += "<td>" + EmpleadoFiltradas[i].edad + "</td>";
            valoresTabla += "<td>" + EmpleadoFiltradas[i].tipo + "</td>";
            valoresTabla += "</tr>";
        }
        $("#divTabla").html(stringTabla + valoresTabla);
    };
    return Controladora;
}());
