
$(document).ready(function(){
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

    var apellidoStr = $("#apellidoStr").val();
    var nombreStr = $("#nombreStr").val();

    if(ValidarDatos(nombreStr,apellidoStr))
    {

    info = "nombre=" + encodeURIComponent(nombreStr) + "&apellido=" + encodeURIComponent(apellidoStr);

    $.ajax({
        url: 'http://localhost:3000/agregarpersona',
        data: info,
        method: 'post',
        dataType: 'json'    
    })
    CargarLista();
}
}


function ModificarPersona(index) {

    var apellidoStr = $("#apellidoStr").val();
    var nombreStr = $("#nombreStr").val();  

    varPersona = new Object();
    varPersona.nombre = nombreStr;
    varPersona.apellido = apellidoStr;

    info = 'indice=' + encodeURIComponent(index) + '&persona=' + encodeURIComponent(JSON.stringify(varPersona));

    $.ajax({

        url: 'http://localhost:3000/modificarpersona',
        data: info,
        method: 'post',
        dataType: 'json'        
    })
    $("#btnAgregar").attr('value', 'Agregar');
    CargarLista();

}

function TraerPersona(indice)
{
   
xhr =new XMLHttpRequest();
xhr.onreadystatechange=gestionarRespuestaTraerPersona;
xhr.open('get','traerpersona?indice='+indice,true);
xhr.send();

}

function gestionarRespuestaTraerPersona()
{
    if(xhr.readyState==4)
    {
        if(xhr.status==200)
        {
            var persona=JSON.parse(xhr.responseText);
            document.getElementById('nombreStr').value=persona.nombre;
            document.getElementById('apellidoStr').value=persona.apellido;

        }
    }
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

function ValidarDatos(nombre,apellido)
{
if(nombre=='' && apellido=='')
    {
        $('#nombreStr').css("border-color","red");
        $('#apellidoStr').css("border-color","red");
        return false;
    } else if(nombre=='')
    {
        $('#nombreStr').css("border-color","red");
        return false;
    } else if(apellido=='')
    {
        $('#apellidoStr').css("border-color","red");
        return false;
    }
 
        return true;
}


