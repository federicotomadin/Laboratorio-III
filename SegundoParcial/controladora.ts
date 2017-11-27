
/// <reference path="Animal.ts" />
/// <reference path="Mascota.ts" />



$(document).ready(function(){


       Controladora.MostrarMascotas();
       Controladora.CargarSelect();
     });


class Controladora
{

 public static AgregarMascota()
 {
 
     let id=Number($("#ID").val());
     let nombre=String($("#Nombre").val());
     let edad=Number($("#Edad").val());
     let tipo=String($("#Tipo").val());
     let cantidad_patas=Number($("#cantidad_patas").val());
     let MascotasStorage = localStorage.getItem("Mascotas");
     let arrayMascotas = Array<clases.Mascota>();
     let ObjetoMascota:clases.Mascota=new clases.Mascota(id,nombre,edad,cantidad_patas,tipo);     
     if(MascotasStorage == null)
     {
         arrayMascotas = new Array<clases.Mascota>();
         arrayMascotas.push(ObjetoMascota);
         localStorage.setItem("Mascotas",JSON.stringify(arrayMascotas));
     }
     else
     {
        //sino es NULL quiere decir que estoy modificando esa posicion de memoria.
         let index:string = $("#indexModificar").val();
          arrayMascotas = JSON.parse(localStorage.getItem("Mascotas"));
          if(index !== "")
        {
            let i:number = Number(index);
        //    console.log("Empleado a modificar");
          //  console.log(arrayMascotas[i]);
            arrayMascotas.splice(i,1);

        }          

        
        arrayMascotas.push(ObjetoMascota);
        localStorage.setItem("Mascotas",JSON.stringify(arrayMascotas));
        Controladora.LimpiarForm();
    }
    
    Controladora.MostrarMascotas();
}
     
public static LimpiarForm()
{
    $("#ID").val("");
    $("#Nombre").val("");
    $("#Edad").val("");
    $("#Tipo").val("perro");
    $("#CantidadPatas").val("");
}


public static MostrarMascotas()
{
    let stringTabla : string;
    stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th>"+
    "<th>NOMBRE</th><th>EDAD</th><th>CANTIDAD DE PATAS</th><th>TIPO</th><th>ACCION</th></tr></thead>";
    let valoresTabla = " ";
    if($("#chID").is(":checked"))
    {
       let arrayMapMascotas  = arrayMascotas.map(function(elemeto){
               return   (elemeto.id);

        });
     let stringTabla:string="<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th><th>ACCION</th></tr></thead>";
     let valoresTable="";
     for(let i=0;i<arrayMapMascotas.length;i++)
     {
        valoresTabla += "<tr>";
        valoresTabla += "<td>"+arrayMascotas[i].id+"</td>";
        valoresTabla += "<td>"+"<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado("+i+")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado("+i+")'>Modificar</button>"+"</td>";
        valoresTabla += "</tr>";
     }
     $("#divTabla").html(stringTabla + valoresTabla);
    }
    if($("#chNombre").is(":checked"))
    {
       let arrayMapMascotas  = arrayMascotas.map(function(elemeto){
               return   (elemeto.id);

        });
     let stringTabla:string="<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Nombre</th><th>ACCION</th></tr></thead>";
     let valoresTable="";
     for(let i=0;i<arrayMapMascotas.length;i++)
     {
        valoresTabla += "<tr>";
        valoresTabla += "<td>"+arrayMascotas[i].nombre+"</td>";
        valoresTabla += "<td>"+"<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado("+i+")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado("+i+")'>Modificar</button>"+"</td>";
        valoresTabla += "</tr>";
     }
     $("#divTabla").html(stringTabla + valoresTabla);
    }

    let arrayMascotas :Array<JSON> = JSON.parse(localStorage.getItem("Mascotas"));
    for(let i = 0;i<arrayMascotas.length;i++)
    {
        valoresTabla += "<tr>";
        valoresTabla += "<td>"+arrayMascotas[i].id+"</td>";
        valoresTabla += "<td>"+arrayMascotas[i].nombre+"</td>";
        valoresTabla += "<td>"+arrayMascotas[i].edad+"</td>";
        valoresTabla += "<td>"+arrayMascotas[i].cantidad_patas+"</td>";
        valoresTabla += "<td>"+arrayMascotas[i].tipo+"</td>";
        valoresTabla += "<td>"+"<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado("+i+")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado("+i+")'>Modificar</button>"+"</td>";
        valoresTabla += "</tr>";
    }

  
    $("#divTabla").html(stringTabla + valoresTabla);
}

public static EliminarEmpleado(index:number):void{
   let arrayMascotas: Array<clases.Mascota>=JSON.parse(localStorage.getItem("Mascotas"));
   arrayMascotas.splice(index,1);
   localStorage.setItem("Mascotas",JSON.stringify(arrayMascotas));
   Controladora.MostrarMascotas();

}

public static ModificarMascotas(index:number):void
{ 
let arrayMascotas: Array<clases.Mascota>=JSON.parse(localStorage.getItem("Mascotas"));
$("#ID").val(arrayMascotas[index].id);
$("#Nombre").val(arrayMascotas[index].nombre);
$("#Edad").val(arrayMascotas[index].edad);
$("#CantidadPatas").val(arrayMascotas[index].cantidad_patas);
$("#Tipo").val(arrayMascotas[index].tipo);

}


public static FiltrarPorTipo()
{
    let stringTabla:string="<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th>"+
    "<th>NOMBRE</th><th>EDAD</th><th>CANTIDAD DE PATAS</th><th>TIPO</th><th>ACCION</th></tr></thead>";
    let valoresTabla ="";
    let arrayMascotas: Array<clases.Mascota>=JSON.parse(localStorage.getItem("Mascotas"));
    let MascotasFiltradas:Array<clases.Mascota>=arrayMascotas.filter(function(elemento){

        return elemento.tipo==$("#Tipo").val();
    })

    for(let i = 0;i<MascotasFiltradas.length;i++)
    {
        valoresTabla += "<tr>";
        valoresTabla += "<td>"+MascotasFiltradas[i].id+"</td>";
        valoresTabla += "<td>"+MascotasFiltradas[i].nombre+"</td>";
        valoresTabla += "<td>"+MascotasFiltradas[i].edad+"</td>";
        valoresTabla += "<td>"+MascotasFiltradas[i].cantidad_patas+"</td>";
        valoresTabla += "<td>"+MascotasFiltradas[i].tipo+"</td>";
        valoresTabla += "</tr>";
    }
    $("#divTabla").html(stringTabla + valoresTabla);


}


public static PromedioPatas()
{ 
    let arrayMascotas : Array<clases.Mascota> = JSON.parse(localStorage.getItem("Mascotas"));

    let total = 0;
    var suma  = arrayMascotas.reduce(function(total,elemento){
    return total+=elemento.cantidad_patas;
    },0);

    $("#promedio").html(String((suma/arrayMascotas.length)))
}

 
 
 
 
public static CargarSelect()
 {
 

    for(let i=0;i<6;i++)
    {
     $("#Tipo").append(new Option(clases.Tipos[i]));
    }
     
 
 }

}