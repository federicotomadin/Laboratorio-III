()=>{}   //funciones anonimas


function miFuncion(a,b)
{
var resultado=a+b;
if(a==0)
{
    var resultado="no sumo ceros";
}
return resultado;

}

miFuncion(0,2);

//--------------------------------------

(function()
{
    alert ("la concha de tu madre");
}) ();

//--------------------------------------

/* var contador=0;
function cuento()
{
    contador++;
} */

var Inc=(function()
{
    var contador=0;
    return function() 
    {
        return contador++;}
})();

Inc();
Inc();


function Suma(a,b,callback)
{
    var resultado=parseInt(a)+parseInt(b);
    if(typeof(callback)==="function"){
    callback(resultado);
    }
}


window.onload=function()
{
var btnSumar=document.getElementById("btnSumar");
btnSumar.addEventListener('click',function()
{
var a=document.getElementById("lbl").value;
var b=document.getElementById("lbl2").value;

     Suma(a,b,function(res)
     {
         alert("La suma es  " + res);
     })    
 
})
}


var Auto=function(nafta)
{
    var _nafta=nafta;
    this.setNafta= function(value)
    {
        _nafta=value;
    }

    this.getNafta=function()
    {
       return _nafta;
    }

}

var Auto1=new Auto(100);
alert("La nafta es " + Auto1.getNafta());

Auto2= {
 
     nafta:100,
     puertas:5,
     color:"azul"
   
}

Auto3={}

nafta=100;
getNafta=function(){}


document.getElementsByTagName('p');  //me trae todos los parrafos
document.getElementsByClassName('aqui');  

FirstChild

innerHtml='<p> alguna cosa>'Fecha </>



