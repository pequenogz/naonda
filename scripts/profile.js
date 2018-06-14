/**
 * Script para el documento profile.html
 */

$(document).ready(function () {

    // Comprobamos que el usuario no esté logado, si no lo está lo redireccionamos a la página de login
    if (getCookie("NAONDA-TOKEN") == '') {
        redirect("LOGIN");
    }

    // Aplicamos la configuración de la barra de navegación
    navConfig("PROFILE");

    // Ocultamos panel para mensajes de error
    $(".alert").hide();

    // Obtenemos los valores del combo de nivel
    $.ajax({
        async: true,
        url: 'v1/user/combo-level',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization": getCookie("NAONDA-TOKEN")
        },
        success: function (response) {
            // Cargamos valores en el combo
            for (var i = 0; i < response.level.length; i++) {
                $('#level').append($("<option></option>")
                    .attr("value", response.level[i].id)
                    .text(response.level[i].level + " - " + response.level[i].description)
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos panel con el error
            $(".alert-danger").html(jqXHR.responseJSON.message).fadeIn();
        }
    });

    // Obtenemos los valores del perfil del usuario
    $.ajax({
        async: true,
        url: 'v1/user/profile',
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization": getCookie("NAONDA-TOKEN")
        },
        success: function (response) {
            // Cargamos valores en el formulario
            $('#user-name').val(response.user.user_name);
            $('#first-name').val(response.user.name);
            $('#last-name').val(response.user.surname);
            $('#mail').val(response.user.mail);
            $('#mail-confirm').val(response.user.mail);
            $('#level option[value="' + response.user.level + '"]').attr("selected", "selected");
            $('#pass').val("##########");
            $('#pass-confirm').val("##########");
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos panel con el error
            $(".alert-danger").html(jqXHR.responseJSON.message).fadeIn();
        }
    });

    // Función de actualización de perfil
    function actualizar() {

        var user = $('#user-name').val();
        var name = $('#first-name').val();
        var surname = $('#last-name').val();
        var mail = $('#mail').val();
        var mail_c = $('#mail-confirm').val();
        var level = $('#level option:selected').attr("value");
        if ($('#pass').val() != "##########") {
            var pass = $('#pass').val();
        }
        if ($('#pass-confirm').val() != "##########") {
            var pass_c = $('#pass-confirm').val();
        }

        // Borramos y ocultamos posibles errores
        $("form small").html("");
        $(".alert").html("").hide();
        var error = false;

        // Comprobamos posibles errores y los mostramos en textos de ayuda del formulario
        if (user.length > 45) {
            $("#user-name + small").html("El nombre de usuario no puede contener más de 45 caractéres");
            error = true;
        } else if (/\s/.test(user)) {
            $("#user-name + small").html("El nombre de usuario no puede contener espacios");
            error = true;
        }

        if (mail != mail_c) {
            $("#mail-confirm + small").html("Los correos electrónicos deben ser iguales");
            error = true;
        }

        if (pass != pass_c) {
            $("#pass-confirm + small").html("Los contraseñas deben ser iguales");
            error = true;
        }

        // Si no existen errore actualizamos los datos
        if (!error) {
            $.ajax({
                async: true,
                url: 'v1/user/modify',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": getCookie("NAONDA-TOKEN")
                },
                processData: false,
                data: '{"user_name":"' + user + '","name":"' + name + '","surname":"' + surname + '","mail":"' + mail + '","level":"' + level + '","img_name":"","img":"","pass":"' + pass + '"}',
                success: function (response) {
                    // Si la modificación es correcta mostramos panel con el resultado
                    setCookie("NAONDA-USER", response.user.mail, 1);
                    setCookie("NAONDA-NAME", response.user.user_name, 1);
                    $(".alert-success").html("Perfil actualizado").fadeIn();
                },
                error: function (jqXHR, exception) {
                    // En caso de error mostramos panel con el error
                    $(".alert-danger").html(jqXHR.responseJSON.message).fadeIn();
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
                actualizar();
            }
        }, false);
    });

});