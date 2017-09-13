
window.onload=function()
{

var btnIngresar=document.getElementById("btnIngresar");
btnIngresar.addEventListener('click',function()
{
var txtNombre=document.getElementById("Nombre").value;
var txtApellido=document.getElementById("Apellido").value;

if(txtNombre=="" || txtApellido=="")
    {
        document.getElementById("Nombre").innerHTML="concha";
        alert("No pueden haber campos vacios");
    }


if(txtNombre=="Federico" && txtApellido=="Tomadin")
{
    alert("Los parametros son iguales");
}

document.getElementById('<td>' + txtNombre + '</td>').innerHTML;

})



}