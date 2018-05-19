
var emailGlobal;


function ValidarUsuario() {

    //Tomo los valores del HTML
    var email = document.getElementById('txtEmail').value;
    var contrasenia = document.getElementById('txtContrasenia').value;

  //   spinner.innerHTML="<img src='spinner.gif'>";
    //spinner.innerHTML="<img src='spinner.gif'>"

    
  
      
        var persona = {  "email": email, "password": contrasenia };
        emailGlobal= email;
        

        /*otra opcion*/
        //var data = "nombre=" + encodeURIComponent(nombre) + "&apellido=" + encodeURIComponent(apellido);


        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = gestionarValidarUsuario;
        xhr.open('POST', "http://localhost:3000/login", true);
        xhr.setRequestHeader("Content-type", "application/json");
        
     
       

        //Objeto transformando a JSON
       // var data = "personas=" + JSON.stringify(persona);
        spinner.innerHTML="<img src='spinner.gif'>";
        spinner.hidden=false;
        xhr.send(JSON.stringify(persona));
       
    } 

function gestionarValidarUsuario() {

    var div = document.getElementById('respuesta');
    
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {        
            var respuesta=(JSON.parse(xhr.responseText));     
            spinner.hidden=true;       
            if(respuesta.type === 'error')
            { 
                spinner.hidden=true;
                div.innerHTML="Debe ingresar un email y un password valido";
                document.getElementById("txtEmail").style.borderColor = 'red';
                document.getElementById("txtContrasenia").style.borderColor = 'red';           
                return;
             
                     
            } else if(respuesta.type === 'Admin' || respuesta.type==='User')
            {
              
                localStorage.setItem('usuario',respuesta.type );
                localStorage.setItem('email', emailGlobal);
                window.location.replace("index.html");
            }         
          
        } else {

            div.innerHTML = "Error: " + xhr.status + " " + xhr.statusText;
        }
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

    var spinner= document.getElementById('spinner');



   // var spinner= document.getElementById('spinner');
   

  
}

