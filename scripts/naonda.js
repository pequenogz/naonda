/**
 * Script con funciones generales de toda las web
 */

// Función para obtener el centro del mapa con varias localizaciones
mapCenter = function (spots) {

    var maxLat;
    var minLat;
    var maxLng;
    var minLng;

    for (var i = 0; i < spots.length; i++) {

        if (!isNaN(spots[i].latitude)) {
            if (i == 0) {
                maxLat = Number(spots[i].latitude);
                minLat = Number(spots[i].latitude);
            } else {
                if (Number(spots[i].latitude) > maxLat) {
                    maxLat = Number(spots[i].latitude);
                }
                if (Number(spots[i].latitude) < minLat) {
                    minLat = Number(spots[i].latitude);
                }
            }
        }

        if (!isNaN(spots[i].longitude)) {
            if (i == 0) {
                maxLng = Number(spots[i].longitude);
                minLng = Number(spots[i].longitude);
            } else {
                if (Number(spots[i].longitude) > maxLng) {
                    maxLng = Number(spots[i].longitude);
                }
                if (Number(spots[i].longitude) < minLng) {
                    minLng = Number(spots[i].longitude);
                }
            }
        }

    }

    var lat = (minLat + ((maxLat - minLat) / 2));
    var lng = (minLng + ((maxLng - minLng) / 2));

    return [lat, lng];

}

// Función inicializar el mapa con zoom y posiciones de los marcadores
initMap = function (mZoom, spots) {

    var center = mapCenter(spots);

    // Inicializamos Mapa
    var map = new google.maps.Map(
        document.getElementById('map'),
        {
            zoom: mZoom,
            center: new google.maps.LatLng(center[0], center[1])
        }
    );

    var infowindow = new google.maps.InfoWindow();
    var marker;

    // Recorremos todos los spots a representar
    for (var i = 0; i < spots.length; i++) {

        // Creamos infowindow
        var contentString = '<div id="content"><h6 id="firstHeading" class="firstHeading"><a href="forecast.html?id=' + spots[i].idForecast + '">' + spots[i].name + '</a></h6></div>';

        // Añadimos marcador
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(spots[i].latitude, spots[i].longitude),
            map: map,
            title: spots[i].name
        });

        // Añadimos infowindow
        google.maps.event.addListener(marker, 'click', (function (marker, contentString, infowindow) {
            return function () {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
            }
        })(marker, contentString, infowindow));

    }

}

// Función para establecer cookies en el navegador
setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Función para obtener cookies del navegador
getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Función para eliminar cookies del navegador
delCookie = function (cname) {
    document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
}

// Función para configurar la barra de navegación en función de la página y del estado del usuario
navConfig = function (page, msg) {

    // Comprobamos estado del usuario
    if (getCookie("NAONDA-TOKEN") == '') {
        // Usuario anónimo
        $('#nav-home').show();
        $('#nav-forecast').hide();
        $('#nav-historic').hide();
        $('#nav-spot').hide();
        $('#nav-profile').hide();
        $('#nav-register').show();
        $('#nav-login').show();
        $('#nav-logout').hide();
    } else {
        // Usuario logado
        if (getCookie("NAONDA-USER") == 1) {
            // Usuario administrdor
            $('#nav-home').show();
            $('#nav-forecast').hide();
            $('#nav-historic').show();
            $('#nav-spot').hide();
            $('#nav-profile').show();
            $('#nav-register').hide();
            $('#nav-login').hide();
            $('#nav-logout').show();
        } else {
            // Usuario normal
            $('#nav-home').show();
            $('#nav-forecast').hide();
            $('#nav-historic').show();
            $('#nav-spot').hide();
            $('#nav-profile').show();
            $('#nav-register').hide();
            $('#nav-login').hide();
            $('#nav-logout').show();
        }
    }

    // Establecemos la página activa
    $('#nav-home').removeClass("active");
    $('#nav-forecast').removeClass("active");
    $('#nav-historic').removeClass("active");
    $('#nav-spot').removeClass("active");
    $('#nav-profile').removeClass("active");
    $('#nav-register').removeClass("active");
    $('#nav-login').removeClass("active");
    $('#nav-logout').removeClass("active");

    switch (page) {
        case "HOME":
            $('#nav-home').addClass("active");
            $('#alert-user').hide();
            if (getCookie("NAONDA-MSG") != '') {
                $('#alert-user > span').html(getCookie("NAONDA-MSG"));
                $('#alert-user').fadeIn(1000);
                delCookie("NAONDA-MSG");
            }
            break;
        case "FORECAST":
            $('#nav-forecast').show().addClass("active");
            break;
        case "HISTORIC":
            $('#nav-historic').addClass("active");
            break;
        case "SPOT":
            $('#nav-spot').show().addClass("active");
            break;
        case "PROFILE":
            $('#nav-profile').addClass("active");
            break;
        case "REGISTER":
            $('#nav-register').addClass("active");
            break;
        case "LOGIN":
            $('#nav-login').addClass("active");
            break;
        case "LOGOUT":
            $('#nav-logout').addClass("active");
            break;

    }

    // Añadimos listener a los diferentes opciones de la barra de navegación
    $('#nav-home').click(function () { redirect("HOME"); });
    $('#nav-forecast').click(function () { redirect("FORECAST"); });
    $('#nav-historic').click(function () { redirect("HISTORIC"); });
    $('#nav-spot').click(function () { redirect("SPOT"); });
    $('#nav-profile').click(function () { redirect("PROFILE"); });
    $('#nav-register').click(function () { redirect("REGISTER"); });
    $('#nav-login').click(function () { redirect("LOGIN"); });
    $('#nav-logout').click(function () { redirect("LOGOUT"); });

}

// Función para redireccionar a otra página
redirect = function (page, id) {

    var pathname = "/naonda/index.html";

    switch (page) {
        case "HOME":
            pathname = "/naonda/index.html";
            break;
        case "FORECAST":
            if (id != null) {
                pathname = "/naonda/forecast.html?id=" + id;
            } else {
                pathname = "/naonda/forecast.html";
            }
            break;
        case "HISTORIC":
            pathname = "/naonda/historic.html";
            break;
        case "SPOT":
            pathname = "/naonda/spot.html";
            break;
        case "PROFILE":
            pathname = "/naonda/profile.html";
            break;
        case "REGISTER":
            pathname = "/naonda/register.html";
            break;
        case "LOGIN":
            pathname = "/naonda/login.html";
            break;
        case "LOGOUT":
            delCookie("NAONDA-TOKEN");
            delCookie("NAONDA-USER");
            delCookie("NAONDA-NAME");
            redirect("HOME");
            break;

    }

    $(location).attr("href", document.location.origin + pathname);

}

// Función para obtener el día de la semana
weekDay = function (weekDay) {
    switch (weekDay) {
        case 0:
            return "Domingo";
        case 1:
            return "Lunes";
        case 2:
            return "Martes"
        case 3:
            return "Miércoles"
        case 4:
            return "Jueves"
        case 5:
            return "Viernes"
        case 6:
            return "Sábado"
    }
}

// Función para obtener los números en formato de dos dígitos
formatNumber = function (num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return '' + num;
    }
}

// Función para obtener el nombre del mes
month = function (num) {
    switch (num) {
        case 0:
            return "Enero";
        case 1:
            return "Febrero";
        case 2:
            return "Marzo";
        case 3:
            return "Abril";
        case 4:
            return "Mayo";
        case 5:
            return "Junio";
        case 6:
            return "Julio";
        case 7:
            return "Agosto";
        case 8:
            return "Septiembre";
        case 9:
            return "Octubre";
        case 10:
            return "Noviembre";
        case 11:
            return "Diciembre";
    }
}

// Función para obtener la hora 0-12 AM/PM
hour = function (num) {
    if (num == 0) {
        return "12AM";
    } else if (num < 12) {
        return num + "AM";
    } else {
        if (num == 12) {
            return num + "PM";
        } else {
            return (num - 12) + "PM";
        }
    }
}