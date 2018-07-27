
/// <reference path="Persona.ts" />
/// <reference path="Empleado.ts" />



$(document).ready(function () {
      
        Controladora.CargarSelect();
        Controladora.MostrarEmpleado();     
    });

  class Controladora 
    
{

    public static AgregarEmpleado() {
        
                let legajo = Number($("#Legajo").val());
                let nombre = String($("#Nombre").val());
                let apellido = String($("#Apellido").val());
                let edad = Number($("#Edad").val());
                let horario = String($("#Horario").val());      
                let index = Number($("#indexModificar").val());    

                let ObjetoEmpleado: clases.Empleado = new clases.Empleado(legajo, nombre, apellido,edad,horario);

                if(index != 0)
                {
                    let arrayEmpleados: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleados"));
                    arrayEmpleados.splice(index, 1);
                    console.log(index);

                    arrayEmpleados.push(ObjetoEmpleado);
                    localStorage.setItem("Empleados", JSON.stringify(arrayEmpleados));
                    Controladora.LimpiarForm();           
                    Controladora.MostrarEmpleado();
                    return;
                }
            
                let EmpleadoStorage = localStorage.getItem("Empleados");
             
                    if (localStorage.getItem("Empleados") == "") 
                    {  
                       let arrayEmpleados = new Array<clases.Empleado>();
                       arrayEmpleados.push(ObjetoEmpleado);
                       localStorage.setItem("Empleados", JSON.stringify(arrayEmpleados));
                       Controladora.LimpiarForm();           
                       Controladora.MostrarEmpleado();
                       return;
           
                    }

                    if (localStorage.getItem("Empleados") != "") 
                    {  
                        let arrayEmpleados: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleados"));
                        arrayEmpleados.push(ObjetoEmpleado);
                        localStorage.setItem("Empleados", JSON.stringify(arrayEmpleados));
                        Controladora.LimpiarForm();            
                        Controladora.MostrarEmpleado();
                        return;                
                    }
              
        
                    //si no es NULL quiere decir que estoy modificando esa posicion de memoria.
                /*    let index = $("#indexModificar").val();
                    arrayEmpleado= JSON.parse(localStorage.getItem('Empleados'));
                    if (index !== "") {
                        let i: number = Number(index);
                        let aux=Number(arrayEmpleado[index].legajo);
                        let paraEnum= new Array<number>();
                        let ObjetoEmpleado: clases.Empleado = new clases.Empleado(aux, nombre, edad, tipo,foto_string);
                      
                      //  console.log("Mascota a modificar");
                        //console.log(arrayMascotas[i]);
                        arrayEmpleado.splice(i, 1);
                    arrayEmpleado.push(ObjetoEmpleado);

                  
                  

                  /*  localStorage.setItem("Empleado", JSON.stringify(arrayEmpleado2));
                    Controladora.LimpiarForm();
                    Controladora.MostrarEmpleado();
                    return;*/

                
                    //}


    
            /*    ObjetoEmpleado: clases.Empleado = new clases.Empleado(id, nombre, edad, tipo,foto_string);
                arrayIndice = new  Array<number>(); 
                arrayIndice=JSON.parse(localStorage.getItem("Indice"));               
                arrayIndice.push(6);
                localStorage.setItem("Indice",JSON.stringify(arrayIndice));
                arrayIndice=JSON.parse(localStorage.getItem("Indice"));   
                ObjetoEmpleado.legajo=arrayIndice.length;                     
                arrayEmpleado.push(ObjetoEmpleado);
                localStorage.setItem("Empleado", JSON.stringify(arrayEmpleado));
                Controladora.LimpiarForm();*/
                
         Controladora.MostrarEmpleado();
                 
            }

        public static LimpiarForm() {
            $("#Legajo").val("");
            $("#Nombre").val("");
            $("#Apellido").val("");
            $("#Edad").val("");
            $("#Horario").val("mañana");                 
        }
            
            
        public static MostrarEmpleado(): void {
            let stringTabla: string;
            stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>Legajo</th>" +
                "<th>NOMBRE</th><th>APELLIDO</th><th>EDAD</th><th>HORARIO</th><th>ACCION</th></tr></thead>";
    
            let valoresTabla = " ";
        if(localStorage.getItem("Empleados")==null)
        {
            localStorage.setItem("Empleados","");
        }
        else if(localStorage.getItem("Empleados")=="")
        {
            localStorage.setItem("Empleados","");
        }
        else
        {
    
            let arrayEmpleado: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleados"));
    
            for (let i = 0; i < arrayEmpleado.length; i++) {
                valoresTabla += "<tr>";
                valoresTabla += "<td>" + arrayEmpleado[i].legajo + "</td>";
                valoresTabla += "<td>" + arrayEmpleado[i].nombre + "</td>";
                valoresTabla += "<td>" + arrayEmpleado[i].apellido + "</td>";
                valoresTabla += "<td>" + arrayEmpleado[i].edad + "</td>";
                valoresTabla += "<td>" + arrayEmpleado[i].horario + "</td>";               
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                valoresTabla += "</tr>";
                
            }
        }
    
            $("#divTabla").html(stringTabla + valoresTabla);
        }

        public static FiltrarNombreApellido()
        {
            let arrayEmpleados: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleados"));
            let arrayMapEmpleados = arrayEmpleados.map(function (elemento) {
                return (elemento.nombre,elemento.apellido);
    
            });

            let stringTabla:string;
            stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr>" +
            "<th>NOMBRE</th><th>APELLIDO</th><th>ACCION</th></tr></thead>";
            let valoresTabla:string = " ";
            for (let i = 0; i < arrayEmpleados.length; i++) {
                valoresTabla += "<tr>";               
                valoresTabla += "<td>" + arrayEmpleados[i].nombre + "</td>";
                valoresTabla += "<td>" + arrayEmpleados[i].apellido + "</td>";   
                valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";   
                valoresTabla += "</tr>";
            }
            $("#divTabla").html(stringTabla + valoresTabla);
        }
            
               
            
            //------------------------------PROMEDIO --------------------------------------------------//
            
            
            
            public static PromedioEdadPorHorario()
            {
            let edadAcum=0;
            let horario=$("#Horario").val();
            let arrayEmpleado: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleados"));
            let arrayMapEmpleado = arrayEmpleado.filter(function (elemento) { 
                return elemento.horario==horario;
    
            }).reduce(function(previo,actual){
                edadAcum += (previo.edad + actual.edad);
               
               
            });       
            
            $("#Promedio").val(edadAcum/(arrayEmpleado.length));
    
            }
            
            
            
            //----------------------------- CARGA SELECT --------------------------------------//
            
            
            
                public static CargarSelect() {
            
            
                    for (let i = 0; i < 4; i++) {
                        $("#Horario").append(new Option(clases.Horarios[i]));
                    }
            
            
                }
            
            
            
            
            
             //--------------------------------  FILTROS  -----------------------------------//
            
        

                
                
                    public static EliminarEmpleado(index: number): void {
                        let arrayEmpleado: Array<JSON> = JSON.parse(localStorage.getItem("Empleados"));
                        arrayEmpleado.splice(index, 1);
                        localStorage.setItem("Empleados", JSON.stringify(arrayEmpleado));
                        Controladora.MostrarEmpleado();
                
                    }
                
                    public static ModificarEmpleado(index: number): void {
                        let arrayEmpleado: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleados"));

                        console.log(arrayEmpleado);
                        $("#Legajo").val(arrayEmpleado[index].legajo);
                        $("#Nombre").val(arrayEmpleado[index].nombre);
                        $("#Apellido").val(arrayEmpleado[index].apellido);       
                        $("#Edad").val(arrayEmpleado[index].edad);
                        $("#Horario").val(arrayEmpleado[index].horario);
                       // $("#foto").val(arrayEmpleado[index].foto);
                        $("#indexModificar").val(index.toString());
                    }
                
                
                    public static FiltrarPorHorario() {
                       
                        let arrayEmpleado: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleados"));
                        let EmpleadoFiltradas: Array<clases.Empleado> = arrayEmpleado.filter(function (elemento) {
     
                            return elemento.horario == $("#Horario").val();
                        
                        })
                        EmpleadoFiltradas.map(function(user){
                            return {id: user.legajo, nombre: user.nombre,apellido: user.apellido, edad: user.edad, horario: user.horario}
                      
                        })

                        let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th>" +
                        "<th>NOMBRE</th><th>APELLIDO</th><th>EDAD</th><th>HORARIO</th><th>ACCION</th></tr></thead>";
                    let valoresTabla = "";
                
                        for (let i = 0; i < EmpleadoFiltradas.length; i++) {
                            valoresTabla += "<tr>";
                            valoresTabla += "<td>" + EmpleadoFiltradas[i].legajo + "</td>";
                            valoresTabla += "<td>" + EmpleadoFiltradas[i].nombre + "</td>";
                            valoresTabla += "<td>" + EmpleadoFiltradas[i].apellido + "</td>";
                            valoresTabla += "<td>" + EmpleadoFiltradas[i].edad + "</td>";
                            valoresTabla += "<td>" + EmpleadoFiltradas[i].horario + "</td>";
                            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";                            
                            valoresTabla += "</tr>";
                        }
                        $("#divTabla").html(stringTabla + valoresTabla);
                
                
                    }
                
    }    