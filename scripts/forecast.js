/**
 * Script para el documento forecast.html
 */
$(document).ready(function () {

    // Aplicamos la configuración de la barra de navegación
    navConfig("FORECAST");

    // Obtenemos el identificador de la playa solicitada en la URL
    var params = new URLSearchParams(window.location.search);
    var idSpot;
    if (params.has('id')) {
        idSpot = params.get('id');
    } else {
        // En caso de acceder a la página de manera externa lo redireccionamos al inicio
        setCookie("NAONDA-MSG", "Para consultar la previsión y detalles: Seleccione un SPOT.", 1);
        redirect("HOME");
    }

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

    // Obtenemos los valores necesarios para representar la playa en el mapa
    $.ajax({
        async: true,
        url: 'v1/spot/spot-map',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: '{"idForecast":"' + idSpot + '"}',
        success: function (response) {
            // Cargamos el marcador en el mapa
            initMap(13, response.spot);
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    // Obtenemos los datos de descripción del spot
    $.ajax({
        async: true,
        url: 'v1/spot/spot-description',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        processData: false,
        data: '{"idForecast":"' + idSpot + '"}',
        success: function (response) {
            // Cargamos los datos en los diferentes campos de la página
            // Nombre
            $('#spot-name').html(response[0].name);
            // Provincia
            $('#spot-region').html(response[0].region);
            for (var i = 0; i < 5; i++) {
                var id_rat = '#spot-rat-' + i;
                if (i < response[0].rating) {
                    $(id_rat).addClass("fas");
                } else {
                    $(id_rat).addClass("far");
                }
            }
            // Icono ducha
            if (response[0].shower == "1") {
                $('#spot-shower').show();
            } else {
                $('#spot-shower').hide();
            }
            // Icono parking
            if (response[0].parking == "1") {
                $('#spot-parking').show();
            } else {
                $('#spot-parking').hide();
            }
            // Icono hostelería
            if (response[0].hostelry == "1") {
                $('#spot-hostelry').show();
            } else {
                $('#spot-hostelry').hide();
            }
            // Icono socorrista
            if (response[0].life_guard == "1") {
                $('#spot-life-guard').show();
            } else {
                $('#spot-life-guard').hide();
            }
            // Icono baños
            if (response[0].wc == "1") {
                $('#spot-wc').show();
            } else {
                $('#spot-wc').hide();
            }
            // Icono wifi
            if (response[0].wifi == "1") {
                $('#spot-wifi').show();
            } else {
                $('#spot-wifi').hide();
            }
            // Icono bodyboard
            if (response[0].bodyboard == "1") {
                $('#spot-bodyboard').show();
            } else {
                $('#spot-bodyboard').hide();
            }
            // Icono furgoneta
            if (response[0].van == "1") {
                $('#spot-van').show();
            } else {
                $('#spot-van').hide();
            }
            // Latitud y longitud
            $('#spot-location').html(response[0].location);
            var strLat, strLng, grd, min, sec, crd;
            if (!isNaN(response[0].latitude)) {
                var lat = Number(response[0].latitude);
                if (lat >= 0) {
                    crd = 'N';
                } else {
                    crd = 'S';
                    lat = -lat;
                }
                grd = Math.floor(lat);
                min = Math.floor((lat - grd) * 60);
                sec = Math.floor((lat - (grd + min / 60)) * 3600);
                strLat = grd + 'º' + min + "'" + sec + '"' + crd;
            }
            if (!isNaN(response[0].longitude)) {
                var lng = Number(response[0].longitude);
                if (lng >= 0) {
                    crd = 'E';
                } else {
                    crd = 'O';
                    lng = -lng;
                }
                grd = Math.floor(lng);
                min = Math.floor((lng - grd) * 60);
                sec = Math.floor((lng - (grd + min / 60)) * 3600);
                strLng = grd + 'º' + min + "'" + sec + '"' + crd;
            }
            $('#spot-gps').html(strLat + " " + strLng);
            // Época
            $('#spot-time').html(response[0].time);
            // Fondo
            $('#spot-bottom').html(response[0].bottom);
            // Marea
            $('#spot-tide').html(response[0].tide);
            // Agua
            $('#spot-water').html(response[0].water);
            // Tamaño de la ola
            $('#spot-height').html(response[0].height);
            // Descripción de la ola
            $('#spot-wave').html(response[0].wave);
            // Viento
            $('#spot-wind').html(response[0].wind);
            // Swell
            $('#spot-swell').html(response[0].swell);
            // Localismo
            $('#spot-localism').html(response[0].localism);
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }
    });

    /**
     * Función generar las filas con los datos de previsión de cada hora
     * Se genera a fila con los datos de la hora y se devuelve para añadir a la tabla
     */
    generateRow = function (dataHour) {

        var row = $('<tr>').append(
            // Hora
            $('<td>').addClass('text-right').text(function () {
                var hour = new Date(dataHour.localTimestamp * 1000);
                if (hour.getUTCHours() == 0) {
                    return '12AM';
                } else if (hour.getUTCHours() > 12) {
                    return hour.getUTCHours() - 12 + 'PM';
                } else {
                    return hour.getUTCHours() + 'AM';
                }
            }).attr('scope', 'row'),
            // Rango de tamaño de las olas surfeables
            $('<td>').addClass('bg-info text-white text-center font-weight-bold').text(dataHour.swell.minBreakingHeight + '-' + dataHour.swell.maxBreakingHeight + 'm'),
            // Valoración de la previsión
            $('<td>').append(function () {
                var count = 0;
                var stars = $('<div>');
                for (var i = 0; i < dataHour.solidRating; i++) {
                    stars.append($('<i>').addClass('fas fa-star text-info'));
                    count++;
                }
                for (var i = 0; i < dataHour.fadedRating; i++) {
                    stars.append($('<i>').addClass('far fa-star text-info'));
                    count++;
                }
                for (var i = count; i < 5; i++) {
                    stars.append($('<i>').addClass('far fa-star text-light'));
                }
                return stars;
            }),
            // Ola primaria - tamaño
            $('<td>').addClass('text-right table-secondary').append(function () {
                if (dataHour.swell.components['primary'] != undefined) {
                    return wave1height = dataHour.swell.components.primary.height + 'm';
                } else {
                    return wave1height = '';
                }
            }),
            // Ola primaria - periodo
            $('<td>').addClass('text-right table-secondary').append(function () {
                if (dataHour.swell.components['primary'] != undefined) {
                    return wave1period = dataHour.swell.components.primary.period + 's';
                } else {
                    return wave1period = '';
                }
            }),
            // Ola primaria - dirección
            $('<td>').addClass('table-secondary').append(function () {
                if (dataHour.swell.components['primary'] != undefined) {
                    return $('<object>')
                        .attr({ data: 'img/compass.svg', type: 'image/svg+xml' })
                        .css({ height: '1em', transform: 'rotate(' + dataHour.swell.components.primary.direction + 'deg)' });
                } else {
                    return wave1direct = '';
                }
            }),
            // Ola secundaria - tamaño
            $('<td>').addClass('small text-right').append(function () {
                if (dataHour.swell.components['secondary'] != undefined) {
                    return wave1height = dataHour.swell.components.secondary.height + 'm';
                } else {
                    return wave1height = '';
                }
            }),
            // Ola secundaria - periodo
            $('<td>').addClass('small text-right').append(function () {
                if (dataHour.swell.components['secondary'] != undefined) {
                    return wave1period = dataHour.swell.components.secondary.period + 's';
                } else {
                    return wave1period = '';
                }
            }),
            // Ola secundaria - dirección
            $('<td>').addClass('small').append(function () {
                if (dataHour.swell.components['secondary'] != undefined) {
                    return $('<object>')
                        .attr({ data: 'img/compass.svg', type: 'image/svg+xml' })
                        .css({ height: '1em', transform: 'rotate(' + dataHour.swell.components.secondary.direction + 'deg)' });
                } else {
                    return wave1direct = '';
                }
            }),
            // Ola terciaria - tamaño
            $('<td>').addClass('text-right small').append(function () {
                if (dataHour.swell.components['tertiary'] != undefined) {
                    return wave1height = dataHour.swell.components.tertiary.height + 'm';
                } else {
                    return wave1height = '';
                }
            }),
            // Ola terciaria - periodo
            $('<td>').addClass('text-right small').append(function () {
                if (dataHour.swell.components['tertiary'] != undefined) {
                    return wave1period = dataHour.swell.components.tertiary.period + 's';
                } else {
                    return wave1period = '';
                }
            }),
            // Ola terciaria - dirección
            $('<td>').addClass('small').append(function () {
                if (dataHour.swell.components['tertiary'] != undefined) {
                    return $('<object>')
                        .attr({ data: 'img/compass.svg', type: 'image/svg+xml' })
                        .css({ height: '1em', transform: 'rotate(' + dataHour.swell.components.tertiary.direction + 'deg)' });
                } else {
                    return wave1direct = '';
                }
            }),
            // Viento - velocidad
            $('<td>').addClass('font-weight-bold text-right').text(dataHour.wind.speed),
            // Viento - ráfaga
            $('<td>').addClass('small text-left').text(dataHour.wind.gusts + 'kph'),
            // Viento - dirección
            $('<td>').append(
                $('<object>')
                    .attr({ data: 'img/arrow.svg', type: 'image/svg+xml' })
                    .css({ height: '1em', transform: 'rotate(' + dataHour.wind.direction + 'deg)' })
            ),
            // Tiempo - icono
            $('<td>').append(
                $('<img>').attr('src', 'http://cdnimages.magicseaweed.com/30x30/' + dataHour.condition.weather + '.png')
            ),
            // Tiempo - temperatura
            $('<td>').addClass('text-right').append(dataHour.condition.temperature + 'ºc'),
            // Probabilidad
            $('<td>').addClass('text-center small').text(dataHour.swell.probability + '%').css({
                'color': function () {
                    var green = Math.floor(dataHour.swell.probability * 2.55);
                    var red = Math.floor((100 - dataHour.swell.probability) * 2.55);
                    return 'rgb(' + red + ',' + green + ',0)';
                }
            })
        ).attr({
            // Añadimos los atributos de identificador de la playa y marca de tiempo
            spot: function () {
                return idSpot;
            }, localTimestamp: function () {
                return dataHour.localTimestamp;
            }
        });

        var dateNow = new Date();
        var dateFor = new Date(new Date(dataHour.localTimestamp * 1000).toISOString());

        // Si es un usuario logado añadimos los campos para valorar la predicción en caso de baño
        // Y no se podrán valorar predicciones futuras, ya que este no existe
        if (getCookie("NAONDA-TOKEN") != '') {
            row.append(
                $('<td>').addClass('text-right').append(
                    $('<i>').addClass(function () {
                        if (dateNow > dateFor) {
                            return 'fas fa-thumbs-up text-info val-pos';
                        } else {
                            return 'fas fa-thumbs-up text-muted val-no';
                        }
                    }).css({ transform: 'rotateY(180deg)' })
                ),
                $('<td>').addClass('text-left').append(
                    $('<i>').addClass(function () {
                        if (dateNow > dateFor) {
                            return 'fas fa-thumbs-down text-danger val-neg';
                        } else {
                            return 'fas fa-thumbs-down text-muted val-no';
                        }
                    })
                )
            );
        }

        // Retornamos la fila construida
        return row;

    }

    /**
     * Función generar el conjunto de filas con los datos de previsión para un día
     */
    processDay = function (dataDay) {

        // Recorremos los datos del día y vamos generando las filas y añadiendolas a la tabla
        for (var i = 0; i < dataDay.length; i++) {
            var localTimestamp = new Date(dataDay[i].localTimestamp * 1000);
            // Añadimos una fila con la fecha del día
            if (i === 0) {
                $('#table-forecast > tbody').append(
                    $('<tr>').addClass('table-info').append(
                        $('<th>').attr({
                            colspan: function () {
                                if (getCookie("NAONDA-TOKEN") != '') {
                                    return '21';
                                } else {
                                    return '19';
                                }
                            }
                        }).append(function () {
                            return $('<span>').addClass('text-info').text(weekDay(localTimestamp.getDay()) + ' ').append(
                                $('<span>').addClass('small').text(localTimestamp.getDate() + '/' + (localTimestamp.getMonth() + 1))
                            );
                        })
                    )
                );
            }
            // Generamos y añadimos la previsión para cada hora
            $('#table-forecast > tbody').append(function () {
                return generateRow(dataDay[i]);
            });
        }

    }

    /**
     * Función para recoger y almacenar las valoraciones de los usuarios
     */
    ratingForecast = function (spot, lts, val) {

        // Consultamos la predicción para la playa seleccionada y buscamos la hora seleccionada
        $.ajax({
            async: true,
            url: 'http://localhost/naonda/v1/spot/forecast',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            processData: false,
            data: '{"idForecast": "' + spot + '"}',
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    if (response[i].localTimestamp == lts) {
                        var timeStamp = new Date(new Date(response[i].localTimestamp * 1000).toISOString());
                        var timeStampStr = timeStamp.getFullYear() + '-' + formatNumber(timeStamp.getMonth() + 1) + '-' + formatNumber(timeStamp.getDate()) + ' ' + formatNumber(timeStamp.getUTCHours()) + ':00:00';
                        var minBreakingHeight = response[i].swell.minBreakingHeight;
                        var maxBreakingHeight = response[i].swell.maxBreakingHeight;
                        if (response[i].swell.components['primary'] != undefined) {
                            var wave1height = response[i].swell.components.primary.height;
                            var wave1period = response[i].swell.components.primary.period;
                            var wave1direction = response[i].swell.components.primary.direction;
                        } else {
                            var wave1height = 'NULL';
                            var wave1period = 'NULL';
                            var wave1direction = 'NULL';
                        }
                        if (response[i].swell.components['secondary'] != undefined) {
                            var wave2height = response[i].swell.components.secondary.height;
                            var wave2period = response[i].swell.components.secondary.period;
                            var wave2direction = response[i].swell.components.secondary.direction;
                        } else {
                            var wave2height = 'NULL';
                            var wave2period = 'NULL';
                            var wave2direction = 'NULL';
                        }
                        if (response[i].swell.components['tertiary'] != undefined) {
                            var wave3height = response[i].swell.components.tertiary.height;
                            var wave3period = response[i].swell.components.tertiary.period;
                            var wave3direction = response[i].swell.components.tertiary.direction;
                        } else {
                            var wave3height = 'NULL';
                            var wave3period = 'NULL';
                            var wave3direction = 'NULL';
                        }
                        var windSpeed = response[i].wind.speed;
                        var windGusts = response[i].wind.gusts;
                        var windDirection = response[i].wind.direction;
                        var windWeather = response[i].condition.weather;
                        var temperature = response[i].condition.temperature;
                        break;
                    }
                }
                // Enviamos los datos con la valoración
                $.ajax({
                    async: true,
                    url: 'http://localhost/naonda/v1/user/rate-forecast',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": getCookie("NAONDA-TOKEN")
                    },
                    processData: false,
                    data: '{"id_forecast":"' + spot
                        + '","local_timestamp":"' + timeStampStr
                        + '","min_breaking_height":"' + minBreakingHeight
                        + '","max_breaking_height":"' + maxBreakingHeight
                        + '","wave_1_height":"' + wave1height
                        + '","wave_1_period":"' + wave1period
                        + '","wave_1_direction":"' + wave1direction
                        + '","wave_2_height":"' + wave2height
                        + '","wave_2_period":"' + wave2period
                        + '","wave_2_direction":"' + wave2direction
                        + '","wave_3_height":"' + wave3height
                        + '","wave_3_period":"' + wave3period
                        + '","wave_3_direction":"' + wave3direction
                        + '","wind_speed":"' + windSpeed
                        + '","wind_gusts":"' + windGusts
                        + '","wind_direction":"' + windDirection
                        + '","weather":"' + windWeather
                        + '","temperature":"' + temperature
                        + '","rate":"' + val
                        + '"}',
                    success: function (response) {
                        // Mostramos mensaje al usuario
                        if (response == true) {
                            $('#alert-user').append(
                                $('<div>').addClass('container alert alert-success alert-dismissible fade show').attr({ role: 'alert' }).append(
                                    $('<span>').text('Valoración registrada en tu histórico!'),
                                    $('<button>').attr({ type: 'button', class: 'close', 'data-dismiss': 'alert', 'aria-label': 'Close' })
                                        .append().html('<span aria-hidden="true">&times;</span>')
                                )
                            );
                        } else {
                            $('#alert-user').append(
                                $('<div>').addClass('container alert alert-danger alert-dismissible fade show').attr({ role: 'alert' }).append(
                                    $('<span>').text('No se ha registrado la valoración.'),
                                    $('<button>').attr({ type: 'button', class: 'close', 'data-dismiss': 'alert', 'aria-label': 'Close' })
                                        .append().html('<span aria-hidden="true">&times;</span>')
                                )
                            );
                        }
                    },
                    error: function (jqXHR, exception) {
                        // En caso de error mostramos una alerta al usuario
                        alert("Error al registrar datos en el servicio: " + jqXHR.responseJSON.message +
                            "\nPuede ser que la página no funcione correctamente." +
                            "\nDisculpe las molestias.");
                    }
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

    // Obtenemos la predicción metereológica y la mostramos en una tabla
    $.ajax({
        async: true,
        url: 'http://localhost/naonda/v1/spot/forecast',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        processData: false,
        data: '{"idForecast": "' + idSpot + '"}',
        success: function (response) {
            // Añadimos cabecera a la tabla de previsiones
            $('#table-forecast').append(
                $('<thead>').append(
                    $('<tr>').append(
                        $('<th>').addClass('text-center').text('').attr({ scope: 'col' }),
                        $('<th>').addClass('text-center').text('SURF').attr({ scope: 'col' }),
                        $('<th>').addClass('text-center').text('VALORACIÓN').attr({ scope: 'col' }),
                        $('<th>').addClass('text-center').text('OLEAJE PRIMARIO').attr({ scope: 'col', colspan: '3' }),
                        $('<th>').addClass('text-center').text('OLEAJE SECUNDARIO').attr({ scope: 'col', colspan: '6' }),
                        $('<th>').addClass('text-center').text('VIENTO').attr({ scope: 'col', colspan: '3' }),
                        $('<th>').addClass('text-center').text('TIEMPO').attr({ scope: 'col', colspan: '2' }),
                        $('<th>').addClass('text-center').text('PROB.').attr({ scope: 'col' })
                    )
                ),
                $('<tbody>')
            );
            // Si en usuario está logado añadimos columnas de valoración
            if (getCookie("NAONDA-TOKEN") != '') {
                $('#table-forecast > thead > tr').append(
                    $('<th>').addClass('text-center').text('VALORAR').attr({ scope: 'col', colspan: '2' }),
                )
            }
            // Añadimos los datos de la tabla pasándolos en bloques de día
            var dataDay = [];
            for (var i = 0; i < response.length; i++) {
                if (i === 0) {
                    var fecha = new Date(response[i].localTimestamp * 1000);
                    dataDay.push(response[i]);
                } else {
                    var nuevaFecha = new Date(response[i].localTimestamp * 1000);
                    if (fecha.getDate() === nuevaFecha.getDate()) {
                        dataDay.push(response[i]);
                    } else {
                        fecha = nuevaFecha;
                        processDay(dataDay);
                        dataDay = [];
                        dataDay.push(response[i]);
                    }
                }
            }
            processDay(dataDay);
            // Añadimos listeners para los iconos de valoración
            if (getCookie("NAONDA-TOKEN") != '') {
                $('.val-no').click(function () {
                    $('#alert-user').append(
                        $('<div>').addClass('container alert alert-danger alert-dismissible fade show').attr({ role: 'alert' }).append(
                            $('<span>').text('Todavía no puedes valorar esta predicción.'),
                            $('<button>').attr({ type: 'button', class: 'close', 'data-dismiss': 'alert', 'aria-label': 'Close' })
                                .append().html('<span aria-hidden="true">&times;</span>')
                        )
                    );
                });
                $('.val-pos').click(function () {
                    ratingForecast(
                        $(this).parent().parent().attr('spot'),
                        $(this).parent().parent().attr('localTimestamp'),
                        1
                    );
                });
                $('.val-neg').click(function () {
                    ratingForecast(
                        $(this).parent().parent().attr('spot'),
                        $(this).parent().parent().attr('localTimestamp'),
                        -1
                    );
                });
            }
        },
        error: function (jqXHR, exception) {
            // En caso de error mostramos una alerta al usuario
            alert("Error al solicitar datos al servio: " + jqXHR.responseJSON.message +
                "\nPuede ser que la página no funcione correctamente." +
                "\nDisculpe las molestias.");
        }

    });

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
                },
                error: function (jqXHR, exception) {
                    // En caso de error mostramos una alerta al usuario
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