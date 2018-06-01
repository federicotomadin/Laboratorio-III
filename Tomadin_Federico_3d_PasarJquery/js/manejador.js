
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
        if(response.type==='error')
        {
            $("#MensajeErrorAfuera").show();
            $("#MensajeError").show();
            $("#MensajeError").html("<input id='btnCerrarMensaje'  type='button' value='Cerrar' onclick='Cerrar()'>" + (JSON.stringify(response.message)));
        }
    


        $('#spinner').hide();
        localStorage.setItem('personas',JSON.stringify(response));       
        CargarTabla(response);
    },
    error:function(jqXHR, textStatus, textError){ $("#MensajeError").html(("error!!" + textStatus + textError))}
   })

}

function TraerPersonasComun(){
    
       $.ajax({
        url: 'http://localhost:3000/notas',
        type: 'get',
        dataType: 'json',
        beforeSend: function(){
            $('#spinner').show();
        },
        success: function(response)
        {
            if(response.type==='error')
            {
                $("#MensajeErrorAfuera").show();
                $("#MensajeError").show();
                $("#MensajeError").html("<input id='btnCerrarMensaje'  type='button' value='Cerrar' onclick='Cerrar()'>" + (JSON.stringify(response.message)));
            }
        

            $('#spinner').hide();
            localStorage.setItem('personas',JSON.stringify(response));       
            CargarTablaComun(response);
        },
        error:function(jqXHR, textStatus, textError){ $("#MensajeError").html(("error!!" + textStatus + textError))}
       })
    
    }



function Guardar() {
    
        var id= localStorage.getItem('id');
        
        var legajo=$('#txtLegajo').val();
        var nombre= $('#txtNombre').val();
        var materia=$('#txtMateria').val();
        var nota=$('#txtNota').val();
 
        var alumno = { "id": id, "legajo": legajo,
        "nombre": nombre, "materia": materia,
        "nota":  nota};
         
        var indice = $('#hdIndice').val();
     
    
        $('#spinner').show();
        $.ajax({
        url: 'http://localhost:3000/editarNota',
        data: alumno,
        method: 'post',
        beforeSend: function(){
            $('#spinner').show();
        },
        dataType: 'json',
        success: function(response)
        {    
            if(response.type==='error')
            {
                $("#MensajeErrorAfuera").show();
                $("#MensajeError").show();
                $("#MensajeError").html("<input id='btnCerrarMensaje'  type='button' value='Cerrar' onclick='Cerrar()'>" + (JSON.stringify(response.message)));
            }
        
            
        TraerPersonas();
        $('#txtLegajoContenedor').val('');
        $('#txtNombreContenedor').val('');
        $('#txtMateriaContenedor').val('');
        $('#txtNotaContenedor').val('');
        $('#spinner').hide();
        },
        error:function(jqXHR, textStatus, textError){ $("#MensajeError").html(("error!!" + textStatus + textError))}

        })
        
        $('#vgVentana').hide();
           
    }

function EliminarNota(indice)
{
    var objetoJSON= JSON.parse(localStorage.getItem('personas'));
    localStorage.setItem('id',JSON.stringify(objetoJSON[indice].id));
    var info = { "id" : indice};
    $.ajax({
    url: 'http://localhost:3000/eliminarNota',
    data: info,
    method: 'post',
    beforeSend: function(){
        $('#spinner').show();
    },
    dataType: 'json',
    success: function(response)
    {       
    
    if(response.type==='error')
    {
        $("#MensajeErrorAfuera").show();
        $("#MensajeError").show();
        $("#MensajeError").html("<input id='btnCerrarMensaje'  type='button' value='Cerrar' onclick='Cerrar()'>" + (JSON.stringify(response.message)));
    }

    TraerPersonas();
    $('#spinner').hide();
    },
    })
}

function TraerPersona(indice) {
    var objetoJSON= JSON.parse(localStorage.getItem('personas'));
  
    localStorage.setItem('id',JSON.stringify(objetoJSON[indice].id));
    $('#txtLegajo').val(objetoJSON[indice].legajo); 
    $('#txtNombre').val(objetoJSON[indice].nombre);
    $('#txtMateria').val(objetoJSON[indice].materia);
    $('#txtNota').val(objetoJSON[indice].nota);

    $('#vgVentana').show();
    $('#ventana').show();
    
  }

function LimpiarTabla(){

    var tCuerpo = $("#tCuerpo").html("");
                      }


    function CargarTabla(restoredPersonas){
        
            LimpiarTabla();
            var body=""; 
        
            for(i = 1; i < restoredPersonas.length; i++ ){
                
                if(restoredPersonas[i].nota < 4)
                {
                   var cadena=
                    "<tr><td style= 'color : red'>" + restoredPersonas[i].legajo + "</td>" +
                    "<td style= 'color : red'>" + restoredPersonas[i].nombre + "</td>" +
                    "<td style= 'color : red'>" + restoredPersonas[i].materia + "</td>" +
                    "<td style= 'color : red'>" + restoredPersonas[i].nota + "</td>" +
                    "<td><input id='btnModificar' class='btn btn-primary' type='button' value='Editar' onclick='TraerPersona(" + i + ");'/></td>" + 
                    "<td><input id='btnBorrar' class='btn btn-primary' type='button' value='Borrar' onclick='EliminarNota(" + i + ");'/></td></tr>"
                    body+=cadena;  
                }
        
               var cadena2=
                "<tr><td>" + restoredPersonas[i].legajo + "</td>" +
                "<td>" + restoredPersonas[i].nombre + "</td>" +
                "<td>" + restoredPersonas[i].materia + "</td>" +
                "<td>" + restoredPersonas[i].nota + "</td>" +
                "<td><input id='btnModificar' class='btn btn-primary' type='button' value='Editar' onclick='TraerPersona(" + i + ");'/></td>" +
                "<td><input id='btnBorrar' class='btn btn-primary' type='button' value='Borrar' onclick='EliminarNota(" + i + ");'/></td></tr>"
                body+=cadena2;     
            }
            $("#tCuerpo").html(body);

    }

    function CargarTablaComun(restoredPersonas){
        
            LimpiarTabla();
            $("#Lista").hide();
            var body=""; 
        
            for(i = 1; i < restoredPersonas.length; i++ ){
                
                if(restoredPersonas[i].nota < 4)
                {
                   var cadena=
                    "<tr><td style= 'color : red'>" + restoredPersonas[i].legajo + "</td>" +
                    "<td style= 'color : red'>" + restoredPersonas[i].nombre + "</td>" +
                    "<td style= 'color : red'>" + restoredPersonas[i].materia + "</td>" +
                    "<td style= 'color : red'>" + restoredPersonas[i].nota + "</td></td></tr>"
                    body+=cadena;  
                }
        
               var cadena2=
                "<tr><td>" + restoredPersonas[i].legajo + "</td>" +
                "<td>" + restoredPersonas[i].nombre + "</td>" +
                "<td>" + restoredPersonas[i].materia + "</td>" +
                "<td>" + restoredPersonas[i].nota + "</td></td></tr>"
                body+=cadena2;     
            }
            $("#tCuerpoComun").html(body);

    }

function Cerrar()
{
    $('#ventana').hide();
    $('#vgVentana').hide();
    $('#contenedor').hide();
    $('#MensajeErrorAfuera').hide();
    $('#MensajeError').hide();
    $('#spinner').hide();
    TraerPersonas();

}


$(document).ready(function()
{
     $('#btnGuardar').click(Guardar);
     $('#btnCerrar').click(Cerrar);
     $('#btnCerrarMensaje').click(Cerrar);
     $('#btnCerrarContenedor').click(Cerrar);
     $('#btnGuardarContenedor').click(Guardar);

    $('#spinner').html("<img src='spinner.gif'>");
    $('#spinner').hide();
    $('#vgVentana').hide();
    $('#ventana').hide();
    
    var usuario = localStorage.getItem('usuario');
  
    if(usuario==='Admin')  
    {
        $('#spinner').hide();
        $("#MensajeError").hide();
        $("#MensajeErrorAfuera").hide();
        TraerPersonas();
        return;
    }

    TraerPersonasComun();
    $("#MensajeError").hide();
    $("#MensajeErrorAfuera").hide();
    $("#contenedor").hide();
    $('#btnCerrarContenedor').hide();
    $("#vgVentana").hide();
    $("#ventana").hide();
   
   
})

