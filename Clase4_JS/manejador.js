//HTTP

var xhr;
var PersonasGlobal;
var IndiceGlobal;

/*########################################### AGREGAR ############################################*/

//Metodo para guardar en el servidor
function GuardarServer() {

    //Tomo los valores del HTML
    var nombre = document.getElementById('txtNombre').value;
    var apellido = document.getElementById('txtApellido').value;

    if (ValidarDatos(nombre, apellido)) {

        //Guardo en un objeto persona - para JSON
        var persona = {  "nombre": nombre, "apellido": apellido };

        /*otra opcion*/
        var data = "nombre=" + encodeURIComponent(nombre) + "&apellido=" + encodeURIComponent(apellido);


        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = gestionarRespuestaGuardarServer;
        xhr.open('POST', "http://localhost:3000/agregarpersona", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //Objeto transformando a JSON
       // var data = "personas=" + JSON.stringify(persona);
        xhr.send(data);
    } 

}

//Verifico que se haya guardado en el server

function gestionarRespuestaGuardarServer() {

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

/*########################################### MODIFICAR ############################################*/

//Guarda los datos modificados del formulario en el server
//con el indice 
function ModificarServer() {
    
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
            var data = "persona=" + encodeURIComponent(JSON.stringify(persona)) + "&indice=" + encodeURIComponent(IndiceGlobal);
            xhr.send(data);
        }else{
            alert("Faltan cargar datos");
        }
    
    }

//respuesta al modificar server
function gestionarRespuestaModificarServer()
{
    var div = document.getElementById('respuesta');
    
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                div.innerHTML = xhr.responseText;
                //si esta todo bien refresco la lista de personas
                TraerPersonas();
                //Limpio las caja de texo y el indice
                document.getElementById('hdIndice').value = "";
                document.getElementById('txtNombre').value = "";
                document.getElementById('txtApellido').value = "";
                //Vuelvo los botones como estaban
                //Regla de botones
              
                document.getElementById("btnIngresar").style.display = "block";
                //document.getElementById("btnIngresar").style.align= "center";
               
                document.getElementById("btnModificar").style.display = "none";
            } else {
    
                div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
            }
        } else {
            div.innerHTML = '<span>Algo esta pasando que no guarda los datos</span>';
        }

}


/*################################## ARMAR TABLA ############################################*/

//Traigo la lista de personas por GET para luego armar la tabla
function TraerPersonas(){
    //Voy por GET a buscar a las personas
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaTraerPersonas;
    xhr.open('GET',"http://localhost:3000/traerpersonas", true);
    xhr.send();
}
//Respuesta al TraerPersonas
function gestionarRespuestaTraerPersonas() {

    var div = document.getElementById('respuesta');

    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            //Si esta todo bien, guardo la respuesta del server
            var PersonasGlobal = JSON.parse(xhr.responseText);
            localStorage.setItem('personas',JSON.stringify(PersonasGlobal));
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
    
            tCuerpo.innerHTML = tCuerpo.innerHTML +
                "<td>" + objPersonas[i].nombre + "</td>" +
                "<td>" + objPersonas[i].apellido + "</td>" +
                "<td style= 'text-align:center; width: 25%;'><input id='btnModificar' class='botones' type='button' value='Modificar' onclick='TraerPersona(" + i + ");'/>"+
                "<input id='btnEliminar' class='botones' type='button' value='Eliminar' onclick='EliminarPersona(" + i +");'/></td>"; 
        }
    }
    
    //Funcio para limpiar la tabla
    function LimpiarTabla(){
        var tCuerpo = document.getElementById("tCuerpo").innerHTML="";
            }


    /*############################### ELIMINAR ################################################*/

function EliminarPersona(indice){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaEliminarServer;
    xhr.open('POST', "http://localhost:3000/eliminarpersona", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "indice=" + JSON.stringify(indice);
    xhr.send(data);
}

function gestionarRespuestaEliminarServer(){

    var div = document.getElementById('respuesta');
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
  var objetoJSON= JSON.parse(localStorage.getItem('personas'));
  IndiceGlobal= indice;

  document.getElementById('txtNombre').value =objetoJSON[indice].nombre;
  document.getElementById('txtApellido').value = objetoJSON[indice].apellido;

  document.getElementById("btnIngresar").style.display = "none";
  document.getElementById("btnModificar").style.display = "block";

}

//Respuesta cuando trae ala persona
//Coloco los valores del obj en los campos
//Reglas de botones
/*function gestionarRespuestaTraerPersona(){

    var div = document.getElementById('respuesta');
  
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            alert(xhr.responseText);
            var persona = JSON.parse(xhr.responseText);
            alert(persona);
           
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
}*/


/*############################## ONLOAD #####################################################*/
window.onload = function()
{
    //Boton guardar
    var btnGuardar = document.getElementById("btnIngresar");
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


/*######################################## VALIDACION ###################################################*/
function ValidarDatos(nombre, apellido) {

    if (nombre == '' && apellido == '') {

        document.getElementById("txtNombre").style.borderColor = 'red';
        document.getElementById("txtApellido").style.borderColor = 'red';
        alert("falta cargar el apellido y nombre");
        return false;
    } else if (nombre == '') {
        document.getElementById("txtNombre").style.borderColor= "red";
        alert("falta cargar el nombre");
        return false;
    } else if (apellido == '') {
        document.getElementById("txtApellido").style.borderColor = 'red';
        alert("falta cargar el apellido");
        return false;

    }

    return true;

    //  document.getElementById("myDiv").style.border = "thick solid #0000FF";

}


 /*//var objJSON = { "nombre": txtNombre, "apellido=":txtApellido};
    var obj = 'nombre=' + encodeURIComponent(txtNombre) + '&apellido=' + encodeURIComponent(txtApellido);
    //datos=JSON.stringify("nombre " + txtNombre + "Edad" + txtApellido);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuesta;
    xhr.open('POST', 'http://localhost:3000/agregarpersona', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xhr.send(JSON.stringify(objJSON));
    xhr.send(obj);


function gestionarRespuesta() {
    if (xhr.readyState == 4) //4 quiere decir que lo puedo enviar y lo recibio
    {
        if (xhr.status == 200) {
            alert('Envio exitoso');
            traerTodos();
        } else {
            div.innerHTML = "ERROR";
        }
    }
}

function traerTodos() {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRecepcion;
    xhr.open('GET', 'http://localhost:3000/traerpersonas' + true);
    xhr.send();
}

function gestionarRecepcion() {
    if (xhr.readyState == 4) //4 quiere decir que lo puedo enviar y lo recibio
    {
        if (xhr.status == 200) {
            alert('Recepcion Exitosa');

        } else {
            div.innerHTML = "Error en la recepcion";
        }
    }
}*/