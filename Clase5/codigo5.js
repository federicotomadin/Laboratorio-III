

window.addEventListener('load',function()
{
    var $btnLeer=document.getElementById('btnLeer');
    
    $btnLeer.addEventListener('click',enviar)
    
    sleep(3);


});

datos=JSON.stringify("nombre " + nombre + "Edad" + apellido);


//window.addEventListener("Load",()=>{})


var xhr;


function enviar()
{
xhr= new XMLHttpRequest();
xhr.onreadystatechange=gestionarRespuesta;
xhr.open('GET','prueba.txt',true);
xhr.send();



//alert("Hola");
}

function gestionarRespuesta()
{
    var div=document.getElementById('contenedor');
   if(xhr.readyState==4) //4 quiere decir que lo puedo enviar y lo recibio
   {
       if(xhr.status==200)
       {
        var obj =JSON.parse(xhr.responseText);
        div.innerHTML=obj.nombre;

       // div.innerHTML=xhr.responseText;
       
      // tengo que hacer esto el parcial "npinstall" para instalar los paquetes de node.js 
      //node server
      
       }

       else {
           div.innerHTML="Error:" + xhr.status + " " + xhr.statusText;
       }
   
   }
   else {

       div.innerHTML='<img src=" img/820.gif">';
   } 
      
   
}

