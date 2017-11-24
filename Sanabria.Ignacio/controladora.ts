///<reference path="persona.ts" />
///<reference path="empleado.ts" />

$(document).ready(function(){
     /* $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#divTabla").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)*/

        Controladora.MostrarEmpleados();
      });
   /* });
  });*/




class Controladora
{
    public static AgregarEmpleado() : void{
        let nombre : string = $("#nombre").val();
        let apellido : string = $("#apellido").val();
        let horario : string = $("#horario").val();
        let edad : number = Number($("#edad").val());
        let legajo : number = Number($("#legajo").val());
        let empleadosStorage = localStorage.getItem("Empleados");
        let arrayEmpleados = Array<Empleado>();
        let empleadoNuevo = new Empleado(nombre,apellido,edad,horario,legajo);
        if(empleadosStorage == null)
        {
            arrayEmpleados = new Array<Empleado>();
            arrayEmpleados.push(empleadoNuevo);
            localStorage.setItem("Empleados",JSON.stringify(arrayEmpleados));
        }
        else
        {
             let index:string = $("#indexModificar").val();
              arrayEmpleados = JSON.parse(localStorage.getItem("Empleados"));
              if(index !== "")
            {
                let i:number = Number(index);
                console.log("Empleado a modificar");
                console.log(arrayEmpleados[i]);
                arrayEmpleados.splice(i,1);
  
                localStorage.clear();                

            }
            arrayEmpleados.push(empleadoNuevo);
            localStorage.setItem("Empleados",JSON.stringify(arrayEmpleados));
            Controladora.LimpiarForm();
        }
        Controladora.MostrarEmpleados();
    }

    public static LimpiarForm() : void{
            $("#nombre").val("");
            $("#apellido").val("");
            $("#edad").val("");
            $("#horario").val("Mañana");
            $("#legajo").val("");
            $("#indexModificar").val("");
    }

    public static MostrarEmpleados() : void{
         let stringTabla : string;
         stringTabla = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>NOMBRE</th>"+
         "<th>APELLIDO</th><th>EDAD</th><th>LEGAJO</th><th>HORARIO</th><th>ACCION</th></tr></thead>";
         let valoresTabla = " ";
         let arrayEmpleados : Array<JSON> = JSON.parse(localStorage.getItem("Empleados"));
         for(let i = 0;i<arrayEmpleados.length;i++)
         {
             valoresTabla += "<tr>";
             valoresTabla += "<td>"+arrayEmpleados[i].nombre+"</td>";
             valoresTabla += "<td>"+arrayEmpleados[i].apellido+"</td>";
             valoresTabla += "<td>"+arrayEmpleados[i].edad+"</td>";
             valoresTabla += "<td>"+arrayEmpleados[i].legajo+"</td>";
             valoresTabla += "<td>"+arrayEmpleados[i].horario+"</td>";
             valoresTabla += "<td>"+"<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado("+i+")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado("+i+")'>Modificar</button>"+"</td>";
             valoresTabla += "</tr>";
         }

         document.getElementById("divTabla").innerHTML = stringTabla + valoresTabla;

    }


    public static EliminarEmpleado(index : number) : void{
         let arrayEmpleados : Array<JSON> = JSON.parse(localStorage.getItem("Empleados"));
         arrayEmpleados.splice(index,1);
         localStorage.setItem("Empleados",JSON.stringify(arrayEmpleados));
         Controladora.MostrarEmpleados();
    }


    public static ModificarEmpleado(index : number) : void{
        let arrayEmpleados : Array<JSON> = JSON.parse(localStorage.getItem("Empleados"));
        $("#nombre").val(arrayEmpleados[index].nombre);
        $("#apellido").val(arrayEmpleados[index].apellido);
        $("#edad").val(arrayEmpleados[index].edad);
        $("#horario").val(arrayEmpleados[index].horario);
        $("#legajo").val( arrayEmpleados[index].legajo);
        $("#indexModificar").val(index.toString());
    }

    public static FiltrarPorHorario() : void{
        let filtro : string;
        filtro =  $("#horario").val();
        let stringTabla : string;
         stringTabla = "<table class='table table-bordered'><thead><tr><th>NOMBRE</th>"+
         "<th>APELLIDO</th><th>EDAD</th><th>LEGAJO</th><th>HORARIO</th></tr>";
         let valoresTabla = " ";
         let arrayEmpleados : Array<JSON> = JSON.parse(localStorage.getItem("Empleados"));
         let EmpleadosFiltrados : Array<JSON>;
         EmpleadosFiltrados = arrayEmpleados.filter(function(elemento){
               return elemento.horario == filtro;
         });

         for(let i = 0;i<EmpleadosFiltrados.length;i++)
         {
             valoresTabla += "<tr>";
             valoresTabla += "<td>"+EmpleadosFiltrados[i].nombre+"</td>";
             valoresTabla += "<td>"+EmpleadosFiltrados[i].apellido+"</td>";
             valoresTabla += "<td>"+EmpleadosFiltrados[i].edad+"</td>";
             valoresTabla += "<td>"+EmpleadosFiltrados[i].legajo+"</td>";
             valoresTabla += "<td>"+EmpleadosFiltrados[i].horario+"</td>";
             valoresTabla += "</tr>";
         }
         $("#divTabla").html(stringTabla + valoresTabla);
    }


    public static PromedioEdadPorHorario() : void{
        let filtro : string;
        filtro =  $("#horario").val();
        let arrayEmpleados : Array<JSON> = JSON.parse(localStorage.getItem("Empleados"));
         let EmpleadosFiltrados : Array<JSON>;
         EmpleadosFiltrados = arrayEmpleados.filter(function(elemento){
               return elemento.horario == filtro;
         });
        let total = 0;
         var suma  = EmpleadosFiltrados.reduce(function(total,elemento){
         return total+=elemento.edad;
         },0);
         let promedio = (suma/EmpleadosFiltrados.length);
         console.log(suma);
         console.log(promedio);
         let stringPromedio : string;
         stringPromedio = "<input type='text' value="+promedio+" />";
         $("#promedio").html(stringPromedio);
    }



}