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
     ModoficarPersona(index);
    });
  }
  else 
  {
      AgregarPersona();
  }

}

function AgregarPesona()
{
    var nombre=$('#nombreStr').val();
    var apellido=$('#apellidoStr').val();

    if(validarDatos(nombre,apellido))
    {
        info="nombre=" + encodeURIComponent(nombre) + "&apellido=" + encodeURIComponent(apellido);

        $.ajax({
         url:"http://localhost3000/agregarpersona",
         data: info,
        method: 'post',
        dataType: 'json'
        })
        CargarLista();
    }

}
function CargarLista()
{
    personas=[];
    var body="";

    $.ajax({
    url: 'http://localhost3000/TraerPersonas',
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
            "</td><td><input type= 'button' onclick='borrarJquery(" + i + ")' id='btnBorrar' value='Borrar'></td><td><input type='button' onclick='ModificarQuery("+i+")' id='btnAgregar' value='Modificar'></tr>"
            body+=cadena;
        }
        $('#contenido').html(body);
    }
    })
}

function BorrarJquery(index)
{
  info="indice=" + encodeURIComponent(index);

  $.ajax({
   url: 'http://localhost3000/borrarpersona',
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