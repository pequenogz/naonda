/**
 * Script para el documento register.html
 */
$(document).ready(function() {

    // Comprobamos que el usuario no esté logado, si lo está lo redireccionamos a la página de inicio
    if (getCookie("NAONDA-TOKEN") != '') {
        redirect("HOME");
    }

    // Aplicamos la configuración de la barra de navegación
    navConfig("REGISTER");

    // Ocultamos paneles de error
    $(".alert").hide();

    // Función de registro
    function registrar() {

        // Obtenemos datos
        var user = $('#user').val();
        var mail = $('#email').val();
        var mail_c = $('#email-confirm').val();
        var pass = $('#pass').val();
        var pass_c = $('#pass-confirm').val();

        // Borramos y ocultamos posibles errores
        $("form small").html("");
        $(".alert").html("").hide();
        var error = false;
    
        // Comprobamos posibles errores y los mostramos en textos de ayuda del formulario
        if (user.length > 45) {
            $("#user + small").html("El nombre de usuario no puede contener más de 45 caractéres");
            error = true;
        } else if (/\s/.test(user)) {
            $("#user + small").html("El nombre de usuario no puede contener espacios");
            error = true;
        }

        if (mail != mail_c) {
            $("#email-confirm + small").html("Los correos electrónicos deben ser iguales");
            error = true;
        }

        if (pass != pass_c) {
            $("#pass-confirm + small").html("Los contraseñas deben ser iguales");
            error = true;
        }

        // Si no existen errores realizamos petición ajax de registro
        if (!error) {
            $.ajax({
                async: true,
                url: 'v1/user/register',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                processData: false,
                data: '{"user_name":"' + user + '","mail":"' + mail + '","pass":"' + pass + '"}',
                success: function(response) {
                    // Con logueo correcto alimentamos cookies y redireccionamos a inicio
                    setCookie("NAONDA-TOKEN", response.token, 1);
                    setCookie("NAONDA-USER", response.user, 1);
                    setCookie("NAONDA-NAME", response.user_name, 1);
                    setCookie("NAONDA-MSG", 'Bienvenid@ ' + response.user_name, 1);
                    redirect("HOME");
                },
                error: function(jqXHR, exception) {
                    // En caso de error mostramos panel con el error
                    $(".alert").html(jqXHR.responseJSON.message).fadeIn();
                }
            });
        }

    }

    // Validaciónde los campos del formulario al realizar submit
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            } else {
                event.preventDefault();
                event.stopPropagation();
                registrar();
            }
        }, false);
    });

    // Acceso directo a login
    $('#bt-login').click(function() {
        redirect("LOGIN");
    });

});