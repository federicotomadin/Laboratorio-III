//HTTP

var xhr;
var restoredPersonas;
var personaGlobal;



/*########################################### AGREGAR ############################################*/


//Metodo para guardar en el servidor
function GuardarServer() {

    //Tomo los valores del HTML
    var nombre = document.getElementById('txtNombre').value;
    var apellido = document.getElementById('txtApellido').value;
    var fecha = document.getElementById('txtFecha').value;
    var telefono = document.getElementById('txtTelefono').value;
   

    if(ValidarDatos(nombre,apellido))
    {
     var persona = {  "nombre": nombre, "apellido": apellido, "fecha": telefono, "telefono": fecha };




    }
}

//Traigo la lista de personas por GET para luego armar la tabla
function TraerPersonas(){
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
            var restoredPersonas = JSON.parse(xhr.responseText);

          // localStorage.setItem({'Nombre' : json.stringify(objPersonas.nombre)}, JSON.stringify(objPersonas.apellido) );
            //llamo a mi función que dibujará la tabla.
            CargarTabla(restoredPersonas);
            
        }
        else {

            div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
        }
    }
   
}

//Funcion para dibujar la tabla
function CargarTabla(restoredPersonas){
    
        //Primero limpio la tabla
        LimpiarTabla();
        //Luego la dibujo nuevamente
        var tCuerpo = document.getElementById("tCuerpo");
        var row = tCuerpo.insertRow()
    
        for(i = 0; i < restoredPersonas.length; i++ ){
    
            tCuerpo.innerHTML = tCuerpo.innerHTML +
                "<td>" + restoredPersonas[i].nombre + "</td>" +
                "<td>" + restoredPersonas[i].apellido + "</td>" +
                "<td>" + restoredPersonas[i].fecha + "</td>" +
                "<td>" + restoredPersonas[i].telefono + "</td>" +
                "<td><input id='btnModificar' class='btn btn-primary' type='button' value='Modificar' onclick='TraerPersona(" + i + ");'/>"+
                "<input id='btnEliminar' class='btn btn-danger' type='button' value='Eliminar' onclick='EliminarPersona(" + i +");'/></td>"; 
        }
    }

function EliminarPersona(indice)
{
  restoredPersonas.splice(indice,1);
  CargarTabla(restoredPersonas);
  //TraerPersonas();
  
}


//Funcion para limpiar la tabla
function LimpiarTabla(){
var tCuerpo = document.getElementById("tCuerpo").innerHTML="";
    }

function AgregarPersona()
{
   var nombre=document.getElementById("txtNombre").value;
   var apellido=document.getElementById("txtApellido").value;
   var telefono=document.getElementById("txtTelefono").value;
   var fecha=document.getElementById("txtFecha").value;

   var persona = {"nombre" : nombre, "apellido" : apellido, "fecha" : fecha, "telefono" : telefono}


    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaNuevaPersona;
  
    xhr.open('POST',"http://localhost:3000/nuevaPersona", true);
    xhr.setRequestHeader("Content-type", "application/json");
    var data = JSON.stringify(persona);
    localStorage.setItem('personas', JSON.stringify(data));
    xhr.send(data);
}

function gestionarRespuestaNuevaPersona()
{
    var div = document.getElementById('respuesta');
    
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                div.innerHTML = xhr.responseText;
                //si esta todo bien refresco la lista de personas
                            
               // localStorage.setItem('personas', JSON.stringify());
                TraerPersonas();
             
                         
            } else {
    
                div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
            }
        } else {
            div.innerHTML = '<span>Algo esta pasando que no guarda los datos</span>';
        }
}

function ValidarDatos(nombre, apellido) {

    if (nombre == '' && apellido == '') {

        document.getElementById("txtNombre").style.border = "red";
        document.getElementById("txtApellido").style.border = "red";
        return false;
    } else if (nombre == '') {
        document.getElementById("txtNombre").style.border = "red";
        return false;
    } else if (apellido == '') {
        document.getElementById("txtApellido").style.border = "red";
        return false;

    }

    return true;

    //  document.getElementById("myDiv").style.border = "thick solid #0000FF";

}

window.onload = function()
{
     //Boton guardar
     var btnEnviar = document.getElementById("btnEnviar");
     //Seteo un evento al btnGuardar
     btnEnviar.addEventListener('click',function(){
         AgregarPersona();   
        })  

    /* var btnEliminar = document.getElementById("btnEliminar");
     btnEliminar.addEventListener('click', function(){
         EliminarPersona(indice);
     })     */
    
    //Cuando carga la pagina TRAIGO TODAS LAS PERSONAS

    //var mydata = JSON.parse(data);
    localStorage.setItem('personas', data);

    restoredPersonas = JSON.parse(localStorage.getItem('personas'));
    CargarTabla(restoredPersonas);
    //TraerPersonas();

    //for(i = 0; i < restoredPersonas.length; i++ ){

    //}

    //localStorage.getItem(personas)
   // var json= JSON.parse( '{"nombre" : "matias" }' );
  //  localStorage.setItem('personas', JSON.stringify(json));
 
}




   var data = `[{"nombre":"Chiquia","apellido":"Baptist","fecha":"1979/04/07","telefono":"4923023102"},
   {"nombre":"Annissa","apellido":"Kleinlerer","fecha":"1987/11/18","telefono":"6793823280"},
   {"nombre":"Reiko","apellido":"Muat","fecha":"1972/10/26","telefono":"1725850167"},
   {"nombre":"Vernen","apellido":"MacConnel","fecha":"1983/11/16","telefono":"4497697435"},
   {"nombre":"Frederica","apellido":"Boggers","fecha":"1975/10/17","telefono":"1141857691"},
   {"nombre":"Roxy","apellido":"Edowes","fecha":"1978/01/12","telefono":"7225696366"},
   {"nombre":"Lawton","apellido":"Dawdary","fecha":"1979/06/18","telefono":"1632952145"},
   {"nombre":"Ki","apellido":"Beston","fecha":"1979/07/26","telefono":"8529878768"},
   {"nombre":"Krysta","apellido":"Alkins","fecha":"1997/12/18","telefono":"7428838803"},
   {"nombre":"Natalie","apellido":"Finnan","fecha":"1979/05/26","telefono":"5929493650"},
   {"nombre":"Lusa","apellido":"Queyeiro","fecha":"1983/05/01","telefono":"6268154754"},
   {"nombre":"Eleonore","apellido":"Ilsley","fecha":"1995/06/21","telefono":"6628991514"},
   {"nombre":"Helenka","apellido":"Walklot","fecha":"1996/09/07","telefono":"5654987397"},
   {"nombre":"Layney","apellido":"Tilbey","fecha":"1998/01/23","telefono":"7411544958"},
   {"nombre":"Naoma","apellido":"Cosins","fecha":"1975/07/27","telefono":"8277540558"},
   {"nombre":"Sonnie","apellido":"Linne","fecha":"1993/06/08","telefono":"1936140108"},
   {"nombre":"Lyn","apellido":"Durbyn","fecha":"1986/06/13","telefono":"3041483664"},
   {"nombre":"Arabel","apellido":"Doerling","fecha":"1996/11/21","telefono":"1871127152"},
   {"nombre":"Lara","apellido":"Edelheid","fecha":"1972/05/07","telefono":"7475643027"},
   {"nombre":"Vinni","apellido":"Dunderdale","fecha":"1981/05/12","telefono":"4975056077"},
   {"nombre":"Esra","apellido":"Lyddiatt","fecha":"1988/02/11","telefono":"3244899352"},
   {"nombre":"Millie","apellido":"Gilli","fecha":"1984/01/08","telefono":"9309415956"},
   {"nombre":"Ermengarde","apellido":"Munsey","fecha":"1977/01/24","telefono":"5157229552"},
   {"nombre":"Joe","apellido":"McMeekin","fecha":"1997/04/18","telefono":"7441461550"},
   {"nombre":"Hyman","apellido":"Meeland","fecha":"1984/02/03","telefono":"8342834047"},
   {"nombre":"Rheta","apellido":"Wickie","fecha":"1995/08/04","telefono":"8415132984"},
   {"nombre":"Bev","apellido":"Sheehy","fecha":"2000/02/02","telefono":"4531348771"},
   {"nombre":"Rafaellle","apellido":"Fillingham","fecha":"1974/01/19","telefono":"4467729807"},
   {"nombre":"Rafi","apellido":"Pannaman","fecha":"1996/06/20","telefono":"5188812692"},
   {"nombre":"Crysta","apellido":"Quested","fecha":"1997/08/03","telefono":"3221584406"},
   {"nombre":"Gualterio","apellido":"Pre","fecha":"1995/01/01","telefono":"5259218434"},
   {"nombre":"Ingaberg","apellido":"Rhoddie","fecha":"1999/03/05","telefono":"6736047298"},
   {"nombre":"Julissa","apellido":"Gullivan","fecha":"1983/04/22","telefono":"6075124856"},
   {"nombre":"Gretel","apellido":"Pontin","fecha":"1971/05/30","telefono":"7714909789"},
   {"nombre":"Martita","apellido":"Poxton","fecha":"1990/03/07","telefono":"2787892206"},
   {"nombre":"Paolo","apellido":"Jahnig","fecha":"1995/11/07","telefono":"8478105854"},
   {"nombre":"Tris","apellido":"Gooms","fecha":"1985/12/03","telefono":"3043327532"},
   {"nombre":"Dal","apellido":"Payle","fecha":"1986/04/30","telefono":"5571017804"},
   {"nombre":"Abner","apellido":"Liddle","fecha":"1977/01/20","telefono":"5472993489"},
   {"nombre":"Fidela","apellido":"Curman","fecha":"1997/04/28","telefono":"9473648555"},
   {"nombre":"Bink","apellido":"Luckett","fecha":"1982/07/12","telefono":"1171943956"},
   {"nombre":"Hewe","apellido":"Holdworth","fecha":"1992/09/13","telefono":"2808229002"},
   {"nombre":"Padgett","apellido":"Rubertelli","fecha":"1988/03/16","telefono":"4383001760"},
   {"nombre":"Gerrie","apellido":"Dockwray","fecha":"1990/12/03","telefono":"8794285377"},
   {"nombre":"Cristian","apellido":"Gaudon","fecha":"1989/10/22","telefono":"3603194211"},
   {"nombre":"Brooke","apellido":"Gyurkovics","fecha":"1999/06/18","telefono":"9076710328"},
   {"nombre":"Clayton","apellido":"Klagge","fecha":"1985/12/14","telefono":"5777413777"},
   {"nombre":"Laird","apellido":"McCauley","fecha":"1981/07/17","telefono":"8841425134"},
   {"nombre":"Cory","apellido":"Dunthorn","fecha":"1972/09/19","telefono":"4182392935"},
   {"nombre":"Evangelina","apellido":"Preon","fecha":"1987/09/24","telefono":"7715261955"}]`
