/**
 * Script para el documento index.html
 */
$(document).ready(function () {

    // Aplicamos la configuración de la barra de navegación
    navConfig("HOME");

    // Obtenemos los valores del combo de provincias
    $.ajax({
        async: true,
        url: 'v1/spot/combo-region',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        success: function (response) {
            // Cargamos los valores en el combo
            for (var i = 0; i < response.region.length; i++) {
                $('#region').append($("<option></option>")
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

    // Obtenemos los valores necesarios para representar las playas en el mapa
    $.ajax({
        async: true,
        url: 'v1/spot/combo-spot',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: '{"id_region":"0"}',
        success: function (response) {
            // Cargamos los marcadores en el mapa
            initMap(7, response.spot);
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Obtenemos los valores necesarios para mostrar listado de playas en el Datatable
    if (getCookie("NAONDA-USER") == 1) {

        // Datos a mostrar en caso de que el usuario sea administrador
        $.ajax({
            async: true,
            url: 'v1/spot/table-spot-admin',
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": getCookie("NAONDA-TOKEN")
            },
            success: function (response) {
                // Cargamos los datos en la tabla
                $('#table-spots').DataTable({
                    data: response,
                    columns: [
                        // Provincia
                        { title: "Provincia" },
                        // Nombre de la playa
                        { title: "Playa" },
                        // Valoración de la playa
                        {
                            title: "Valoración", render: function (data) {
                                var stars = '<span style="opacity: 0;">' + data + '</span>';
                                for (var i = 0; i < 5; i++) {
                                    if (i < data) {
                                        stars = stars + '<i class="fas fa-star text-info"></i>';
                                    } else {
                                        stars = stars + '<i class="far fa-star text-info"></i>';
                                    }
                                }
                                return stars;
                            }
                        },
                        // Visible para los usuarios
                        { title: "Activo" },
                        // Botón para consultar la previsión
                        {
                            title: "Detalles & Previsión", render: function (data) {
                                return '<a href="forecast.html?id=' + data + '" class="btn btn-info btn-sm btn-block">Consultar</a>';
                            }
                        },
                        // Botón para acceder a formulario de ecidión de la playa
                        {
                            title: "Editar", render: function (data) {
                                return '<a href="spot.html?id=' + data + '" class="btn btn-info btn-sm btn-block">Editar</a>';
                            }
                        },
                        // Botón para eliminar la playa
                        {
                            title: "Eliminar", render: function (data) {
                                return '<button value="' + data + '" class="del-spot btn btn-info btn-sm btn-block">Eliminar</button>';
                            }
                        }
                    ]
                });

                // Añadimos listener para el botón de eliminar playa
                $('.del-spot').click(function () {
                    // Petición de eliminación de playa
                    $.ajax({
                        async: true,
                        url: "http://localhost/naonda/v1/spot/delete",
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: getCookie("NAONDA-TOKEN")
                        },
                        processData: false,
                        data: '{"id": "' + $(this).val() + '"}',
                        success: function (response) {
                            setCookie("NAONDA-MSG", "Playa eliminada.")
                            redirect("INDEX");
                        },
                        error: function (jqXHR, exception) {
                            // En caso de error mostramos una alerta al usuario
                            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                                "\nPuede ser que la página no funcione correctamente." +
                                "\nDisculpe las molestias.");
                        }
                    });
                });
            },
            error: function (jqXHR, exception) {
                // En caso de error mostramos una alerta al usuario
                alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                    "\nPuede ser que la página no funcione correctamente." +
                    "\nDisculpe las molestias.");
            }
        });

        // Añadimos un botón antes de la tabla para acceder al formulario de creación de una nueva playa
        $('#alert-user').after(
            $('<div>').addClass('container').css({ 'margin-top': '1em' }).append(
                $('<div>').addClass('text-right').append(
                    $('<a>').addClass('btn btn-info').attr({ href: 'spot.html' }).text('Nuevo')
                )
            )
        );

    } else {

        // Datos a mostrar en caso de que el usuario no sea administrador
        $.ajax({
            async: true,
            url: 'v1/spot/table-spot',
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            success: function (response) {
                // Cargamos los datos en la tabla
                $('#table-spots').DataTable({
                    data: response,
                    columns: [
                        // Provincia
                        { title: "Provincia" },
                        // Nombre de la playa
                        { title: "Playa" },
                        // Valoración de la playa
                        {
                            title: "Valoración", render: function (data) {
                                var stars = '<span style="opacity: 0;">' + data + '</span>';
                                for (var i = 0; i < 5; i++) {
                                    if (i < data) {
                                        stars = stars + '<i class="fas fa-star text-info"></i>';
                                    } else {
                                        stars = stars + '<i class="far fa-star text-info"></i>';
                                    }
                                }
                                return stars;
                            }
                        },
                        // Botón de acceso a la previsión de la playa
                        {
                            title: "Detalles & Previsión", render: function (data) {
                                return '<a href="forecast.html?id=' + data + '" class="btn btn-info btn-sm btn-block">Consultar</a>';
                            }
                        },
                    ]
                });
            },
            error: function (jqXHR, exception) {
                // En caso de error mostramos una alerta al usuario
                alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                    "\nPuede ser que la página no funcione correctamente." +
                    "\nDisculpe las molestias.");
            }
        });

    }

    // Añadimos listener para combo provincia
    $('#region').change(function () {

        // Borramos datos del combo de playas
        $('#spot').children('option:not(:first)').remove();
        $('#spot').prop('disabled', 'disabled');

        // Comprobamos que el valor seleccionado no sea el valor por defecto
        if ($('#region option:selected').text() != "Seleccionar...") {
            var id_region = $('#region option:selected').attr("value");
            // Obtenemos las playas para la provincia seleccionada
            $.ajax({
                async: true,
                url: 'v1/spot/combo-spot',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                data: '{"id_region":"' + id_region + '"}',
                success: function (response) {
                    // Cargamos valores en el combo de playas
                    for (var i = 0; i < response.spot.length; i++) {
                        $('#spot').append($("<option></option>")
                            .attr("value", response.spot[i].idForecast)
                            .text(response.spot[i].name)
                        );
                    }
                    $('#spot').prop('disabled', false);
                    initMap(8, response.spot);
                },
                error: function (jqXHR, exception) {
                    // En caso de error mostramos una alerta al usuario
                    alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                        "\nPuede ser que la página no funcione correctamente." +
                        "\nDisculpe las molestias.");
                }
            });
        } else {
            // En caso de que sea el valor por defecto recargamos todas las playas
            $.ajax({
                async: true,
                url: 'v1/spot/combo-spot',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                data: '{"id_region":"0"}',
                success: function (response) {
                    // Cargamos marcadores en el mapa
                    initMap(7, response.spot);
                },
                error: function (jqXHR, exception) {
                    // En caso de error mostramos una advertencia
                    alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                        "\nPuede ser que la página no funcione correctamente." +
                        "\nDisculpe las molestias.");
                }
            });
        }
        
    });

    // Añadimos listener para combo playas
    $('#spot').change(function () {
        // En caso de seleccionar una playa redireccionamos a la previsión
        if ($('#spot option:selected').text() != "Seleccionar...") {
            var idSpot = $('#spot option:selected').attr("value");
            redirect("FORECAST", idSpot);
        }
    });

});