
window.onload=function()
{

var btnIngresar=document.getElementById("btnIngresar");
btnIngresar.addEventListener('click',function()
{
var txtNombre=document.getElementById("Nombre").value;
var txtApellido=document.getElementById("Apellido").value;
//confirm("Confirmo que deseo agregar un usuario");

if(txtNombre=="" || txtApellido=="")
    {
        
      alert("No esta ingresando ningun valor");
        
    }


if(txtNombre=="Federico" && txtApellido=="Tomadin")
{
    alert("Los parametros son iguales");
}


var tcuerpo = document.getElementById("tablaUsuarios");   
    tcuerpo.innerHTML = tcuerpo.innerHTML+"<td>"+txtNombre+"</td>"+"<td>"+txtApellido+"</td>"

})



}