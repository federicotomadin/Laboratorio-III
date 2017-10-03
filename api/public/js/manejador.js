//HTTP

xhr = new XMLHttpRequest();

/*########################################### VALIDAR USUARIO ############################################*/

//Metodo para guardar en el servidor
function enviar() {

    //Tomo los valores del HTML
    var email = document.getElementById('usrStr').value;
    var clave = document.getElementById('passStr').value;

    if (ValidarDatos(email, clave)) {

        //Guardo en un objeto persona - para JSON
        // var datosLogin= { "email": email, "clave": clave };

        /*otra opcion*/
        var datos = 'usr=' + encodeURIComponent(email) + '&pass=' + encodeURIComponent(clave);
        xhr.responseType = 'text';
        xhr.onreadystatechange = traerNoticias;
        xhr.open('POST', 'http://localhost:3000/loginUsuario', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(datos);
        //Objeto transformando a JSON
        //var data =  JSON.stringify(datosLogin);



    } else {
        alert("Falta cargar datos.");
    }

}

function traerNoticias() {



    if (xhr.readyState == 4 && xhr.status == 200) {

        respuesta = JSON.parse(xhr.responseText);
        if (respuesta == false) {
            alert("Usuario inválido!");
        }
        else {

            req = new XMLHttpRequest();
            req.responseType = 'text';
            req.onreadystatechange = imprimirNoticias;
            req.open('GET', 'http://localhost:3000/noticias', true);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.send();
        }
    }
}


function mandarNoticia() {

    varTema = document.getElementById("tema").value;
    varTitulo = document.getElementById("titulo").value;
    varNoticia = document.getElementById("noticia").value;
    varEmail = "darioesteban21@hotmail.com"

    xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = cerrarPopUp;
    xhr1.open('POST', 'http://localhost:3000/nuevaNoticia', true);
    xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var datos = 'tema=' + varTema + '&titulo=' + varTitulo + '&noticia=' + varNoticia + '&email=' + varEmail;
    xhr1.send(datos);

}



function nuevaNoticia() {

    popup.style.display = "block";

}


function imprimirNoticias() {

    tcontentido = document.getElementById("contenido");
    body = "";

    if (req.readyState == 4 && req.status == 200) {
        respuesta = JSON.parse(req.responseText);
        respuesta.forEach(function (element) {
            var noticia = '<br><h4>' + element.tema + '</h4><br><h3>' + element.titulo + '</h3><br><p>' + element.noticia + '<br><br>' + element.fecha + '</p><br><br>';
            body += noticia;

        }, this);

        tcontentido.innerHTML = body;
        ventana.style.display = "block";
    }

}

function cerrarPopUp() {

    req = new XMLHttpRequest();
    req.responseType = 'text';
    req.onreadystatechange = imprimirNoticias;
    req.open('GET', 'http://localhost:3000/noticias', true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send()
    popup.style.display = "none";
}







/*############################## ONLOAD #####################################################*/

addEventListener('load', () => {

    btnLeer = document.getElementById("btnLogin");
    btnLeer.addEventListener('click', enviar);

    btnMostrarNoticias = document.getElementById("btnNoticia");
    btnMostrarNoticias.addEventListener('click', mandarNoticia);

    btnNoticia = document.getElementById('btnNuevaNoticia');
    btnNoticia.addEventListener('click', nuevaNoticia);


    btnSalir = document.getElementById("btnSalir");
    btnSalir.addEventListener('click', cerrarPopUp);

});


function ValidarDatos(email, clave) {
    if (email == '' && clave == '') {

        document.getElementById("usrStr").style.borderColor = "red";
        document.getElementById("passStr").style.borderColor = "red";
        return false;
    } else if (email == '') {
        document.getElementById("usrStr").style.borderColor = "red";
        return false;
    } else if (clave == '') {
        document.getElementById("passSTr").style.borderColor = "red";
        return false;

    }

    return true;

    //  document.getElementById("myDiv").style.border = "thick solid #0000FF";

}