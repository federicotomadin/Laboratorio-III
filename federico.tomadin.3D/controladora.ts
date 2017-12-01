
/// <reference path="Persona.ts" />
/// <reference path="Empleado.ts" />



$(document).ready(function () {
    
    
        alert("Bienvenido al sistema");
        Controladora.CargarSelect();

 
        
    });

 
 var foto_string:string|null=null;
 class Controladora 
    
{

        public static AgregarEmpleado() {
            
                    let id = Number($("#ID").val());
                    let nombre = String($("#Nombre").val());
                    let edad = Number($("#Edad").val());
                    let tipo = String($("#Tipo").val());                
                    let EmpleadoStorage = localStorage.getItem("Empleado");
                    let arrayEmpleado = Array<clases.Empleado>();
                    let ObjetoEmpleado: clases.Empleado = new clases.Empleado(id, nombre, edad, tipo,foto_string);
                    if (EmpleadoStorage == null) {
            
                      //  console.log("agregar");
                        arrayEmpleado = new Array<clases.Empleado>();
                        arrayEmpleado.push(ObjetoEmpleado);
                        localStorage.setItem("Empleado", JSON.stringify(arrayEmpleado));
            
                    }
                  
            
                        //sino es NULL quiere decir que estoy modificando esa posicion de memoria.
                        let index = $("#indexModificar").val();
                        arrayEmpleado = JSON.parse(localStorage.getItem('Empleado'));
                        if (index !== "") {
                            let i: number = Number(index);
                          //  console.log("Mascota a modificar");
                            //console.log(arrayMascotas[i]);
                            arrayEmpleado.splice(i, 1);
            
                        }
            
            
                        arrayEmpleado.push(ObjetoEmpleado);
                        localStorage.setItem("Empleado", JSON.stringify(arrayEmpleado));
                        Controladora.LimpiarForm();
                    
            
                      Controladora.MostrarEmpleado();
                }


                  public static  encodeImageFileAsURL() {
                   
                    var filesSelected = document.getElementById("inputFileToLoad").files;
                    if (filesSelected.length > 0) {
                        var fileToLoad = filesSelected[0];                  
                        var fileReader = new FileReader();
                        fileReader.onload = function(fileLoadedEvent) {
                        var srcData = fileLoadedEvent.target.result;                 
                        foto_string = srcData;
                      
                        }
                        fileReader.readAsDataURL(fileToLoad);
                       
                
                    }

                   /* let file_data = $('#file').val();
                    let  FotoStorage = localStorage.getItem("foto");

                    localStorage.setItem("foto", JSON.stringify(file_data));

                    localStorage.getItem('foto');
                    let variable='<img src="file_data">';
                    
                  console.log(file_data);
                    $('#respuesta').html('<img src='+ file_data + '/>');
                    */

       
                    /*$('#file').change(function() {
                        
                                    var file = (this.files[0].name).toString();
                        
                                    $('#respuesta').empty().text(file);
                        
                                    portrait_uploader.reader.onload = function(e)
                                    {
                                        $('#respuesta').attr('src', e.target.result);
                                    }
                        
                 
                    
                })*/
            }
            
            
                public static LimpiarForm() {
                    $("#ID").val("");
                    $("#Nombre").val("");
                    $("#Edad").val("");
                    $("#Tipo").val("perro");
                    $("#foto").val("");
                }
            
            
                public static MostrarEmpleado(): void {
                    let stringTabla: string;
                    stringTabla = "<table  class='table table-bordered'><thead class='thead '><tr><th>ID</th>" +
                        "<th>NOMBRE</th><th>EDAD</th><th>TIPO</th><th>FOTO</th><th>ACCION</th></tr></thead>";
            
                    let valoresTabla = " ";
                    let arrayEmpleado: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleado"));
            

               
                    for (let i = 0; i < arrayEmpleado.length; i++) {
                        valoresTabla += "<tr>";
                        valoresTabla += "<td>" + arrayEmpleado[i].id + "</td>";
                        valoresTabla += "<td>" + arrayEmpleado[i].nombre + "</td>";
                        valoresTabla += "<td>" + arrayEmpleado[i].edad + "</td>";
                        valoresTabla += "<td>" + arrayEmpleado[i].tipo + "</td>";
                        valoresTabla += "<td>" + "<img src='"+ arrayEmpleado[i].foto + "' height='50' alt=''></td>";
                        valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                        valoresTabla += "</tr>";
                       
                    }
            
                    $("#divTabla").html(stringTabla + valoresTabla);
                }
            
               
            
            //------------------------------PROMEDIO --------------------------------------------------//
            
            
            
                public static PromedioEdad() {
                    let arrayEmpleado: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleado"));
            
                    let total = 0;
                    var suma = arrayEmpleado.reduce(function (total, elemento) {
                        return total += elemento.edad;
                    }, 0);
            
                    $("#promedio").html(String((suma / arrayEmpleado.length)))
                }
            
            
            
            //----------------------------- CARGA SELECT --------------------------------------//
            
            
            
                public static CargarSelect() {
            
            
                    for (let i = 0; i < 4; i++) {
                        $("#Tipo").append(new Option(clases.Tipos[i]));
                    }
            
            
                }
            
            
            
            
            
             //--------------------------------  FILTROS  -----------------------------------//
            
            
            
             public static FiltroColID(): void {
                
                
                        let arrayEmpleado: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleado"));
                        let arrayMapEmpleado = arrayEmpleado.map(function (elemeto) {
                            return (elemeto.id);
                
                        });
                        let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th><th>ACCION</th></tr></thead>";
                        let valoresTabla = "";
                        for (let i = 0; i < arrayMapEmpleado.length; i++) {
                            valoresTabla += "<tr>";
                            valoresTabla += "<td>" + arrayEmpleado[i].id + "</td>";
                            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                            valoresTabla += "</tr>";
                        }
                        $("#divTabla").html(stringTabla + valoresTabla);
                    }
                
                    public static FiltroColNombre()
                    {
                        
                        let arrayEmpleado: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleado"));
                        let arrayMapEmpleado = arrayEmpleado.map(function (elemeto) {
                            return (elemeto.nombre);
                
                        });
                        let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Nombre</th><th>ACCION</th></tr></thead>";
                        let valoresTabla = "";
                        for (let i = 0; i < arrayMapEmpleado.length; i++) {
                            valoresTabla += "<tr>";
                            valoresTabla += "<td>" + arrayEmpleado[i].nombre + "</td>";
                            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                            valoresTabla += "</tr>";
                        }
                        $("#divTabla").html(stringTabla + valoresTabla);
                
                    }
                
                    public static FiltroColEdad()
                    {
                        let arrayEmpleado: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleado"));
                        let arrayMapEmpleado = arrayEmpleado.map(function (elemeto) {
                            return (elemeto.edad);
                
                        });
                        let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>Edad</th><th>ACCION</th></tr></thead>";
                        let valoresTabla = "";
                        for (let i = 0; i < arrayMapEmpleado.length; i++) {
                            valoresTabla += "<tr>";
                            valoresTabla += "<td>" + arrayEmpleado[i].edad + "</td>";
                            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";
                            valoresTabla += "</tr>";
                        }
                        $("#divTabla").html(stringTabla + valoresTabla);
                    }
                
                    public static EliminarEmpleado(index: number): void {
                        let arrayEmpleado: Array<JSON> = JSON.parse(localStorage.getItem("Empleado"));
                        arrayEmpleado.splice(index, 1);
                        localStorage.setItem("Empleado", JSON.stringify(arrayEmpleado));
                        Controladora.MostrarEmpleado();
                
                    }
                
                    public static ModificarEmpleado(index: number): void {
                        let arrayEmpleado: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleado"));

                        console.log(arrayEmpleado);
                        $("#ID").val(arrayEmpleado[index].id);
                        $("#Nombre").val(arrayEmpleado[index].nombre);
                        $("#Edad").val(arrayEmpleado[index].edad);
                        $("#Tipo").val(arrayEmpleado[index].tipo);
                       // $("#foto").val(arrayEmpleado[index].foto);
                        $("#indexModificar").val(index.toString());
                    }
                
                
                    public static FiltrarPorTipo() {
                       
                        let arrayEmpleado: Array<clases.Empleado> = JSON.parse(localStorage.getItem("Empleado"));
                        let EmpleadoFiltradas: Array<clases.Empleado> = arrayEmpleado.filter(function (elemento) {

                           
                 
                            return elemento.tipo == $("#Tipo_Modal").val();
                        
                        })
                        EmpleadoFiltradas.map(function(user){
                            return {id: user.id, nombre: user.nombre, edad: user.edad, tipo: user.tipo, foto:user.foto}
                      
                        })

                        let stringTabla: string = "<table  class='table table-bordered'><thead class='thead thead-dark'><tr><th>ID</th>" +
                        "<th>NOMBRE</th><th>EDAD</th><th>TIPO</th><th>FOTO</th><th>ACCION</th></tr></thead>";
                    let valoresTabla = "";
                
                        for (let i = 0; i < EmpleadoFiltradas.length; i++) {
                            valoresTabla += "<tr>";
                            valoresTabla += "<td>" + EmpleadoFiltradas[i].id + "</td>";
                            valoresTabla += "<td>" + EmpleadoFiltradas[i].nombre + "</td>";
                            valoresTabla += "<td>" + EmpleadoFiltradas[i].edad + "</td>";
                            valoresTabla += "<td>" + EmpleadoFiltradas[i].tipo + "</td>";
                            valoresTabla += "<td>" + "<img src='"+ EmpleadoFiltradas[i].foto + "' height='50' alt=''></td>";
                            valoresTabla += "<td>" + "<button class='btn btn-danger' onclick='Controladora.EliminarEmpleado(" + i + ")'>Eliminar</button><button class='btn btn-success' onclick='Controladora.ModificarEmpleado(" + i + ")'>Modificar</button>" + "</td>";                            
                            valoresTabla += "</tr>";
                        }
                        $("#divTabla").html(stringTabla + valoresTabla);
                
                
                    }
                
    }    