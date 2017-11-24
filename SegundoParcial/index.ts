
/// <reference path="enum.ts" />
/// <reference path="Mascota.ts" />
/// <reference path="node_modules/jquery/dist/jquery.min.js" />



$(document).ready(function(){

alert("esta funcionando");



$("#CargarMascota").click(AgregarMascota);

CargarSelect();

});










//localStorage.setItem("Mascotas",JSON.stringify(ArrayMascotas));




function AgregarMascota()
{

    let id=Number($("#id").val());
    let nombre=String($("#nombre").val());
    let cantidad_patas=Number($("#cantidad_patas").val());
    let edad=Number($("#edad").val());
    let ObjetoMascota:clases.Mascota=new clases.Mascota(id,nombre,edad,cantidad_patas);
    
    let ArrayMascotas:clases.Mascota[]=new Array<clases.Mascota>();
    
    ArrayMascotas.push(ObjetoMascota);
    
    console.log(ArrayMascotas);

}


function CargarSelect()
{

   for(let i=0;i<6;i++)
   {
    $("#lista").append(new Option(clases.Tipos[i]));
   }
    

}