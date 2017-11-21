///<reference path="persona.ts" />
class Empleado extends Persona
{
  public horario : string;
  public legajo : number;

  public constructor(nombre : string,apellido : string, edad : number, horario : string, legajo : number)
  {
      super(nombre,apellido,edad);
      this.horario = horario;
      this.legajo = legajo;
  }

  public empleadoToJSON() : string{
      let json = super.personaToJson()+"horario:"+this.legajo+",legajo:"+this.legajo+"}";
      return json;
  }
}