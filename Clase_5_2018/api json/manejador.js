//HTTP

var xhr;


/*########################################### AGREGAR ############################################*/


window.onload = function()
{
     //Boton guardar
     var btnEnviar = document.getElementById("btnEnviar");
     //Seteo un evento al btnGuardar
     btnEnviar.addEventListener('click',function(){
         AgregarPersona();        
     })
    
    //Cuando carga la pagina TRAIGO TODAS LAS PERSONAS
    TraerPersonas();

    //localStorage.getItem(personas)
    var json= JSON.parse( '{"nombre" : "matias" }' );
    localStorage.setItem('personas', JSON.stringify(json));

 

    
}


//Traigo la lista de personas por GET para luego armar la tabla
function TraerPersonas(){
    //Voy por GET a buscar a las personas
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaTraerPersonas;
    xhr.open('GET',"http://localhost:3000/personas", true);
    xhr.send();
}
//Respuesta al TraerPersonas
function gestionarRespuestaTraerPersonas() {

    var div = document.getElementById('respuesta');

    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            //Si esta todo bien, guardo la respuesta del server
            var objPersonas = JSON.parse(xhr.responseText);

    localStorage.setItem({'Nombre' : json.stringify(objPersonas.nombre)}, JSON.stringify(objPersonas.apellido) );
            //llamo a mi función que dibujará la tabla.
            CargarTabla(objPersonas);
            
        }
        else {

            div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
        }
    }
    /*else {

        div.innerHTML = 'Algo pasa que sale por aca - LISTA';
    }*/

}


//Funcion para dibujar la tabla
function CargarTabla(objPersonas){
    
        //Primero limpio la tabla
        LimpiarTabla();
        //Luego la dibujo nuevamente
        var tCuerpo = document.getElementById("tCuerpo");
    
        for(i = 0; i < objPersonas.length; i++ ){
    
            tCuerpo.innerHTML = tCuerpo.innerHTML +
                "<td>" + objPersonas[i].nombre + "</td>" +
                "<td>" + objPersonas[i].apellido + "</td>" +
                "<td>" + objPersonas[i].fecha + "</td>" +
                "<td>" + objPersonas[i].telefono + "</td>" +
                "<td><input id='btnModificar' class='btn btn-primary' type='button' value='Modificar' onclick='TraerPersona(" + i + ");'/>"+
                "<input id='btnEliminar' class='btn btn-danger' type='button' value='Eliminar' onclick='EliminarPersona(" + i +");'/></td>"; 
        }
    }


//Funcio para limpiar la tabla
function LimpiarTabla(){
var tCuerpo = document.getElementById("tCuerpo").innerHTML="";
    }

function AgregarPersona()
{
   var nombre=document.getElementById("txtNombre").value;
   var apellido=document.getElementById("txtApellido").value;
   var telefono=document.getElementById("txtTelefono").value;
   var fecha=document.getElementById("txtFecha").value;

   var persona = {"nombre" : nombre, "apellido" : apellido, "telefono" : telefono, "fecha" : fecha}


    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaNuevaPersona;
  
    xhr.open('POST',"http://localhost:3000/nuevaPersona", true);
    xhr.setRequestHeader("Content-type", "application/json");
    

    var data = JSON.stringify(persona);
 
    xhr.send(data);
}

function gestionarRespuestaNuevaPersona()
{
    var div = document.getElementById('respuesta');
    
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                div.innerHTML = xhr.responseText;
                //si esta todo bien refresco la lista de personas
                TraerPersonas();
            } else {
    
                div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
            }
        } else {
            div.innerHTML = '<span>Algo esta pasando que no guarda los datos</span>';
        }
}