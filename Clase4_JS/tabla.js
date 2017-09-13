
window.onload=function()
{

var btnIngresar=document.getElementById("btnIngresar");
btnIngresar.addEventListener('click',function()
{
var txNombre=document.getElementById("Nombre").value;
var txtApellido=document.getElementById("Apellido").value;
confirm("presione un boton");


if(txtNombre=="Federico" && txtApellido=="Tomadin")
{
    alert("Son iguales los parameros");
}

})

tCuerpo.innerHTML=Cuerpo.innerHTML + 
"<td>" + nombre + "</td>"
"<td>" + apellido + "</td>"

}