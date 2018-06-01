
$(document).ready(function () {
    CargarLista();
    $("#btnAgregar").click(ManejadorBtn);
})

//https://www.youtube.com/watch?v=kvlBmon98xg   
function ManejadorBtn(index) {

    var botonActuar = $("#btnAgregar").val();

    if (botonActuar == "Modificar") {
        $("#btnAgregar").click(function () {
            ModificarPersona(index);
        });
    }
    else {
        AgregarPersona();
    }
}

function AgregarPersona() {

    var personaJson = { "nombre": $('#nombreStr').val(), "apellido": $('#apellidoStr').val() };

    if (ValidarDatos($('#nombreStr').val(), $('#apellidoStr').val())) {

        $.ajax({
            url: 'http://localhost:3000/agregarpersona',
            data: personaJson,
            method: 'post',
            dataType: 'json'
        })
        $("#nombreStr").val("");
        $("#apellidoStr").val("");
        CargarLista();
    }
}


function ModificarPersona(index) {
 
    varPersona = new Object();
    varPersona.nombre = $('#nombreStr').val();
    varPersona.apellido = $('#apellidoStr').val();

     var personaJson = { "indice": index, "persona": JSON.stringify(varPersona) };
    $.ajax({

        url: 'http://localhost:3000/modificarpersona',
        data: personaJson,
        method: 'post',
        dataType: 'json'
    })
    $("#btnAgregar").attr('value', 'Agregar');
    $("#nombreStr").val("");
    $("#apellidoStr").val("");
    $("#respuesta").text("Modificado con exito");

    CargarLista();

}

function TraerPersona(indice) {

   var persona="";
    $.ajax({

        url: 'http://localhost:3000/traerpersona?indice=' + indice,
        method: 'get',
        dataType: 'json',
        success: function(response)
        {
         persona = response;
         $('#nombreStr').val(persona.nombre);
         $('#apellidoStr').val(persona.apellido);
        }
    })

}


function ModificarJquery(index) {

    $("#btnAgregar").attr('value', 'Modificar');
    TraerPersona(index);
    ManejadorBtn(index);
}


function CargarLista() {

    var personas = [];
    var body = "";

    $.ajax({
        url: 'http://localhost:3000/traerpersonas',
        method: 'get',
        dataType: 'json',
        success: function (response) {

            personas = $(response);
            for (i = 0; i < personas.length; i++) {

                if (personas[i] == null) continue;
                var cadena = "<tr><td>" + personas[i].nombre +
                    "</td><td>" + personas[i].apellido +
                    "</td><td><input type='button' onclick='BorrarJquery(" + i + ")' id='btnBorrar' value='Borrar'></td><td><input type='button' onclick='ModificarJquery(" + i + ")' id='btnAgregar' value='Modificar'></tr>";
                body += cadena;
            }
            $("#contenido").html(body);
        }
    })
}



function BorrarJquery(index) {
    info = 'indice=' + encodeURIComponent(index);
    $.ajax({
        url: 'http://localhost:3000/eliminarpersona',
        data: info,
        method: 'post',
        dataType: 'json',
    })
    CargarLista();
}

function ValidarDatos(nombre, apellido) {
    if (nombre == '' && apellido == '') {
        $('#nombreStr').css("border-color", "red");
        $('#apellidoStr').css("border-color", "red");
        return false;
    } else if (nombre == '') {
        $('#nombreStr').css("border-color", "red");
        return false;
    } else if (apellido == '') {
        $('#apellidoStr').css("border-color", "red");
        return false;
    }

    return true;
}


