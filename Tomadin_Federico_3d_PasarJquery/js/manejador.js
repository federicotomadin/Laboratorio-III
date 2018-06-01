
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

function Agregar()
{
    var id= JSON.parse(localStorage.getItem('personas')).length+1;
    localStorage.setItem('id',JSON.stringify(id));
  
  
  
    var legajo=$('#txtLegajoContenedor').val();
    var nombre= $('#txtNombreContenedor').val();
    var materia=$('#txtMateriaContenedor').val();
    var nota=$('#txtNotaContenedor').val();

    var alumno = { "id": parseInt(id), "legajo": legajo,
        "nombre": nombre, "materia": materia,
        "nota":  nota};

    localStorage.setItem('personas',JSON.stringify(alumno));

    alert(JSON.stringify(alumno));

        $('#spinner').show();
        $.ajax({
        url: 'http://localhost:3000/agregarNota',
        data: alumno,
        method: 'post',
        beforeSend: function(){
            $('#spinner').show();
        },
        dataType: 'json',
        success: function(response)
        {     
         alert("estoy dentro de Agregar");    
        TraerPersonas();
        $('#txtLegajoContenedor').val('');
        $('#txtNombreContenedor').val('');
        $('#txtMateriaContenedor').val('');
        $('#txtNotaContenedor').val('');
        $('#spinner').hide();
        }

        })
        
        $('#vgVentana').hide();
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
     

      /*  if(indice=='')
        {
            indice=arreglo.length;
            var alumno = { "id": indice+1, "legajo": legajo,
        "nombre": nombre, "materia": materia,
        "nota":  nota};
        }*/

    
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
        TraerPersonas();
        $('#txtLegajoContenedor').val('');
        $('#txtNombreContenedor').val('');
        $('#txtMateriaContenedor').val('');
        $('#txtNotaContenedor').val('');
        $('#spinner').hide();
        }

        })
        
        $('#vgVentana').hide();
           
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
    $('#ventana').hide();
    $('#vgVentana').hide();
    $('#contenedor').hide();

}


$(document).ready(function()
{
     $('#btnGuardar').click(Guardar);
     $('#btnCerrar').click(Cerrar);
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
        $('#btnCerrarContenedor').hide();
        TraerPersonas();
        return;
    }

    TraerPersonas();
    $('#btnCerrarContenedor').hide();
    $("#vgVentana").hide();
    $("#ventana").hide();
   
   
})

