///<reference path="persona.ts" />
///<reference path="empleado.ts" />
///<reference path="controladora.ts" />

module main{
    export function agregar() : void{
       Controladora.AgregarEmpleado();
    }

    export function mostrar() : void {
        Controladora.MostrarEmpleados()
    }

    export function filtrar() : void{
        Controladora.FiltrarPorHorario();
    }

    export function promedioHorario() : void{
        Controladora.PromedioEdadPorHorario();
    }
}