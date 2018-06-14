<?php

require_once "View.php";

/**
 * Clase para gestionar las respuestas en formato JSON
 */
class Json extends View
{

    public function render($body)
    {

        // Estado de la respuesta
        if (isset($body["status"])) {
            http_response_code($body["status"]);
        }

        // Cabecera
        header("Content-Type: application/json; charset=utf8");

        // JSON encode
        $resJSON = json_encode($body, JSON_PRETTY_PRINT, JSON_UNESCAPED_UNICODE);

        // Manejador de excepciones
        if (json_last_error() != JSON_ERROR_NONE) {
            
            $error = new ApiError(
                500,
                0,
                "Error en el servidor. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "Parse JSON error: " . json_last_error_msg()
            );

            throw $error;

        }

        echo $resJSON;

        exit;

    }

}

?>