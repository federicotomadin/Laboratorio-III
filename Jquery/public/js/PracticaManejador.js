$(document).ready(function()
{
  CargarLista();
  $('#btnAgregar').click(ManejadorBtn);
})

function ManejadorBtn(index)
{
  var variable= $('#btnAgregar').val();

  if(variable=='Modificar')
  {
    $('#btnAgregar').click(function()
    {
     ModificarPersona(index);
    });
  }
  else 
  {
      AgregarPersona();
  }

}

function ModificarPersona(index)
{
    var varPersona=new Object();
    varPersona.nombre=$('#nombreStr').val();
    varPersona.apellido=$('#apellidoStr').val();

    info= {'indice': index,'persona': JSON.stringify(varPersona)};

    $.ajax({
     url: 'http://localhost:3000/modificarpersona',
     method: 'post',
     data: info,
     dataType: 'json'
    })
    $('#btnAgregar').attr('value','Agregar');
    $('#nombreStr').val('');
    $('#apellidoStr').val('');
    CargarLista();

}

function AgregarPersona()
{
   
    var personaJson={"nombre": $('#nombreStr').val() , "apellido":  $('#apellidoStr').val() };

    if(ValidarDatos($('#nombreStr').val(),$('#apellidoStr').val()))
    {
          
        $.ajax({
         url:"http://localhost:3000/agregarpersona",
         data: personaJson,
        method: 'post',
        dataType: 'json'
        })
        CargarLista();
    }

}

function ModificarJquery(index)
{
     $('#btnAgregar').attr('value','Modificar');
     TraerPersona(index);
     ManejadorBtn(index);
}

function CargarLista()
{
    personas=[];
    var body="";

    $.ajax({
    url: 'http://localhost:3000/TraerPersonas',
    method: 'get',
    dataType:'json',
    success: function(response)
    {
        personas=$(response);

        for(i=0;i<personas.length;i++)
        {
            if(personas[i]==null) continue;
            var cadena="<tr><td>"+ personas[i].nombre +
            "</td><td>" + personas[i].apellido + 
            "</td><td><input type= 'button' onclick='BorrarJquery(" + i + ")' id='btnBorrar' value='Borrar'></td><td><input type='button' onclick='ModificarJquery("+ i +")' id='btnAgregar' value='Modificar'></tr>"
            body+=cadena;
        }
        $('#contenido').html(body);
    }
    })
}

function TraerPersona(index)
{
    var persona="";
    $.ajax({
    url: 'http://localhost:3000/traerpersona?indice='+ index,
    method:'get',
    dataType:'json',
    success: function(response)
    {
        persona=response;
        $('#nombreStr').val(persona.nombre);
        $('#apellidoStr').val(persona.apellido);
    }
    
    })
}

function BorrarJquery(index)
{
  info="indice=" + encodeURIComponent(index);

  $.ajax({
   url: 'http://localhost:3000/eliminarpersona',
   data:info,
   method:'post',
   dataType:'json'

  })
CargarLista();
}

function ValidarDatos(nombre,apellido)
{
    if(nombre=='' && apellido=='')
    {
        $('#nombreStr').css('border-color','red');
        $('#apellidoStr').css('border-color','red');
        return false;
    }

    else if(nombre=='')
    {
        $('#nombreStr').css('border-color','red');
        return false;
    }
    else if(apellido=='')
    {
        $('#apellidoStr').css('border-color','red');
        return false;
    }
    return true;

}