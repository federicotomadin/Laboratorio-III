
/// <reference path="Persona.ts" />
/// <reference path="Alumno.ts" />


$(document).ready(function () {


    alert("Bienvenido al sistema");
    Controladora.CargarSelect();
    Controladora.MostrarAlumnos();
});


class Controladora {

    public static AgregarAlumno() {

        let id = this.GenerarId();
        let nombre:string = String($("#Nombre").val());
        let legajo:number = Number($("#Legajo").val());
        let materia:string = String($("#Materia").val());
        let nota:number = Number($("#Nota").val());
        let arrayAlumnos: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Alumnos"));
        let ObjetoAlumno: clases.Alumno = new clases.Alumno(id, nombre, legajo,materia,nota);
        
        if (arrayAlumnos == null) {

            console.log("agregar");
            arrayAlumnos = new Array<clases.Alumno>();
            arrayAlumnos.push(ObjetoAlumno);
            localStorage.setItem("Alumnos", JSON.stringify(arrayAlumnos));
            Controladora.LimpiarForm(); 
            Controladora.CargarSelect();
            Controladora.MostrarAlumnos();
            return;

        }
      

            //sino es NULL quiere decir que estoy modificando esa posicion de memoria.
            let index:String= String($("#indexModificar").val());
            arrayAlumnos = JSON.parse(localStorage.getItem("Alumnos"));
            if (index !== "") {
               let aux:Number=Number(index);              
           
                for (let i = 0; i < arrayAlumnos.length; i++)
                {                  
                    if(aux==i)
                    {    
                        arrayAlumnos[i].nombre= ObjetoAlumno.nombre;
                        arrayAlumnos[i].nota= ObjetoAlumno.legajo;
                        arrayAlumnos[i].materia=ObjetoAlumno.materia;
                        arrayAlumnos[i].nota=ObjetoAlumno.nota;
                    }
                }                
             
               localStorage.setItem("Alumnos", JSON.stringify(arrayAlumnos));            
               Controladora.LimpiarForm();   
               Controladora.MostrarAlumnos();
               return;

            }
            arrayAlumnos.push(ObjetoAlumno);
            localStorage.setItem("Alumnos", JSON.stringify(arrayAlumnos));            
            Controladora.LimpiarForm();   
            Controladora.MostrarAlumnos();
    }

    public static LimpiarForm() {
        $("#ID").val("");
        $("#Nombre").val("");
        $("#Legajo").val("");
        $("#Materia").val("morocho");
        $("#Nota").val("");
    }


    public static MostrarAlumnos(): void {

        let stringTabla: String;
        stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>LEGAJO</th><th>MATERIA</th><th>NOTA</th><th>ACCION</th></tr></thead>";

        let valoresTabla = " ";
        let arrayAlumnos: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Alumnos"));
  

        for (let i = 0; i < arrayAlumnos.length; i++) {
            valoresTabla += "<tr>";
            valoresTabla += "<td>" + arrayAlumnos[i].id + "</td>";
            valoresTabla += "<td>" + arrayAlumnos[i].nombre + "</td>";
            valoresTabla += "<td>" + arrayAlumnos[i].legajo + "</td>";
            valoresTabla += "<td>" + arrayAlumnos[i].materia + "</td>";
            valoresTabla += "<td>" + arrayAlumnos[i].nota + "</td>";
            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarAlumno(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarAlumno(" + i + ")'>Modificar</button>" + "</td>";
            valoresTabla += "</tr>";
        }

        $("#divTabla").html(stringTabla + valoresTabla);
    }

   

//----------------------------------PROMEDIO --------------------------------------------------//


    public static PromedioNotas() {
        let arrayAlumnos: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Alumnos"));

        let total = 0;
        var suma = arrayAlumnos.reduce(function (total, elemento) {
            return total += elemento.nota;
        }, 0);

        $("#promedio").html(String((suma / arrayAlumnos.length)))
    }


//-------------------------------------- CARGA SELECT --------------------------------------//

      public static CargarSelect() {

        for (let i = 0; i < 6; i++) {
            $("#Tipo").append(new Option(clases.Tipos[i]));
        }
    }

 //--------------------------------  FILTROS  -----------------------------------//

     public static FiltroColID(): void {
    
    
            let arrayAlumnos: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Alumnos"));
            let arrayMapAlumnos = arrayAlumnos.map(function (elemeto) {
                return (elemeto.id);
    
            });
            let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th><th>ACCION</th></tr></thead>";
            let valoresTabla = "";
            for (let i = 0; i < arrayMapAlumnos.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayAlumnos[i].id + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarAlumno(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarAlumno(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
        }
    
        public static FiltroColNombre()
        {
            
            let arrayAlumnos: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Alumnos"));
            let arrayMapAlumnos = arrayAlumnos.map(function (elemeto) {
                return (elemeto.nombre);
    
            });
            let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Nombre</th><th>ACCION</th></tr></thead>";
            let valoresTabla = "";
            for (let i = 0; i < arrayMapAlumnos.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayAlumnos[i].nombre + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
    
        }
    
        public static FiltroColLegajo()
        {
            let arrayAlumnos: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Alumnos"));
            let arrayMapAlumnos = arrayAlumnos.map(function (elemeto) {
                return (elemeto.legajo);
    
            });
            let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Legajo</th><th>ACCION</th></tr></thead>";
            let valoresTabla = "";
            for (let i = 0; i < arrayMapAlumnos.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayAlumnos[i].legajo + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
        }
    
        public static FiltroColMateria()
        {
            let arrayAlumnos: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Alumnos"));
            let arrayMapAlumnos = arrayAlumnos.map(function (elemeto) {
                return (elemeto.materia);
    
            });
            let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Materia</th><th>ACCION</th></tr></thead>";
            let valoresTabla = "";
            for (let i = 0; i < arrayMapAlumnos.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayAlumnos[i].materia + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
        }
    
        public static EliminarAlumno(index: number): void {
            let arrayAlumnos: Array<JSON> = JSON.parse(localStorage.getItem("Alumnos"));
            arrayAlumnos.splice(index, 1);
            localStorage.setItem("Alumnos", JSON.stringify(arrayAlumnos));
            Controladora.MostrarAlumnos();
    
        }
    
        public static ModificarAlumno(index: number): void {
            let arrayAlumnos: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Alumnos"));
            $("#ID").val(arrayAlumnos[index].id);
            $("#Nombre").val(arrayAlumnos[index].nombre);
            $("#Legajo").val(arrayAlumnos[index].legajo);
            $("#Materia").val(arrayAlumnos[index].materia);
            $("#Nota").val(arrayAlumnos[index].nota);
            $("#indexModificar").val(index.toString());
        }
    
    
        public static FiltrarPorNota() {
            let stringTabla: string;
            stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th>" +
            "<th>NOMBRE</th><th>LEGAJO</th><th>MATERIA</th><th>NOTA</th><th>ACCION</th></tr></thead>";

            let valoresTabla = "";
            let arrayAlumnos: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Alumnos"));
            let AlumnosFiltradas: Array<clases.Alumno> = arrayAlumnos.filter(function (elemento) {
    
                return elemento.nota == $("#Nota").val();
            })
    
            for (let i = 0; i < AlumnosFiltradas.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + AlumnosFiltradas[i].id + "</td>";
                valoresTabla += "<td>" + AlumnosFiltradas[i].nombre + "</td>";
                valoresTabla += "<td>" + AlumnosFiltradas[i].legajo + "</td>";
                valoresTabla += "<td>" + AlumnosFiltradas[i].materia + "</td>";
                valoresTabla += "<td>" + AlumnosFiltradas[i].nota + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";

                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);   
    
        }

        public static GenerarId():Number
        {
            let arrayAlumnos: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Alumnos"));
            if(arrayAlumnos==null)  return 0       
         
            var Mayor = arrayAlumnos.reduce(function(max, elemento){
                return (max>elemento.id)? max:elemento.id;               
            
            }, 0);
            return Mayor +1;
        } 

        public static FiltroNombre()
        {
            let arrayAlumnos: Array<clases.Alumno> = JSON.parse(localStorage.getItem("Alumnos"));
            let arrayMapAlumnos = arrayAlumnos.filter(function (elemento) {
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
            for (let i = 0; i < arrayMapAlumnos.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayMapAlumnos[i].id + "</td>";
                valoresTabla += "<td>" + arrayMapAlumnos[i].nombre + "</td>";
                valoresTabla += "<td>" + arrayMapAlumnos[i].legajo + "</td>";
                valoresTabla += "<td>" + arrayMapAlumnos[i].materia + "</td>";
                valoresTabla += "<td>" + arrayMapAlumnos[i].nota + "</td>";
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarAlumno(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarAlumno(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
        }
      
    

}