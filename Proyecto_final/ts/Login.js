$(document).ready(function () {
    // Controladora.CargarSelect();
    //  Controladora.MostrarClientes();
});
var Login = /** @class */ (function () {
    function Login() {
    }
    Login.ValidarUsuario = function () {
        var usuario = $("#Usuario").val();
        var clave = $("#Clave").val();
        console.log(usuario);
        console.log(clave);
        if (usuario === "Admin" && clave == "1234") {
            window.location.replace("file:///C:/Users/sam/Desktop/Labo_3/Laboratorio-III/Proyecto_final/index.html");
        }
        else {
            $("#myModal").modal("show");
            $("#Usuario").val("");
            $("#Clave").val("");
        }
    };
    Login.GuardarContrasenia = function () {
        var clave = String($("#Clave").val());
        localStorage.setItem("Clave", clave);
        var persona = { "nombre": nombre, "apellido": apellido };
        $.ajax({
            beforesend: function () { },
            url: "http://localhost:3000/agregarpersona",
            type: "post",
            dataType: "html",
            data: persona,
            success: function (result) {
                ValidarUsuario();
            },
            cache: false,
            error: function (jqXHR, textStatus, textError) { alert("error!!" + textStatus + textError); },
            contentType: false,
            processData: false
        });
    };
    return Login;
}());
