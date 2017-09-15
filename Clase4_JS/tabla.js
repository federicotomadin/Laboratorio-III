
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


var tcuerpo = document.getElementById("tablaUsuarios");   
    tcuerpo.innerHTML = tcuerpo.innerHTML+"<td>"+txtNombre+"</td>"+"<td>"+txtApellido+"</td>"

})



}