
var restoredPersonas;


function TraerPersonas(){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuestaTraerPersonas;
    xhr.open('GET',"http://localhost:3000/notas", true);
    spinner.hidden=false;
    xhr.send();
}
//Respuesta al TraerPersonas
function gestionarRespuestaTraerPersonas() {

    var div = document.getElementById('respuesta');

    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            //Si esta todo bien, guardo la respuesta del server
            spinner.hidden=true;
            var restoredPersonas = JSON.parse(xhr.responseText);
            localStorage.setItem('personas',JSON.stringify(restoredPersonas));
          // localStorage.setItem({'Nombre' : json.stringify(objPersonas.nombre)}, JSON.stringify(objPersonas.apellido) );
            //llamo a mi función que dibujará la tabla.
            CargarTabla(restoredPersonas);
            
        }
        else {

            div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
        }
    }
   
}

function Guardar() {
    
        //Tomo los valores del HTML
        var id= localStorage.getItem('id')
        var legajo = document.getElementById('txtLegajo').value;
        var nombre = document.getElementById('txtNombre').value;
        var materia = document.getElementById('txtMateria').value;
        var nota = document.getElementById('txtNota').value;

        var alumno = { "id": id, "legajo": legajo,
        "nombre": nombre, "materia": materia,
        "nota": nota };
    
        var indice = document.getElementById('hdIndice').value;
      
    
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = gestionarRespuestaGuardar;
            xhr.open('POST', "http://localhost:3000/editarNota", true);
            xhr.setRequestHeader("Content-type", "application/json");
            //Objeto transformando a JSON   
            spinner.hidden=false;
            xhr.send(JSON.stringify(alumno));      
           
    }

    function gestionarRespuestaGuardar()
    {
        var div = document.getElementById('respuesta');
        
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    div.innerHTML = xhr.responseText;
                    //si esta todo bien refresco la lista de personas
                    spinner.hidden=true;
                    TraerPersonas();
                    //Limpio las caja de texo y el indice
                    document.getElementById('hdLegajo').value = "";
                    document.getElementById('txtNombre').value = "";
                    document.getElementById('txtMateria').value = "";
                    document.getElementById('txtNota').value = "";
                               
                } else {
        
                    div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
                }
            } else {
                div.innerHTML = '<span>Algo esta pasando que no guarda los datos</span>';
            }
    
    }



function TraerPersona(indice) {
    var objetoJSON= JSON.parse(localStorage.getItem('personas'));
  //  IndiceGlobal= indice;
  
    localStorage.setItem('id',JSON.stringify(objetoJSON[indice].id));
    document.getElementById('txtLegajo').value =objetoJSON[indice].legajo;
    document.getElementById('txtNombre').value = objetoJSON[indice].nombre;
    document.getElementById('txtMateria').value =objetoJSON[indice].materia;
    document.getElementById('txtNota').value = objetoJSON[indice].nota;
  
  }


function LimpiarTabla(){
    var tCuerpo = document.getElementById("tCuerpo").innerHTML="";
        }


    function CargarTabla(restoredPersonas){
        
            //Primero limpio la tabla
            LimpiarTabla();
            //Luego la dibujo nuevamente
            var tCuerpo = document.getElementById("tCuerpo");      
        
            for(i = 0; i < restoredPersonas.length; i++ ){
                
                if(restoredPersonas[i].nota < 4)
                {
                    tCuerpo.innerHTML = tCuerpo.innerHTML +
                    "<td style= 'color : red'>" + restoredPersonas[i].legajo + "</td>" +
                    "<td style= 'color : red'>" + restoredPersonas[i].nombre + "</td>" +
                    "<td style= 'color : red'>" + restoredPersonas[i].materia + "</td>" +
                    "<td style= 'color : red'>" + restoredPersonas[i].nota + "</td>" +
                    "<td><input id='btnModificar' class='btn btn-primary' type='button' value='Editar' onclick='TraerPersona(" + i + ");'/></td>"
            
                }
        
                tCuerpo.innerHTML = tCuerpo.innerHTML +
                "<td>" + restoredPersonas[i].legajo + "</td>" +
                "<td>" + restoredPersonas[i].nombre + "</td>" +
                "<td>" + restoredPersonas[i].materia + "</td>" +
                "<td>" + restoredPersonas[i].nota + "</td>" +
                "<td><input id='btnModificar' class='btn btn-primary' type='button' value='Editar' onclick='TraerPersona(" + i + ");'/></td>";
                
            
        }
    }

function Cerrar()
{
    document.getElementById("contenedor").hidden=true;

}


window.onload = function()
{
     //Boton guardar
     var btnEnviar = document.getElementById("btnEnviar");
  //   Seteo un evento al btnGuardar
     btnGuardar.addEventListener('click',function(){
         Guardar();   
        })  

        btnCerrar.addEventListener('click',function(){
            Cerrar();   
           }) 

    var spinner= document.getElementById('spinner').innerHTML="<img src='spinner.gif'>";
    
    var usuario = localStorage.getItem('usuario');
  
    if(usuario=='Admin')  
    {
        document.getElementById("contenedor").hidden=false;
        TraerPersonas();
        return;
    }

    TraerPersonas();
    document.getElementById('contenedor').hidden=true;
   


    /* var btnEliminar = document.getElementById("btnEliminar");
     btnEliminar.addEventListener('click', function(){
         EliminarPersona(indice);
     })     */
    
    //Cuando carga la pagina TRAIGO TODAS LAS PERSONAS

    //var mydata = JSON.parse(data);
    //localStorage.setItem('personas', data);

    //restoredPersonas = JSON.parse(notas);
    //CargarTabla(restoredPersonas);
    //TraerPersonas();

 
    //localStorage.getItem(personas)
   // var json= JSON.parse( '{"nombre" : "matias" }' );
  //  localStorage.setItem('personas', JSON.stringify(json));
 
}

