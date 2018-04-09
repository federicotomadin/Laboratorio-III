alert ("hola");


function saludar(){
 
    alert("Hola desde la funcion");

}


function sumar()
{

    var a = parseInt(document.getElementById("caja1").value);
    var b = parseInt(document.getElementById("caja2").value);
    var resultado= document.getElementById("resultado").value=a+b;

   }

function sumarYGuardar()
{
    var a = parseInt(document.getElementById("caja1").value);
    var b = parseInt(document.getElementById("caja2").value);
    var resultado= document.getElementById("resultado").value=a+b;

    var cuerpo = document.getElementById("tabla");
         
      cuerpo.innerHTML = cuerpo.innerHTML +  "<tr><td>" + a  + "</td>" + 
                                            "<td>" + b  + "</td>" +
                                            "<td>" + resultado  + "</td></tr>" + "<button >  </button>" ;
        
      }