/**
 * Script para el documento login.html
 */
$(document).ready(function () {

    // Comprobamos que el usuario no esté logado, si lo está lo redireccionamos a la página de inicio
    if (getCookie("NAONDA-TOKEN") != '') {
        redirect("HOME");
    }

    // Aplicamos la configuración de la barra de navegación
    navConfig("LOGIN");

    // Ocultamos panel para mensajes de error
    $(".alert").hide();

    // Función para realizar el login
    function entrar() {

        // Obtenemos datos
        var user = $('#email').val();
        var pass = $('#pass').val();

        // Borramos y ocultamos posibles errores
        $("form small").html("");
        $(".alert").html("").hide();
        var error = false;

        // Si no existen errores realizamos petición logueo
        if (!error) {
            $.ajax({
                async: true,
                url: 'v1/user/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                processData: false,
                data: '{"mail":"' + user + '","pass":"' + pass + '"}',
                success: function (response) {
                    // Con logueo correcto alimentamos cookies y redireccionamos a inicio
                    setCookie("NAONDA-TOKEN", response.token, 1);
                    setCookie("NAONDA-USER", response.user, 1);
                    setCookie("NAONDA-NAME", response.user_name, 1);
                    setCookie("NAONDA-MSG", 'Bienvenid@ ' + response.user_name, 1);
                    redirect("HOME");
                },
                error: function (jqXHR, exception) {
                    // En caso de error mostramos panel con el error
                    $(".alert").html(jqXHR.responseJSON.message).fadeIn();
                }
            });
        }

    }

    // Validaciónde los campos del formulario al realizar submit
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            } else {
                event.preventDefault();
                event.stopPropagation();
                entrar();
            }
        }, false);
    });

    // Acceso directo a registro
    $('#bt-register').click(function () {
        redirect("REGISTER");
    });

});