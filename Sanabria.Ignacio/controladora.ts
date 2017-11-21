///<reference path="persona.ts" />
///<reference path="empleado.ts" />

class Controladora
{
    public static AgregarEmpleado() : void{
        let nombre : string = (<HTMLInputElement>document.getElementById("nombre")).value;
        let apellido : string = (<HTMLInputElement>document.getElementById("apellido")).value;
        let horario : string = (<HTMLInputElement>document.getElementById("horario")).value;
        let edad : number = Number((<HTMLInputElement>document.getElementById("edad")).value);
        let legajo : number = Number((<HTMLInputElement>document.getElementById("legajo")).value);
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
             let index:string = (<HTMLInputElement>document.getElementById("indexModificar")).value;
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
    }

    public static LimpiarForm() : void{
            (<HTMLInputElement>document.getElementById("nombre")).value = "";
            (<HTMLInputElement>document.getElementById("apellido")).value = "";
            (<HTMLInputElement>document.getElementById("edad")).value = "";
            (<HTMLInputElement>document.getElementById("horario")).value = "Mañana";
            (<HTMLInputElement>document.getElementById("legajo")).value = "";
            (<HTMLInputElement>document.getElementById("indexModificar")).value = "";
    }

    public static MostrarEmpleados() : void{
         let stringTabla : string;
         stringTabla = "<table class='table'><thead><tr><th>NOMBRE</th>"+
         "<th>APELLIDO</th><th>EDAD</th><th>LEGAJO</th><th>HORARIO</th><th>ACCION</th></tr>";
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
             valoresTabla += "<td>"+"<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado("+i+")'>Eliminar</button><br><button class='btn btn-success' onclick='Controladora.ModificarEmpleado("+i+")'>Modificar</button>"+"</td>";
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
         (<HTMLInputElement>document.getElementById("nombre")).value = arrayEmpleados[index].nombre;
         (<HTMLInputElement>document.getElementById("apellido")).value = arrayEmpleados[index].apellido;
         (<HTMLInputElement>document.getElementById("edad")).value = arrayEmpleados[index].edad;
         (<HTMLInputElement>document.getElementById("horario")).value = arrayEmpleados[index].horario;
         (<HTMLInputElement>document.getElementById("legajo")).value = arrayEmpleados[index].legajo;
         (<HTMLInputElement>document.getElementById("indexModificar")).value = index.toString();
    }

    public static FiltrarPorHorario() : void{
        let filtro : string;
        filtro =  (<HTMLInputElement>document.getElementById("horario")).value;
        let stringTabla : string;
         stringTabla = "<table class='table'><thead><tr><th>NOMBRE</th>"+
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
         document.getElementById("divTabla").innerHTML = stringTabla + valoresTabla;
    }


    public static PromedioEdadPorHorario() : void{
        let filtro : string;
        filtro =  (<HTMLInputElement>document.getElementById("horario")).value;
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
         document.getElementById("promedio").innerHTML = stringPromedio;
    }



}