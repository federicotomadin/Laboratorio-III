
var restoredPersonas;


function TraerPersonas(){

   $.ajax({
    url: 'http://localhost:3000/notas',
    type: 'get',
    dataType: 'json',
    beforeSend: function(){
        $('#spinner').show();
    },
    success: function(response)
    {
        $('#spinner').hide();
        localStorage.setItem('personas',JSON.stringify(response));       
        CargarTabla(response);
    },
    error:function(jqXHR, textStatus, textError){ alert("error!!" + textStatus + textError)}
   })

}

function Guardar() {
    
        //Tomo los valores del HTML
        var id= localStorage.getItem('id');

        var alumno = { "id": id, "legajo": $('#txtLegajo').val(),
        "nombre": $('#txtNombre').val(), "materia": $('#txtMateria').val(),
        "nota":  $('#txtNota').val()};
   
        var indice = $('#hdIndice').val();
    
        $('#spinner').show();
        $.ajax({
        url: 'http://localhost:3000/editarNota',
        data: alumno,
        method: 'post',
        dataType: 'json',
        success: function(response)
        { 
        TraerPersonas();
        $('#hdLegajo').val() = "";
        $('#txtNombre').val() = "";
        $('#txtMateria').val() = "";
        $('#txtNota').val() = "";
        $('#spinner').hide();
        }

        })
        
        $('.vgVentana').hide();
           
    }


function TraerPersona(indice) {
    var objetoJSON= JSON.parse(localStorage.getItem('personas'));
  
    localStorage.setItem('id',JSON.stringify(objetoJSON[indice].id));
    $('#txtLegajo').val(objetoJSON[indice].legajo); 
    $('#txtNombre').val(objetoJSON[indice].nombre);
    $('#txtMateria').val(objetoJSON[indice].materia);
    $('#txtNota').val(objetoJSON[indice].nota);

    $('.vgVentana').show();
    
  }

function LimpiarTabla(){

    var tCuerpo = $("#tCuerpo").html("");
                      }


    function CargarTabla(restoredPersonas){
        
            LimpiarTabla();
            var body=""; 
        
            for(i = 0; i < restoredPersonas.length; i++ ){
                
                if(restoredPersonas[i].nota < 4)
                {
                   var cadena=
                    "<tr><td style= 'color : red'>" + restoredPersonas[i].legajo + "</td>" +
                    "<td style= 'color : red'>" + restoredPersonas[i].nombre + "</td>" +
                    "<td style= 'color : red'>" + restoredPersonas[i].materia + "</td>" +
                    "<td style= 'color : red'>" + restoredPersonas[i].nota + "</td>" +
                    "<td><input id='btnModificar' class='btn btn-primary' type='button' value='Editar' onclick='TraerPersona(" + i + ");'/></td></tr>"
                    body+=cadena;  
                }
        
               var cadena2=
                "<tr><td>" + restoredPersonas[i].legajo + "</td>" +
                "<td>" + restoredPersonas[i].nombre + "</td>" +
                "<td>" + restoredPersonas[i].materia + "</td>" +
                "<td>" + restoredPersonas[i].nota + "</td>" +
                "<td><input id='btnModificar' class='btn btn-primary' type='button' value='Editar' onclick='TraerPersona(" + i + ");'/></td></tr>"
                body+=cadena2;     
            }
            $("#tCuerpo").html(body);

    }

function Cerrar()
{
    $('.vgVentana').hide();

}


$(document).ready(function()
{
     $('#btnGuardar').click(Guardar)

    $('#btnCerrar').click(Cerrar)


    $('#spinner').html("<img src='spinner.gif'>");
    $('#spinner').hide();
    $('.vgVentana').hide();
    
    var usuario = localStorage.getItem('usuario');
  
    if(usuario==='Admin')  
    {
        $('#spinner').hide();
        $("#contenedor").show();
        TraerPersonas();
        return;
    }

    TraerPersonas();
    $("#contenedor").hide();
   
})

