//HTTP

var xhr;

/*########################################### VALIDAR USUARIO ############################################*/

//Metodo para guardar en el servidor
function Login() {

    //Tomo los valores del HTML
    var email = document.getElementById('txtEmail').value;
    var clave = document.getElementById('txtClave').value;

    if (ValidarDatos(usuario, clave)) {

        //Guardo en un objeto persona - para JSON
        var datosLogin= {  "email": email, "clave": clave };

        /*otra opcion*/
        //var data = "nombre=" + encodeURIComponent(nombre) + "&apellido=" + encodeURIComponent(apellido);

        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = gestionarRespuestaLoginUsuario;
        xhr.open('POST', "http://localhost:3000/loginUsuario", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        //Objeto transformando a JSON
        var data = "usuario=" + JSON.stringify(datosLogin);

        xhr.send(data);
    } else {
        alert("Falta cargar datos.");
    }

}

function gestionarRespuestaLoginUsuario() {
    
        var div = document.getElementById('rpta');
    
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                div.innerHTML = responseText;
                //si esta todo bien refresco la lista de personas
                TraerPersonas();
            } else {
    
                div.innerHTML = "Debe ingresar un email y un password valido";
                document.getElementById("txtEmail").style.border = "red";
                document.getElementById("txtClave").style.border = "red";
            }
        } else {
            div.innerHTML = '<span>Algo esta pasando que no guarda los datos</span>';
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

function ValidarDatos(email,clave)
{
    if (usuario == '' && clave == '') {
        
                document.getElementById("txtEmail").style.border = "red";
                document.getElementById("txtClave").style.border = "red";
                return false;
            } else if (email == '') {
                document.getElementById("txtEmail").style.border = "red";
                return false;
            } else if (clave == '') {
                document.getElementById("txtClave").style.border = "red";
                return false;
        
            }
        
            return true;
        
            //  document.getElementById("myDiv").style.border = "thick solid #0000FF";
        
}