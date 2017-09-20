
window.addEventListener('load',function()
{
   
    var $btnLeer=document.getElementById('btnEnviar');
    
    $btnLeer.addEventListener('click',enviar)
 


});

var xhr;

function enviar()
{

var nombre=document.getElementById('txtNombre').value;
var edad=document.getElementById('txtEdad').value;

xhr= new XMLHttpRequest();
xhr.onreadystatechange=gestionarRespuesta;
xhr.open('GET','pagina1.php?nombre=' + nombre + '&edad= ' + edad ,true);
xhr.send();



//alert("Hola");
}

function gestionarRespuesta()
{
    var div=document.getElementById('mensaje');
   if(xhr.readyState==4) //4 quiere decir que lo puedo enviar y lo recibio
   {
       if(xhr.status==200)
       {
        div.innerHTML=xhr.responseText;
       }

       else {
        div.innerHTML='<img src=" img/820.gif">';
       }
   
   }

   else {
    div.innerHTML='<img src=" img/820.gif">';
   }
  /*/ else {

       div.innerHTML='<img src=" img/Preloaders.gif">';
   } */
      
   
}