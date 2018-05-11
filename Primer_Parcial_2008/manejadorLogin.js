


function ValidarUsuario() {

    //Tomo los valores del HTML
    var email = document.getElementById('txtEmail').value;
    var contrasenia = document.getElementById('txtContrasenia').value;

   
      
        var persona = {  "usr": email, "pass": contrasenia };

        /*otra opcion*/
        //var data = "nombre=" + encodeURIComponent(nombre) + "&apellido=" + encodeURIComponent(apellido);


        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = gestionarValidarUsuario;
        xhr.open('POST', "http://localhost:3000/loginUsuario", true);
        xhr.setRequestHeader("Content-type", "application/json");

        //Objeto transformando a JSON
       // var data = "personas=" + JSON.stringify(persona);
       
        xhr.send(JSON.stringify(persona));
       
    } 

function gestionarValidarUsuario() {

    var div = document.getElementById('respuesta');

    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            div.innerHTML = xhr.responseText;
            if(xhr.responseText === 'true')
            {
                alert("entro aca");
                window.location.replace("file:///C:/Users/sam/Desktop/Laboratorio-III/Primer_Parcial_2008/index.html");
                return;
                
            }      
            alert("no entro");
          
        } else {

            div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
        }
    } else {
        div.innerHTML = '<span>Algo esta pasando que no guarda los datos</span>';
    }
}

window.onload = function()
{
    //Boton guardar
    var btnIngresar = document.getElementById("btnIngresar");
    //Seteo un evento al btnGuardar
    btnIngresar.addEventListener('click',function(){
      ValidarUsuario();      
    })

  
}

