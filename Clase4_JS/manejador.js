//HTTP

var xhr;

/*########################################### AGREGAR ############################################*/

//Metodo para guardar en el servidor
function GuardarServer(){
    
        //Tomo los valores del HTML
        var nombre = document.getElementById('txtNombre').value;
        var apellido = document.getElementById('txtApellido').value;

if (ValidarDatos(nombre, apellido)) {

    //Guardo en un objeto persona - para JSON
    var persona = { "nombre": nombre, "apellido": apellido };

    /*otra opcion*/
    //var data = "nombre=" + encodeURIComponent(nombre) + "&apellido=" + encodeURIComponent(apellido);

   
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = gestionarRespuestaGuardarServer;
        xhr.open('POST', "http://localhost:3000/agregarpersona", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //Objeto transformando a JSON
        var data = "persona=" + JSON.stringify(persona);

        xhr.send(data);
    } else {
        alert("Falta cargar datos.");
    }

}

//Verifico que se haya guardaro en el server

   function gestionarRespuestaGuardarServer()
   {
       var div=document.getElementById('restpuesta');

       if(xhr.readyState==4)
       {
           if(xhr.status==200)
           {
               div.innerHTML=responseText;
               //si esta todo bien refresco la lista de personas
               TraerPersonas();
           }
           else {
            
                        div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
                    }
       }
       else {
           div.innerHTML= '<span>Algo esta pasando que no guarda los datos</span>';
       }
   }




var btnIngresar = document.getElementById("btnIngresar");
btnIngresar.addEventListener('click', function () {
    var txtNombre = document.getElementById("Nombre").value;
    var txtApellido = document.getElementById("Apellido").value;
    //confirm("Confirmo que deseo agregar un usuario");





    //var objJSON = { "nombre": txtNombre, "apellido=":txtApellido};
    var obj = 'nombre=' + encodeURIComponent(txtNombre) + '&apellido=' + encodeURIComponent(txtApellido);
    //datos=JSON.stringify("nombre " + txtNombre + "Edad" + txtApellido);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = gestionarRespuesta;
    xhr.open('POST', 'http://localhost:3000/agregarpersona', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xhr.send(JSON.stringify(objJSON));
    xhr.send(obj);





    var tcuerpo = document.getElementById("tablaUsuarios");
    tcuerpo.innerHTML = "";
    tcuerpo.innerHTML = tcuerpo.innerHTML +
        "<tr><td>" + txtNombre + "</td><td>" + txtApellido +
        "</td><td><button type='button' id='btnEliminar' onclick = eliminar( " + i + ")>Eliminar</button>"
        + "<button id='btnModificar' type='button'>Modificar</button>" + "</td>" + "</tr>";


})


function gestionarRespuesta() {
    if (xhr.readyState == 4) //4 quiere decir que lo puedo enviar y lo recibio
    {
        if (xhr.status == 200) {
            alert('Envio exitoso');
            traerTodos();
        }

        else {
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

        }

        else {
            div.innerHTML = "Error en la recepcion";
        }
    }
}



function eliminar(index) {
    alert("aca voy a borrar el indice " + index);
}





/*######################################## VALIDACION ###################################################*/
function ValidarDatos(nombre, apellido) {

    if (nombre == '' || apellido == '')
        return false;
    return true;

    //  document.getElementById("myDiv").style.border = "thick solid #0000FF";

}
    






}

