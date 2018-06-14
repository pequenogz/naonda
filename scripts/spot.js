/**
 * Script para el documento spot.html
 */
$(document).ready(function () {

    // Comprobamos que el usuario esté logado, si no lo está lo redireccionamos a la página de login
    if (getCookie("NAONDA-TOKEN") == "") {
        redirect("LOGIN");
    } else {
        // Si está logado comprobamos que sea administrador, si no lo redireccionamos a inicio
        if (getCookie("NAONDA-USER") != 1) {
            setCookie("NAONDA-MSG", "Debes ser administrador para acceder.", 1);
            redirect("HOME");
        }
    }

    // Aplicamos la configuración de la barra de navegación
    navConfig("SPOT");

    // Cargamos los datos del combo region
    $.ajax({
        async: false,
        url: 'v1/spot/combo-region',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Cargamos valores en el combo
            for (var i = 0; i < response.region.length; i++) {
                $('#spot-region').append(
                    $("<option>")
                        .attr("value", response.region[i].id)
                        .text(response.region[i].region)
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos del combo ubicación
    $.ajax({
        async: false,
        url: 'v1/spot/combo-location',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Cargamos valores en el combo
            for (var i = 0; i < response.location.length; i++) {
                $('#spot-location').append(
                    $("<option>")
                        .attr("value", response.location[i].id)
                        .text(response.location[i].location)
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos de los checks de epoca
    $.ajax({
        async: false,
        url: 'v1/spot/combo-time',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Mostramos los checks con los valores
            for (var i = 0; i < response.time.length; i++) {
                $('#spot-time').append(
                    $("<div>").addClass("form-check-inline").append(
                        $("<label>").addClass("form-check-label").append(
                            $('<input>').addClass("form-check-input").attr({ type: 'checkbox', value: response.time[i].id }),
                            response.time[i].time
                        )
                    )
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos de los checks de fondo
    $.ajax({
        async: false,
        url: 'v1/spot/combo-bottom',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Mostramos los checks con los valores
            for (var i = 0; i < response.bottom.length; i++) {
                $('#spot-bottom').append(
                    $("<div>").addClass("form-check-inline").append(
                        $("<label>").addClass("form-check-label").append(
                            $('<input>').addClass("form-check-input").attr({ type: 'checkbox', value: response.bottom[i].id }),
                            response.bottom[i].bottom
                        )
                    )
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos de los checks de marea
    $.ajax({
        async: false,
        url: 'v1/spot/combo-tide',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Mostramos los checks con los valores
            for (var i = 0; i < response.tide.length; i++) {
                $('#spot-tide').append(
                    $("<div>").addClass("form-check-inline").append(
                        $("<label>").addClass("form-check-label").append(
                            $('<input>').addClass("form-check-input").attr({ type: 'checkbox', value: response.tide[i].id }),
                            response.tide[i].tide
                        )
                    )
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos del combo calidad del agua
    $.ajax({
        async: false,
        url: 'v1/spot/combo-water',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Cargamos valores en el combo
            for (var i = 0; i < response.water.length; i++) {
                $('#spot-water').append(
                    $("<option>")
                        .attr("value", response.water[i].id)
                        .text(response.water[i].water)
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos de los checks de tamaño de la ola
    $.ajax({
        async: false,
        url: 'v1/spot/combo-wave-height',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Mostramos los checks con los valores
            for (var i = 0; i < response.height.length; i++) {
                $('#spot-wave-height').append(
                    $("<div>").addClass("form-check-inline").append(
                        $("<label>").addClass("form-check-label").append(
                            $('<input>').addClass("form-check-input").attr({ type: 'checkbox', value: response.height[i].id }),
                            response.height[i].height
                        )
                    )
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos del combo largo de la ola
    $.ajax({
        async: false,
        url: 'v1/spot/combo-wave-length',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Cargamos valores en el combo
            for (var i = 0; i < response.length.length; i++) {
                $('#spot-wave-length').append(
                    $("<option>")
                        .attr("value", response.length[i].id)
                        .text(response.length[i].length)
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos de los checks de direccion de la ola
    $.ajax({
        async: false,
        url: 'v1/spot/combo-wave-direction',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Mostramos los checks con los valores
            for (var i = 0; i < response.direction.length; i++) {
                $('#spot-wave-direction').append(
                    $("<div>").addClass("form-check-inline").append(
                        $("<label>").addClass("form-check-label").append(
                            $('<input>').addClass("form-check-input").attr({ type: 'checkbox', value: response.direction[i].id }),
                            response.direction[i].direction
                        )
                    )
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos de los checks de descripción de la ola
    $.ajax({
        async: false,
        url: 'v1/spot/combo-wave-description',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Mostramos los checks con los valores
            for (var i = 0; i < response.description.length; i++) {
                $('#spot-wave-description').append(
                    $("<div>").addClass("form-check-inline").append(
                        $("<label>").addClass("form-check-label").append(
                            $('<input>').addClass("form-check-input").attr({ type: 'checkbox', value: response.description[i].id }),
                            response.description[i].description
                        )
                    )
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos de los checks de direccion
    $.ajax({
        async: false,
        url: 'v1/spot/combo-direction',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Mostramos los checks con los valores
            for (var i = 0; i < response.direction.length; i++) {
                $('#spot-wind-direction').append(
                    $("<div>").addClass("form-check-inline").append(
                        $("<label>").addClass("form-check-label").append(
                            $('<input>').addClass("form-check-input").attr({ type: 'checkbox', value: response.direction[i].id }),
                            response.direction[i].direction
                        )
                    )
                );
                $('#spot-swell-direction').append(
                    $("<div>").addClass("form-check-inline").append(
                        $("<label>").addClass("form-check-label").append(
                            $('<input>').addClass("form-check-input").attr({ type: 'checkbox', value: response.direction[i].id }),
                            response.direction[i].direction
                        )
                    )
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos del combo swell
    $.ajax({
        async: false,
        url: 'v1/spot/combo-swell-strength',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Cargamos valores en el combo
            for (var i = 0; i < response.strength.length; i++) {
                $('#spot-swell-strength').append(
                    $("<option>")
                        .attr("value", response.strength[i].id)
                        .text(response.strength[i].strength)
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos del combo localismo
    $.ajax({
        async: false,
        url: 'v1/spot/combo-localism',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Cargamos valores en el combo
            for (var i = 0; i < response.localism.length; i++) {
                $('#spot-localism').append(
                    $("<option>")
                        .attr("value", response.localism[i].id)
                        .text(response.localism[i].localism)
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Cargamos los datos del combo conflictivo
    $.ajax({
        async: false,
        url: 'v1/spot/combo-conflict',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Cargamos valores en el combo
            for (var i = 0; i < response.conflict.length; i++) {
                $('#spot-conflict').append(
                    $("<option>")
                        .attr("value", response.conflict[i].id)
                        .text(response.conflict[i].conflict)
                );
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Obtenemos el identificador de la playa
    var params = new URLSearchParams(window.location.search);
    var idSpot = 0;
    if (params.has('id')) {
        idSpot = params.get('id');

        // Si tenemos identificador consultamos y cargamos los datos de la playa
        $.ajax({
            async: true,
            url: "http://localhost/naonda/v1/spot/edit",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("NAONDA-TOKEN")
            },
            processData: false,
            data: '{"id":"' + idSpot + '","data":"main"}',
            success: function (response) {
                // Activo
                if (response[0].active == 1) {
                    $('#spot-active > input').attr({ checked: 'checked' });
                }
                // Bodyboard
                if (response[0].bodyboard == 1) {
                    $('#spot-services [value="bodyboard"]').attr({ checked: 'checked' });
                }
                // Conflictivo
                if (response[0].conflict != null) {
                    $('#spot-conflict [value="' + response[0].conflict + '"]').attr({ selected: 'selected' });
                }
                // Identificador predicción
                if (response[0].forecast != null && response[0].forecast.length != null) {
                    $('#spot-id-forecast').val(response[0].forecast);
                }
                // Hostelería
                if (response[0].hostelry == 1) {
                    $('#spot-services [value="hostelry"]').attr({ checked: 'checked' });
                }
                // Latitud
                if (response[0].latitude != null && response[0].latitude.length != null) {
                    $('#spot-latitude').val(response[0].latitude);
                }
                // Socorrista
                if (response[0].life_guard == 1) {
                    $('#spot-services [value="life_guard"]').attr({ checked: 'checked' });
                }
                // Localismo
                if (response[0].localism != null) {
                    $('#spot-localism [value="' + response[0].localism + '"]').attr({ selected: 'selected' });
                }
                // Localización
                if (response[0].location != null) {
                    $('#spot-location [value="' + response[0].location + '"]').attr({ selected: 'selected' });
                }
                // Longitud
                if (response[0].longitude != null && response[0].longitude.length != null) {
                    $('#spot-longitude').val(response[0].longitude);
                }
                // Nombre
                if (response[0].name != null && response[0].name.length != null) {
                    $('#spot-name').val(response[0].name);
                }
                // Parking
                if (response[0].parking == 1) {
                    $('#spot-services [value="parking"]').attr({ checked: 'checked' });
                }
                // Valoración
                if (response[0].rating != null) {
                    $('#spot-rating [value="' + response[0].rating + '"]').attr({ selected: 'selected' });
                }
                // Región
                if (response[0].region != null) {
                    $('#spot-region [value="' + response[0].region + '"]').attr({ selected: 'selected' });
                }
                // Duchas
                if (response[0].shower == 1) {
                    $('#spot-services [value="shower"]').attr({ checked: 'checked' });
                }
                // Swell
                if (response[0].swell_strength != null) {
                    $('#spot-swell-strength [value="' + response[0].swell_strength + '"]').attr({ selected: 'selected' });
                }
                // Furgoneta
                if (response[0].van == 1) {
                    $('#spot-services [value="van"]').attr({ checked: 'checked' });
                }
                // Calidad del agua
                if (response[0].water != null) {
                    $('#spot-water [value="' + response[0].water + '"]').attr({ selected: 'selected' });
                }
                // Largo de la ola
                if (response[0].wave_length != null) {
                    $('#spot-wave-length [value="' + response[0].wave_length + '"]').attr({ selected: 'selected' });
                }
                // Baños
                if (response[0].wc == 1) {
                    $('#spot-services [value="wc"]').attr({ checked: 'checked' });
                }
                // Wifi
                if (response[0].wifi == 1) {
                    $('#spot-services [value="wifi"]').attr({ checked: 'checked' });
                }
            },
            error: function (jqXHR, exception) {
                // En caso de error mostramos una alerta al usuario
                alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                    "\nPuede ser que la página no funcione correctamente." +
                    "\nDisculpe las molestias.");
            }
        });

        // Consultamos y mostramos las épocas
        $.ajax({
            async: true,
            url: "http://localhost/naonda/v1/spot/edit",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("NAONDA-TOKEN")
            },
            processData: false,
            data: '{"id":"' + idSpot + '","data":"time"}',
            success: function (response) {
                for (var time in response) {
                    $('#spot-time [value="' + response[time].time + '"]').attr({ checked: 'checked' });
                }
            },
            error: function (jqXHR, exception) {
                // En caso de error mostramos una alerta al usuario
                alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                    "\nPuede ser que la página no funcione correctamente." +
                    "\nDisculpe las molestias.");
            }
        });

        // Consultamos y mostramos los fondos
        $.ajax({
            async: true,
            url: "http://localhost/naonda/v1/spot/edit",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("NAONDA-TOKEN")
            },
            processData: false,
            data: '{"id":"' + idSpot + '","data":"bottom"}',
            success: function (response) {
                for (var bottom in response) {
                    $('#spot-bottom [value="' + response[bottom].bottom + '"]').attr({ checked: 'checked' });
                }
            },
            error: function (jqXHR, exception) {
                // En caso de error mostramos una alerta al usuario
                alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                    "\nPuede ser que la página no funcione correctamente." +
                    "\nDisculpe las molestias.");
            }
        });

        // Consultamos y mostramos las mareas
        $.ajax({
            async: true,
            url: "http://localhost/naonda/v1/spot/edit",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("NAONDA-TOKEN")
            },
            processData: false,
            data: '{"id":"' + idSpot + '","data":"tide"}',
            success: function (response) {
                for (var tide in response) {
                    $('#spot-tide [value="' + response[tide].tide + '"]').attr({ checked: 'checked' });
                }
            },
            error: function (jqXHR, exception) {
                // En caso de error mostramos una alerta al usuario
                alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                    "\nPuede ser que la página no funcione correctamente." +
                    "\nDisculpe las molestias.");
            }
        });

        // Consultamos y mostramos los tamaños de las olas
        $.ajax({
            async: true,
            url: "http://localhost/naonda/v1/spot/edit",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("NAONDA-TOKEN")
            },
            processData: false,
            data: '{"id":"' + idSpot + '","data":"wave-heigth"}',
            success: function (response) {
                for (var height in response) {
                    $('#spot-wave-height [value="' + response[height].height + '"]').attr({ checked: 'checked' });
                }
            },
            error: function (jqXHR, exception) {
                // En caso de error mostramos una alerta al usuario
                alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                    "\nPuede ser que la página no funcione correctamente." +
                    "\nDisculpe las molestias.");
            }
        });

        // Consultamos y mostramos las direcciones de las olas
        $.ajax({
            async: true,
            url: "http://localhost/naonda/v1/spot/edit",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("NAONDA-TOKEN")
            },
            processData: false,
            data: '{"id":"' + idSpot + '","data":"wave-direction"}',
            success: function (response) {
                for (var wave_direction in response) {
                    $('#spot-wave-direction [value="' + response[wave_direction].wave_direction + '"]').attr({ checked: 'checked' });
                }
            },
            error: function (jqXHR, exception) {
                // En caso de error mostramos una alerta al usuario
                alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                    "\nPuede ser que la página no funcione correctamente." +
                    "\nDisculpe las molestias.");
            }
        });

        // Consultamos y mostramos las descripciones de las olas
        $.ajax({
            async: true,
            url: "http://localhost/naonda/v1/spot/edit",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("NAONDA-TOKEN")
            },
            processData: false,
            data: '{"id":"' + idSpot + '","data":"wave-description"}',
            success: function (response) {
                for (var wave_description in response) {
                    $('#spot-wave-description [value="' + response[wave_description].wave_description + '"]').attr({ checked: 'checked' });
                }
            },
            error: function (jqXHR, exception) {
                // En caso de error mostramos una alerta al usuario
                alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                    "\nPuede ser que la página no funcione correctamente." +
                    "\nDisculpe las molestias.");
            }
        });

        // Consultamos y mostramos las direcciones del viento
        $.ajax({
            async: true,
            url: "http://localhost/naonda/v1/spot/edit",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("NAONDA-TOKEN")
            },
            processData: false,
            data: '{"id":"' + idSpot + '","data":"wind-direction"}',
            success: function (response) {
                for (var wind_direction in response) {
                    $('#spot-wind-direction [value="' + response[wind_direction].wind_direction + '"]').attr({ checked: 'checked' });
                }
            },
            error: function (jqXHR, exception) {
                // En caso de error mostramos una alerta al usuario
                alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                    "\nPuede ser que la página no funcione correctamente." +
                    "\nDisculpe las molestias.");
            }
        });

        // Consultamos y mostramos las direcciones del swell
        $.ajax({
            async: true,
            url: "http://localhost/naonda/v1/spot/edit",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("NAONDA-TOKEN")
            },
            processData: false,
            data: '{"id":"' + idSpot + '","data":"swell-direction"}',
            success: function (response) {
                for (var swell_direction in response) {
                    $('#spot-swell-direction [value="' + response[swell_direction].swell_direction + '"]').attr({ checked: 'checked' });
                }
            },
            error: function (jqXHR, exception) {
                // En caso de error mostramos una alerta al usuario
                alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                    "\nPuede ser que la página no funcione correctamente." +
                    "\nDisculpe las molestias.");
            }
        });

    }

    // Listener para guardar los datos del formulario
    $('#spot-save').click(function () {
        var name = $('#spot-name').val();
        var region = $('#spot-region option:selected').val();
        var location = $('#spot-location option:selected').val();
        var latitude = $('#spot-latitude').val();
        var longitude = $('#spot-longitude').val();
        var timeArray = [];
        var time = '';
        $('#spot-time input:checked').each(function () {
            if (time == '') {
                time = $(this).val();
            } else {
                time = time + '#' + $(this).val();
            }
        });
        var bottomArray = [];
        var bottom = '';
        $('#spot-bottom input:checked').each(function () {
            if (bottom == '') {
                bottom = $(this).val();
            } else {
                bottom = bottom + '#' + $(this).val();
            }
        });
        var tideArray = [];
        var tide = '';
        $('#spot-tide input:checked').each(function () {
            if (tide == '') {
                tide = $(this).val();
            } else {
                tide = tide + '#' + $(this).val();
            }
        });
        var water = $('#spot-water option:selected').val();
        var heightArray = [];
        var height = '';
        $('#spot-wave-height input:checked').each(function () {
            if (height == '') {
                height = $(this).val();
            } else {
                height = height + '#' + $(this).val();
            }
        });
        var length = $('#spot-wave-length option:selected').val();
        var waveDirectionArray = [];
        var waveDirection = '';
        $('#spot-wave-direction input:checked').each(function () {
            if (waveDirection == '') {
                waveDirection = $(this).val();
            } else {
                waveDirection = waveDirection + '#' + $(this).val();
            }
        });
        var descriptionArray = [];
        var description = '';
        $('#spot-wave-description input:checked').each(function () {
            if (description == '') {
                description = $(this).val();
            } else {
                description = description + '#' + $(this).val();
            }
        });
        var windArray = [];
        var wind = '';
        $('#spot-wind-direction input:checked').each(function () {
            if (wind == '') {
                wind = $(this).val();
            } else {
                wind = wind + '#' + $(this).val();
            }
        });
        var strength = $('#spot-swell-strength option:selected').val();
        var swellArray = [];
        var swell = '';
        $('#spot-swell-direction input:checked').each(function () {
            if (swell == '') {
                swell = $(this).val();
            } else {
                swell = swell + '#' + $(this).val();
            }
        });
        var localism = $('#spot-localism option:selected').val();
        var conflict = $('#spot-conflict option:selected').val();
        if ($('#spot-services [value="shower"]').is(':checked')) {
            var shower = 1;
        } else {
            var shower = 0;
        }
        if ($('#spot-services [value="parking"]').is(':checked')) {
            var parking = 1;
        } else {
            var parking = 0;
        }
        if ($('#spot-services [value="hostelry"]').is(':checked')) {
            var hostelry = 1;
        } else {
            var hostelry = 0;
        }
        if ($('#spot-services [value="life_guard"]').is(':checked')) {
            var life_guard = 1;
        } else {
            var life_guard = 0;
        }
        if ($('#spot-services [value="wc"]').is(':checked')) {
            var wc = 1;
        } else {
            var wc = 0;
        }
        if ($('#spot-services [value="wifi"]').is(':checked')) {
            var wifi = 1;
        } else {
            var wifi = 0;
        }
        if ($('#spot-services [value="bodyboard"]').is(':checked')) {
            var bodyboard = 1;
        } else {
            var bodyboard = 0;
        }
        if ($('#spot-services [value="van"]').is(':checked')) {
            var van = 1;
        } else {
            var van = 0;
        }
        var rating = $('#spot-rating option:selected').val();
        var forecast = $('#spot-id-forecast').val();
        if ($('#spot-active input').is(':checked')) {
            var active = 1;
        } else {
            var active = 0;
        }

        // Enviamos los datos para guardar
        $.ajax({
            async: true,
            url: "http://localhost/naonda/v1/spot/save",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: getCookie("NAONDA-TOKEN")
            },
            processData: false,
            data: '{"id":"' + idSpot
                + '","name":"' + name
                + '","region":"' + region
                + '","location":"' + location
                + '","latitude":"' + latitude
                + '","longitude":"' + longitude
                + '","time":"' + time
                + '","bottom":"' + bottom
                + '","tide":"' + tide
                + '","water":"' + water
                + '","wave-heigth":"' + height
                + '","wave-length":"' + length
                + '","wave-direction":"' + waveDirection
                + '","wave-description":"' + description
                + '","wind":"' + wind
                + '","strength":"' + strength
                + '","swell":"' + swell
                + '","localism":"' + localism
                + '","conflict":"' + conflict
                + '","shower":"' + shower
                + '","parking":"' + parking
                + '","hostelry":"' + hostelry
                + '","life-guard":"' + life_guard
                + '","wc":"' + wc
                + '","wifi":"' + wifi
                + '","bodyboard":"' + bodyboard
                + '","van":"' + van
                + '","rating":"' + rating
                + '","forecast":"' + forecast
                + '","active":"' + active
                + '"}',
            success: function (response) {
                // Si todo es correcto redireccionamos a inicio, sino mostramos error
                if (response[0].result == "OK") {
                    setCookie("NAONDA-MSG", "Datos guardados.");
                    redirect("HOME");
                } else {
                    alert("Error al guardar los datos: " + response[0].result + ".");
                }
            },
            error: function (jqXHR, exception) {
                // En caso de error mostramos una alerta al usuario
                alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                    "\nPuede ser que la página no funcione correctamente." +
                    "\nDisculpe las molestias.");
            }
        });
    });

});