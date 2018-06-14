/**
 * Script para el documento historic.html
 */
$(document).ready(function () {

    // Comprobamos que el usuario esté logado, si no lo está lo redireccionamos a la página de login
    if (getCookie("NAONDA-TOKEN") == '') {
        redirect("LOGIN");
    }

    // Aplicamos la configuración de la barra de navegación
    navConfig("HISTORIC");

    // Obtenemos datos del histórico para el usuario
    $.ajax({
        async: true,
        url: "http://localhost/naonda/v1/user/historic",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": getCookie("NAONDA-TOKEN")
        },
        success: function (response) {
            // Cargamos las diferentes valoraciones en el timeline en forma de tabla
            for (var i = 0; i < response.length; i++) {
                $('.cd-timeline__container').append(
                    $('<div>').addClass('cd-timeline__block js-cd-block').append(
                        $('<div>').addClass(function () {
                            if (response[i].rate == 1) {
                                return "cd-timeline__img cd-timeline__img--good js-cd-img"
                            } else {
                                return "cd-timeline__img cd-timeline__img--bad js-cd-img"
                            }
                        }).append(
                            $('<img>').attr({
                                src: function () {
                                    if (response[i].rate == 1) {
                                        return "img/like.png"
                                    } else {
                                        return "img/like-not.png"
                                    }
                                }, alt: "Surfer"
                            })
                        ),
                        $('<div>').addClass("cd-timeline__content js-cd-content").append(
                            $('<h2>').text(response[i].spot),
                            $('<table>').addClass("table table-sm").append(
                                $('<tbody>').append(
                                    $('<tr>').append(
                                        $('<th>').attr({ scope: 'row' }).text('SURF'),
                                        $('<td>').attr({ colspan: '3' }).text(response[i].min_breaking_height + ' - ' + response[i].max_breaking_height + ' m')
                                    ),
                                    $('<tr>').append(
                                        $('<th>').attr({ scope: 'row' }).text('OLA PRIMARIA'),
                                        $('<td>').text(function () {
                                            if (response[i].wave_1_height == null) {
                                                return '-';
                                            } else {
                                                return response[i].wave_1_height + ' m';
                                            }
                                        }),
                                        $('<td>').text(function () {
                                            if (response[i].wave_1_period == null) {
                                                return '-';
                                            } else {
                                                return response[i].wave_1_period + ' s';
                                            }
                                        }),
                                        $('<td>').append(function () {
                                            if (response[i].wave_1_direction == null) {
                                                return $('<span>').text('-');
                                            } else {
                                                return $('<object>')
                                                    .attr({ data: 'img/compass.svg', type: 'image/svg+xml' })
                                                    .css({ height: '1em', transform: 'rotate(' + response[i].wave_1_direction + 'deg)' });
                                            }
                                        })
                                    ),
                                    $('<tr>').append(
                                        $('<th>').attr({ scope: 'row' }).text('OLA SECUNDARIA'),
                                        $('<td>').text(function () {
                                            if (response[i].wave_2_height == null) {
                                                return '-';
                                            } else {
                                                return response[i].wave_2_height + ' m';
                                            }
                                        }),
                                        $('<td>').text(function () {
                                            if (response[i].wave_2_period == null) {
                                                return '-';
                                            } else {
                                                return response[i].wave_2_period + ' s';
                                            }
                                        }),
                                        $('<td>').append(function () {
                                            if (response[i].wave_2_direction == null) {
                                                return $('<span>').text('-');
                                            } else {
                                                return $('<object>')
                                                    .attr({ data: 'img/compass.svg', type: 'image/svg+xml' })
                                                    .css({ height: '1em', transform: 'rotate(' + response[i].wave_2_direction + 'deg)' });
                                            }
                                        })
                                    ),
                                    $('<tr>').append(
                                        $('<th>').attr({ scope: 'row' }).text('OLA TERCIARIA'),
                                        $('<td>').text(function () {
                                            if (response[i].wave_3_height == null) {
                                                return '-';
                                            } else {
                                                return response[i].wave_3_height + ' m';
                                            }
                                        }),
                                        $('<td>').text(function () {
                                            if (response[i].wave_3_period == null) {
                                                return '-';
                                            } else {
                                                return response[i].wave_3_period + ' s';
                                            }
                                        }),
                                        $('<td>').append(function () {
                                            if (response[i].wave_3_direction == null) {
                                                return $('<span>').text('-');
                                            } else {
                                                return $('<object>')
                                                    .attr({ data: 'img/compass.svg', type: 'image/svg+xml' })
                                                    .css({ height: '1em', transform: 'rotate(' + response[i].wave_3_direction + 'deg)' });
                                            }
                                        })
                                    ),
                                    $('<tr>').append(
                                        $('<th>').attr({ scope: 'row' }).text('VIENTO'),
                                        $('<td>').text(response[i].wind_speed + ' kph'),
                                        $('<td>').text(response[i].wind_gusts + ' kph'),
                                        $('<td>').append(
                                            $('<object>')
                                                .attr({ data: 'img/arrow.svg', type: 'image/svg+xml' })
                                                .css({ height: '1em', transform: 'rotate(' + response[i].wind_direction + 'deg)' })
                                        )
                                    ),
                                    $('<tr>').append(
                                        $('<th>').attr({ scope: 'row' }).text('TIEMPO'),
                                        $('<td>').append(
                                            $('<img>').attr('src', 'http://cdnimages.magicseaweed.com/30x30/' + response[i].weather + '.png')
                                        ),
                                        $('<td>').text(response[i].temperature + ' ºc'),
                                        $('<td>')
                                    )
                                )
                            ),
                            $('<span>').addClass("cd-timeline__date").text(function () {
                                var fecha = new Date(response[i].local_timestamp);
                                return weekDay(fecha.getDay()) + ', ' + fecha.getDate() + ' de ' + month(fecha.getMonth()) + ' de ' + fecha.getFullYear() + ' - ' + hour(fecha.getHours());
                            })
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

});