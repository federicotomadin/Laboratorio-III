//HTTP
var xhr;

/*########################################### AGREGAR ############################################*/

//Guarda los datos del formulario en el server
function GuardarServer(){

    //Tomo los valores del HTML
    var nombre = $('#txtNombre');
    var apellido = $('#txtApellido');

    if (ValidarDatos(nombre,apellido)){

        //Guardo en un objeto persona - para JSON
        var persona = { "nombre" : nombre , "apellido" : apellido };

        /*otra opcion*/
        //var dataObject = "nombre=" + nombre + "&apellido=" +apellido;

        $.ajax({
            beforesend: function(){},
            url: "http://localhost:3000/agregarpersona",
            type: "post",
            dataType: "html",
            data: persona,
            success:function(result)
            {
                TraerPersonas();

            },
            cache: false,
            error:function(jqXHR, textStatus, textError){ alert("error!!" + textStatus + textError)},
            contentType: false,
            processData: false         
            });
      
      /*      xhr = new XMLHttpRequest();
        xhr.onreadystatechange = gestionarRespuestaGuardarServer;
        xhr.open('POST',"http://localhost:3000/agregarpersona",true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        //Objeto transformando a JSON
        //var data = "persona=" + JSON.stringify(persona);
        
        xhr.send(data);
    }else{
        alert("Falta cargar datos.");
    }*/

    
}
//Respuesta al GuardarServer


/*########################################### MODIFICAR ############################################*/

//Guarda los datos modificados del formulario en el server
//con el indice 
/*function ModificarServer() {

    //Tomo los valores del HTML
    var nombre = document.getElementById('txtNombre').value;
    var apellido = document.getElementById('txtApellido').value;

    var indice = document.getElementById('hdIndice').value;

    if (ValidarDatos(nombre, apellido)) {
        //Guardo en un objeto persona - para JSON
        var persona = { "nombre": nombre, "apellido": apellido };

        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = gestionarRespuestaModificarServer;
        xhr.open('POST', "http://localhost:3000/modificarpersona", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //Objeto transformando a JSON
        var data = "persona=" + encodeURIComponent(JSON.stringify(persona)) + "&indice=" + encodeURIComponent(indice);
    
        xhr.send(data);
    }else{
        alert("Faltan cargar datos");
    }

}
//Respuesta al ModificarServer
/*function gestionarRespuestaModificarServer() {

    var div = document.getElementById('respuesta');

    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            div.innerHTML = xhr.responseText;
            //Como esta todo bien, llamo asinconicamente a traer todos las personas del servidor
            TraerPersonas();
            //Limpio el campos
            document.getElementById('hdIndice').value = "";
            document.getElementById('txtNombre').value = "";
            document.getElementById('txtApellido').value = "";
            //Vuelvo los botones como estaban
            //Regla de botones
            document.getElementById("btnGuardar").style.display = "block";
            document.getElementById("btnModificar").style.display = "none";
        }
        else {

            div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
        }
    }
    else {

        div.innerHTML = '<span>Algo pasa que sale por aca</span>';
    }

}

/*################################## ARMAR TABLA ############################################*/

//Traigo la lista de personas por GET para luego armar la tabla
function TraerPersonas(){
    //Voy por GET a buscar a las personas
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaTraerPersonas;
    xhr.open('GET','http://localhost:3000/traerpersonas', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send();
}
//Respuesta al TraerPersonas
function gestionarRespuestaTraerPersonas() {

    var div = document.getElementById('respuesta');

    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            //Si esta todo bien, guardo la respuesta del server
            var objPersonas = JSON.parse(xhr.responseText);
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

        tCuerpo.innerHTML =   tCuerpo.innerHTML +
            "<tr><td>" + objPersonas[i].nombre + "</td><td>" + objPersonas[i].apellido + "</td><td><input id='btnModificar'  type='button' value='Modificar' onclick='TraerPersona(" + i + ")'>" + "</td><td><input id='btnEliminar'  type='button' value='Eliminar' onclick='EliminarPersona(" + i + ")'></td></tr>"; 
    }
}

function LimpiarTabla(){
    var tCuerpo = document.getElementById("tCuerpo");
    tCuerpo.innerHTML = "";
}

/*############################### ELIMINAR ################################################*/

/*function EliminarPersona(indice){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaEliminarServer;
    xhr.open('POST', "http://localhost:3000/eliminarpersona", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "indice=" + JSON.stringify(indice);
    xhr.send(data);
}

function gestionarRespuestaEliminarServer(){

    var div = document.getElementById('Respuesta');
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            div.innerHTML = xhr.responseText;
            //Llamo asincronicamente a traer todos las personas del servidor
            TraerPersonas();
        }
        else {

            div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
        }
    }
}

/*############################### MODIFICAR acción desde la tabla ################################################*/

//Busco la persona en el server por su indice
function TraerPersona(indice) {
    //Guardo el indice en un campo hidden  
    document.getElementById('hdIndice').value = indice;
    //Voy por GET a buscar a la persona
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaTraerPersona;
    xhr.open('GET', 'traerpersona?indice='+indice, true);
    xhr.send();
}

//Respuesta cuando trae ala persona
//Coloco los valores del obj en los campos
//Reglas de botones
function gestionarRespuestaTraerPersona(){

    var div = document.getElementById('respuesta');

    if (xhr.readyState == 4) {
        if (xhr.status == 200) {

            var persona = JSON.parse(xhr.responseText);
           
            //coloco el valor del objeto en los campos de HTML
            document.getElementById('txtNombre').value = persona.nombre;
            document.getElementById('txtApellido').value = persona.apellido;

            //Regla de botones
            document.getElementById("btnGuardar").style.display = "none";
            document.getElementById("btnModificar").style.display = "block";
        }
        else {

            div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
        }
    }
}


/*############################## ONLOAD #####################################################*/
window.onload = function()
{
    //Boton guardar
    var btnGuardar = document.getElementById("btnGuardar");
    //Seteo un evento al btnGuardar
    btnGuardar.addEventListener('click',function(){
        GuardarServer();        
    })

    //Boton modificar
    var btnModificar = document.getElementById("btnModificar");
    //Seteo un evento al btnModificar
    btnModificar.addEventListener('click', function () {
        ModificarServer();
    })

    //Cuando carga la pagina TRAIGO TODAS LAS PERSONAS
    TraerPersonas();
    
}
/***************************************Validador******************************************* */

function ValidarDatos(nombre,apellido)
{
if(nombre=='' && apellido=='')
    {
        document.getElementById('txtNombre').style.borderColor="red";
        document.getElementById('txtApellido').style.borderColor="red";
        return false;
    } else if(nombre=='')
    {
        document.getElementById('txtNombre').style.borderColor="red";
        return false;
    } else if(apellido=='')
    {
        document.getElementById('txtApellido').style.borderColor="red";
        return false;
    }
 
        return true;
}
