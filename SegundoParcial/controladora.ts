
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
            Controladora.MostrarClientes();
            return;

         }
          
         if (localStorage.getItem("Clientes") != "") 
         {  
            let arrayClientes: Array<clases.Cliente> = JSON.parse(localStorage.getItem("Clientes"));
            arrayClientes.push(ObjetoClientes);
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
            Controladora.LimpiarForm();            
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
        $("#Nombre").val("Matias");
        $("#Apellido").val("Ramos");
        $("#Edad").val("30");
        $("#Sexo").val("Masculino");
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
            valoresTabla += "<tr onclick='Controladora.ModificarCliente(" + i + ")'>";
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
        public static PromedioEdad()
        {
        let edadAcum=0;
        let sexo=$("#FiltrarSexo").val();
        let arrayClientes: Array<clases.Cliente> = JSON.parse(localStorage.getItem("Clientes"));
        let arrayMapClientes = arrayClientes.filter(function (elemento) { 
            return elemento.sexo==sexo;

        }).reduce(function(previo,actual){
            edadAcum += (previo.edad + actual.edad);
           
           
        });
        
        $("#Promedio").val(edadAcum/(arrayClientes.length));

        }

//-------------------------------------- CARGA SELECT --------------------------------------//

      public static CargarSelect() {

        for (let i = 0; i < 2; i++) {
            $("#Sexo").append(new Option(clases.Tipos[i]));
            $("#FiltrarSexo").append(new Option(clases.Tipos[i]));
        }
        
    }

 //--------------------------------  FILTROS  -----------------------------------//

     public static FiltroColId(): void {
    
    
            let arrayClientes: Array<clases.Cliente> = JSON.parse(localStorage.getItem("Clientes"));
            let arrayMapClientes = arrayClientes.map(function (elemento) {
                return (elemento.nombre,elemento.apellido,elemento.edad,elemento.sexo);
    
            });

            let stringTabla:string;
            stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>Nombre</th><th>Apellido</th><th>Edad</th><th>Sexo</th></tr></thead>";
            let valoresTabla:string = " ";
            for (let i = 0; i < arrayClientes.length; i++) {
                valoresTabla += "<tr>";               
                valoresTabla += "<td>" + arrayClientes[i].nombre + "</td>";
                valoresTabla += "<td>" + arrayClientes[i].apellido + "</td>";
                valoresTabla += "<td>" + arrayClientes[i].edad + "</td>";
                valoresTabla += "<td>" + arrayClientes[i].sexo + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
        }
    
        public static FiltroColNombre()
        {         
            let arrayClientes: Array<clases.Cliente> = JSON.parse(localStorage.getItem("Clientes"));
            let arrayMapClientes = arrayClientes.map(function (elemento) {
                return (elemento.id,elemento.apellido,elemento.edad,elemento.sexo);
    
            });
            let stringTabla:string;
            stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>Id</th><th>Apellido</th><th>Edad</th><th>Sexo</th></tr></thead>";
            let valoresTabla:string = " ";
            for (let i = 0; i < arrayClientes.length; i++) {
                valoresTabla += "<tr>";               
                valoresTabla += "<td>" + arrayClientes[i].id + "</td>";
                valoresTabla += "<td>" + arrayClientes[i].apellido + "</td>";
                valoresTabla += "<td>" + arrayClientes[i].edad + "</td>";
                valoresTabla += "<td>" + arrayClientes[i].sexo + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
    
        }
    
        public static FiltroColApellido()
        {
            let arrayClientes: Array<clases.Cliente> = JSON.parse(localStorage.getItem("Clientes"));
            let arrayMapClientes = arrayClientes.map(function (elemento) {
                return (elemento.id,elemento.nombre,elemento.edad,elemento.sexo);
    
            });
            let stringTabla:string;
            stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Sexo</th></tr></thead>";
            let valoresTabla:string = " ";
            for (let i = 0; i < arrayClientes.length; i++) {
                valoresTabla += "<tr>";  
                valoresTabla += "<td>" + arrayClientes[i].id + "</td>";             
                valoresTabla += "<td>" + arrayClientes[i].nombre + "</td>";              
                valoresTabla += "<td>" + arrayClientes[i].edad + "</td>";
                valoresTabla += "<td>" + arrayClientes[i].sexo + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
        }
    
        public static  FiltroColEdad()
        {
            let arrayClientes: Array<clases.Cliente> = JSON.parse(localStorage.getItem("Clientes"));
            let arrayMapClientes = arrayClientes.map(function (elemento) {
                return (elemento.id,elemento.nombre,elemento.apellido,elemento.sexo);
    
            });
            let stringTabla:string;
            stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>Id</th><th>Nombre</th><th>Apellido</th><th>Sexo</th></tr></thead>";
            let valoresTabla:string = " ";
            for (let i = 0; i < arrayClientes.length; i++) {
                valoresTabla += "<tr>";  
                valoresTabla += "<td>" + arrayClientes[i].id + "</td>";             
                valoresTabla += "<td>" + arrayClientes[i].nombre + "</td>";              
                valoresTabla += "<td>" + arrayClientes[i].apellido + "</td>";
                valoresTabla += "<td>" + arrayClientes[i].sexo + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
        }
    
        public static EliminarCliente(): void {
            let index= Number($("#indexModificar").val());
            let arrayClientes: Array<JSON> = JSON.parse(localStorage.getItem("Clientes"));
            arrayClientes.splice(index, 1);
            localStorage.setItem("Clientes", JSON.stringify(arrayClientes));
            Controladora.MostrarClientes();
            Controladora.LimpiarForm();
    
        }
    
        public static ModificarCliente(index: number): void {
            let arrayClientes: Array<clases.Cliente> = JSON.parse(localStorage.getItem("Clientes"));
            $("#Id").val(arrayClientes[index].id);
            $("#Nombre").val(arrayClientes[index].nombre);
            $("#Apellido").val(arrayClientes[index].apellido);
            $("#Edad").val(arrayClientes[index].edad);
            $("#Sexo").val(arrayClientes[index].sexo);
            $("#indexModificar").val(index.toString());
        }

        public static LimpiarLocalStorage()
        {
            localStorage.clear();
        }
    
      
        public static GenerarId():number
        {    
        if(localStorage.getItem("Clientes")=="")  return 0   
        else
        {
        let arrayClientes: Array<clases.Cliente> = JSON.parse(localStorage.getItem("Clientes"));
        }      
        
        var Mayor = arrayClientes.reduce(function(max, elemento){
            return (max>elemento.id)? max:elemento.id;               
        
        }, 0);
        return Mayor +1;
        }      
}