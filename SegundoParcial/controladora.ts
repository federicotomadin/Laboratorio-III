
/// <reference path="Persona.ts" />
/// <reference path="Cliente.ts" />


$(document).ready(function () {
    
    Controladora.CargarSelect();
    Controladora.MostrarClientes();
});


class Controladora {

    public static AgregarCliente() {

        let id = this.GenerarId();
       
        let nombre:string = String($("#Nombre").val());
        let apellido:string = String($("#Apellido").val());
        let edad:number = Number($("#Edad").val());   
        let sexo:string = String($("#Sexo").val());             
     
        let ObjetoClientes: clases.Cliente = new clases.Cliente(id, nombre, apellido,edad,sexo);
        
         if (localStorage.getItem("Clientes") == "") 
         {  
            let arrayClientes = new Array<clases.Cliente>();
            arrayClientes.push(ObjetoClientes);
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
            Controladora.LimpiarForm(); 
            Controladora.CargarSelect();
            Controladora.MostrarClientes();
            return;

         }
          
         if (localStorage.getItem("Clientes") != "") 
         {  
            let arrayClientes: Array<clases.Cliente> = JSON.parse(localStorage.getItem("Clientes"));
            arrayClientes.push(ObjetoClientes);
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
            Controladora.LimpiarForm(); 
            Controladora.CargarSelect();
            Controladora.MostrarClientes();
            return;

         }

      //  }
      

            //sino es NULL quiere decir que estoy modificando esa posicion de memoria.
        /*   let index:String= String($("#indexModificar").val());
            arrayClientes = JSON.parse(localStorage.getItem("Clientes"));
            if (index !== "") {
               let aux:Number=Number(index);              
           
                for (let i = 0; i < arrayClientes.length; i++)
                {                  
                    if(aux==i)
                    {    
                        arrayClientes[i].nombre= ObjetoAlumno.nombre;
                        arrayClientes[i].nota= ObjetoAlumno.legajo;
                        arrayClientes[i].materia=ObjetoAlumno.materia;
                        arrayClientes[i].nota=ObjetoAlumno.nota;
                    }
                }                
             
               localStorage.setItem("Clientes", JSON.stringify(arrayClientes));            
               Controladora.LimpiarForm();   
               Controladora.MostrarClientes();
               return;

            }*/
        /*   arrayClientes.push(ObjetoClientes);
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));            
            Controladora.LimpiarForm();   
            Controladora.MostrarClientes();*/
    }

    public static LimpiarForm() {
        $("#Id").val("");
        $("#Nombre").val("");
        $("#Apellido").val("");
        $("#Edad").val("Masculino");
        $("#Sexo").val("");
    }


    public static MostrarClientes(): void {

        let stringTabla:string;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Sexo</th></tr></thead>";
        let valoresTabla:string = " ";

        if(localStorage.getItem("Clientes")==null)
        {
            localStorage.setItem("Clientes","");
        }
        else if(localStorage.getItem("Clientes")=="")
        {
            localStorage.setItem("Clientes","");
        }
        else
        {
        

        let arrayClientes: Array<clases.Cliente> = JSON.parse(localStorage.getItem("Clientes"));
  

        for (let i = 0; i < arrayClientes.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayClientes[i].id + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].apellido + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].edad + "</td>";
            valoresTabla += "<td>" + arrayClientes[i].sexo + "</td>";
            valoresTabla += "</tr>";
        }
    }

        $("#divTabla").html(stringTabla + valoresTabla);
    }

   

//----------------------------------PROMEDIO --------------------------------------------------//


    public static PromedioNotas() {
        let arrayClientes: Array<clases.Cliente> = JSON.parse(localStorage.getItem("Clientes"));

        let total = 0;
        var suma = arrayClientes.reduce(function (total, elemento) {
            return total += elemento.nota;
        }, 0);

        $("#promedio").html(String((suma / arrayClientes.length)))
    }


//-------------------------------------- CARGA SELECT --------------------------------------//

      public static CargarSelect() {

        for (let i = 0; i < 2; i++) {
            $("#Sexo").append(new Option(clases.Tipos[i]));
            $("#FiltrarSexo").append(new Option(clases.Tipos[i]));
        }
        
    }

 //--------------------------------  FILTROS  -----------------------------------//

     public static FiltroColID(): void {
    
    
            let arrayClientes: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Clientes"));
            let arrayMapClientes = arrayClientes.map(function (elemeto) {
                return (elemeto.id);
    
            });
            let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th><th>ACCION</th></tr></thead>";
            let valoresTabla = "";
            for (let i = 0; i < arrayMapClientes.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayClientes[i].id + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarAlumno(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarAlumno(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
        }
    
        public static FiltroColNombre()
        {
            
            let arrayClientes: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Clientes"));
            let arrayMapClientes = arrayClientes.map(function (elemeto) {
                return (elemeto.nombre);
    
            });
            let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Nombre</th><th>ACCION</th></tr></thead>";
            let valoresTabla = "";
            for (let i = 0; i < arrayMapClientes.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayClientes[i].nombre + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
    
        }
    
        public static FiltroColLegajo()
        {
            let arrayClientes: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Clientes"));
            let arrayMapClientes = arrayClientes.map(function (elemeto) {
                return (elemeto.legajo);
    
            });
            let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Legajo</th><th>ACCION</th></tr></thead>";
            let valoresTabla = "";
            for (let i = 0; i < arrayMapClientes.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayClientes[i].legajo + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
        }
    
        public static FiltroColMateria()
        {
            let arrayClientes: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Clientes"));
            let arrayMapClientes = arrayClientes.map(function (elemeto) {
                return (elemeto.materia);
    
            });
            let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Materia</th><th>ACCION</th></tr></thead>";
            let valoresTabla = "";
            for (let i = 0; i < arrayMapClientes.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayClientes[i].materia + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
        }
    
        public static EliminarAlumno(index: number): void {
            let arrayClientes: Array<JSON> = JSON.parse(localStorage.getItem("Clientes"));
            arrayClientes.splice(index, 1);
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
            Controladora.MostrarClientes();
    
        }
    
        public static ModificarAlumno(index: number): void {
            let arrayClientes: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Clientes"));
            $("#ID").val(arrayClientes[index].id);
            $("#Nombre").val(arrayClientes[index].nombre);
            $("#Legajo").val(arrayClientes[index].legajo);
            $("#Materia").val(arrayClientes[index].materia);
            $("#Nota").val(arrayClientes[index].nota);
            $("#indexModificar").val(index.toString());
        }
    
    
        public static FiltrarPorNota() {
            let stringTabla: string;
            stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>LEGAJO</th><th>MATERIA</th><th>NOTA</th><th>ACCION</th></tr></thead>";

            let valoresTabla = "";
            let arrayClientes: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Clientes"));
            let ClientesFiltradas: Array<clases.Alumno> = arrayClientes.filter(function (elemento) {
    
                return elemento.nota == $("#Nota").val();
            })
    
            for (let i = 0; i < ClientesFiltradas.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + ClientesFiltradas[i].id + "</td>";
                valoresTabla += "<td>" + ClientesFiltradas[i].nombre + "</td>";
                valoresTabla += "<td>" + ClientesFiltradas[i].legajo + "</td>";
                valoresTabla += "<td>" + ClientesFiltradas[i].materia + "</td>";
                valoresTabla += "<td>" + ClientesFiltradas[i].nota + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";

                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);   
    
        }

        public static GenerarId():number
        {
            let arrayClientes: Array<clases.Cliente> = JSON.parse(localStorage.getItem("Clientes"));
            if(arrayClientes==null)  return 0       
         
            var Mayor = arrayClientes.reduce(function(max, elemento){
                return (max>elemento.id)? max:elemento.id;               
            
            }, 0);
            return Mayor +1;
        } 

        public static FiltroNombre()
        {
            let arrayClientes: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Clientes"));
            let arrayMapClientes = arrayClientes.filter(function (elemento) {
                let variable:string = elemento.nombre;
              
                console.log(variable.charAt(1));
                
                for (let i = 0; i < variable.length; i++) 
                {
                    if (variable.charAt(i)==String($("#Buscar").val()) || variable==String($("#Buscar").val()))
                    return true;

                }       
               
            });
            let stringTabla: string;
            stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>LEGAJO</th><th>MATERIA</th><th>NOTA</th><th>ACCION</th></tr></thead>";

            let valoresTabla = "";
            for (let i = 0; i < arrayMapClientes.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayMapClientes[i].id + "</td>";
                valoresTabla += "<td>" + arrayMapClientes[i].nombre + "</td>";
                valoresTabla += "<td>" + arrayMapClientes[i].legajo + "</td>";
                valoresTabla += "<td>" + arrayMapClientes[i].materia + "</td>";
                valoresTabla += "<td>" + arrayMapClientes[i].nota + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarAlumno(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarAlumno(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
        }
      
    

}