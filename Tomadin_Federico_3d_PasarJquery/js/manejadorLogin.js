
var emailGlobal;


function ValidarUsuario() {

        var persona = {  "email": $('#txtEmail').val(), "password": $('#txtContrasenia').val() };
        emailGlobal=$('#txtEmail').val();

        $.ajax({
            url: 'http://localhost:3000/login',
            method: 'post',
            dataType: 'json',
            data: persona,
            beforeSend: function()
            {
                $('#spinner').show();
            },
            success: function(response)
            {        
              if(response.type === 'error')
              {           
                  $('#spinner').hide();
                  $('#respuesta').html('Debe ingresar un email y un password valido');                  
                  $('#txtEmail').css("border-color", "red");
                  $('#txtContrasenia').css("border-color", "red");                       
                  return;               
                       
              } else if(response.type=== 'Admin' || response.type==='User')
              {                
                  localStorage.setItem('usuario',response.type );
                  localStorage.setItem('email', emailGlobal);
                  window.location.replace("index.html");
              }         

            }
        })  
    }
       
$(document).ready(function()
{
    $('#btnIngresar').click(function()
    {
        ValidarUsuario();   
    });

  $('#spinner').html("<img src='spinner.gif'>").hide();
   
})

