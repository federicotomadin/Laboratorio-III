
window.onload=function()
{

var btnIngresar=document.getElementById("btnIngresar");
btnIngresar.addEventListener('click',function()
{
var txtNombre=document.getElementById("Nombre").value;
var txtApellido=document.getElementById("Apellido").value;
//confirm("Confirmo que deseo agregar un usuario");




if(txtNombre=="")
    {
        
     document.getElementById("Nombre").style.borderColor = "red";
     alert("Debe ingresar un Nombre");
   
     
    
    }

    
if(txtApellido=="")
    {
        document.getElementById("Apellido").style.borderColor = "red";
        alert("Debe ingresar un Apellido");
    }


if(txtNombre=="Federico" && txtApellido=="Tomadin")
{
    alert("Los parametros son iguales");
}


//var objJSON = { "nombre": txtNombre, "apellido=":txtApellido};
var obj ='nombre=' + encodeURIComponent(txtNombre) + '&apellido=' + encodeURIComponent(txtApellido);
//datos=JSON.stringify("nombre " + txtNombre + "Edad" + txtApellido);
xhr=new XMLHttpRequest();
xhr.onreadystatechange=gestionarRespuesta ;
xhr.open('POST','http://localhost:3000/agregarpersona',true);
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//xhr.send(JSON.stringify(objJSON));
xhr.send(obj);







var tcuerpo = document.getElementById("tablaUsuarios");   
tcuerpo.innerHTML = "";
    tcuerpo.innerHTML = tcuerpo.innerHTML+
    "<tr><td>"+txtNombre+"</td><td>"+txtApellido +
    "</td><td><button type='button' id='btnEliminar' onclick = eliminar( " + i + ")>Eliminar</button>"
    + "<button id='btnModificar' type='button'>Modificar</button>"+"</td>"+"</tr>";

    
})


function gestionarRespuesta()
{
    if(xhr.readyState==4) //4 quiere decir que lo puedo enviar y lo recibio
    {
        if(xhr.status==200)
        {
        alert('Envio exitoso');
        }
    
        else {
         div.innerHTML="Envio Exitoso";
        }
    }
}

function eliminar(index){
    alert("aca voy a borrar el indice " + index) ;
}









}

