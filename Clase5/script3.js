
window.addEventListener('load',function()
{
  
 var frm=document.getElementById('miFormulario');
 frm.addEventListener('submit',enviarDatos);


});

function enviarDatos(e)
{
  e.preventDefault(); //para el evento es como poner algo en el medio para ejecutar otra funcion
  enviarFormulario();
}

function enviarFormulario()
{
    div.innerHTML='<img src=" img/820.gif">';
    alert("la concha de la lora");
}