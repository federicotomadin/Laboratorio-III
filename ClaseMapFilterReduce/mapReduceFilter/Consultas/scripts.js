//console.log(data);

/*
    realizar las operaciones usando los metodos map,  reduce y filter y combinaciones entre ellos
  */


var soluciones = {};

// Retornar un array con los nombres de los usuarios femeninos

soluciones.usuariosFemeninos = function(usuarios){
    return usuarios
    .filter(function(user){
        return user.genero === 'Female';
    })
    .map(function(user){
        return user.nombre;
    });
   
}

//console.log(soluciones.usuariosFemeninos(data));

// Retornar un array de strings (el email de los usuarios de sexo masculino)

soluciones.mailsVarones = function(usuarios){
    return usuarios.filter(function(user){
          return user.genero==='Male';

    })
    .map(function(user){
      return user.email;
   

    })
   
}

//console.log(soluciones.mailsVarones(data));

// Retornar un array de objetos que solo contengan las claves nombre, email y edad, de todos los usuarios mayores que 'edad'

soluciones.usuariosMayores = function(usuarios, edad){
    return usuarios.filter(function(user){
        return user.edad > edad

    })
    .map(function(user){
      return {usuario: user.nombre, email: user.email, edad: user.edad}
    })
    
}

//console.log(soluciones.usuariosMayores(data, 40));

  // Retornar un objeto que contenga solo el nombre y la edad del usuario mas grande.

soluciones.usuarioMasGrande = function(usuarios){

    elMayor=usuarios[0]
    usuarios.map(function(user) { return {nombre: user.nombre, edad: user.edad}
})

.reduce(function(previo,actual)
{

    if(actual.edad>=elMayor.edad)
    {
        elMayor=actual
    }
    return actual;
})
return elMayor;

}

//console.log(soluciones.usuarioMasGrande(data));

// Retornar el promedio de edad de los usuarios (number)

soluciones.promedio = function(usuarios){
  var edadAcum=usuarios[0].edad;
  var cantidad=1;

  usuarios.reduce(function(previo,actual){

   edadAcum+=actual.edad;
   cantidad+=1

   return actual;

  });

    return (edadAcum /cantidad).toFixed(2);
}

//console.log("Promedio edad usuarios " + soluciones.promedio(data));

// Retornar el promedio de edad de los usuarios hombres (number)

soluciones.promedioVarones = function(usuarios){
   usuariosVarones= usuarios.filter(function(user){
        return user.genero==='Male';
    });
    
     return soluciones.promedio(usuariosVarones);

}

//console.log("Promedio edad Varones " + soluciones.promedioVarones(data));

 // Retornar el promedio de edad de los usuarios mujeres (number)

soluciones.promedioMujeres = function(usuarios){
    usuariosMujeres= usuarios.filter(function(user){

        return user.genero==='Female';

    });

    return soluciones.promedio(usuariosMujeres);
   
}

console.log("Promedio edad Mujeres " + soluciones.promedioMujeres(data));