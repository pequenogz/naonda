<?php

require "Response/Json.php";
require "Controllers/ApiError.php";
require "Controllers/User.php";
require "Controllers/Spot.php";

// Inicializamos JSON
$json = new Json();

// Registramos el manejador de excepciones
set_exception_handler(

    function (ApiError $error) use ($json) {

        http_response_code($error->getApiStatus());
        $json->render($error->toArray());

    }

);

// Respuesta si no existe recurso
$noResource = new ApiError(
    404,
    1000,
    "El recurso al que intentas acceder no existe.",
    $_SERVER['HTTP_HOST'],
    "There is no defined resource in: http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"
);

// Obtenemos url
if (isset($_GET['PATH_INFO'])) {
    $url = explode('/', $_GET['PATH_INFO']);
} else {
    throw $noResource;
}

// Obtenemos recurso solicitado
$resource = array_shift($url);

// Creamos array con los recursos válidos
$resources = array("user","spot");

// Comprobamos que el recurso exista
if (!in_array($resource, $resources)) {
    throw $noResource;
}

// Obtenemos el metodo
$method = strtolower($_SERVER['REQUEST_METHOD']);

// Determinamos la acción
switch ($method) {
    case 'get':
    case 'post':
    case 'put':
    case 'delete':

        // Si existe el método
        if (method_exists($resource, $method)) {
            $response = call_user_func(array($resource, $method), $url);
            $json->render($response);
            break;
        }

    default:

        // Método no permitido
        $noMethod = new ApiError(
            405,
            1001,
            "Permiso denegado para la acción solicitada.",
            $_SERVER['HTTP_HOST'],
            "Method not allowed: $_SERVER[REQUEST_METHOD] with resource " . $resource
        );

}

?>