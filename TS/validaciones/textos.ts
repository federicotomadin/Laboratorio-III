namespace textos{


  
        
        export function validarCadena(texto:string):boolean
        
        {
        
            if(texto.length > 3)
            {
                return true;
            }
            return false;
        }
        
        
        
            function validarNumero(texto:string):boolean
            
            {
            
                if(texto.length > 0)
                {
                    return true;
                }
                return false;
            }
        
            console.log(validarCadena("Juan"));
            
            
            
            }
        
        
          
        






