
interface Xmenn{
    nombre:string,
    peleasGanadas:number
}

function enviarMision(man:Xmenn){
    console.log(man.nombre);
}



let men:Xmenn = { 
     nombre:"superheroe",
     peleasGanadas:5
};
enviarMision(men);


class xmen3 implements Xmenn{
    nombre: string;
    peleasGanadas: number;
    
}

/*

Hacer ABM en LocalStorage(setItem,getItem,Clear) se guarda como string
Mostrar tabla de animales con los datos ID Nombre Edad Tipo Patas
Clase animal (abstracta)
atributo nombre
atributo edad
atributo cantidad de patas

******

Clase mascota hereda de animal
atributo id
enumerado tipo(perro, gato, reptil, roedor, ave, pez)
 ******

 Ambas entidades tienen metodo toJson, devulve string en formato Json de esa clase

****************
usar $filter $map $reduce

 Archivos separados app.ts animal.ts mascota.ts enum.ts
*/
