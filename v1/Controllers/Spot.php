<?php

require_once "Data/Manager.php";

/**
 * Clase para gestionar las playas
 */
class Spot
{
    public static function get($url)
    {

    }

    public static function post($url)
    {
        if (isset($url[0])) {
            switch ($url[0]) {
                case "save":
                    return self::saveSpot();
                    break;
                case "edit":
                    return self::editSpot();
                    break;
                case "delete":
                    return self::delSpot();
                    break;
                case "combo-region":
                    return self::region();
                    break;
                case "combo-location":
                    return self::location();
                    break;
                case "combo-time":
                    return self::time();
                    break;
                case "combo-bottom":
                    return self::bottom();
                    break;
                case "combo-tide":
                    return self::tide();
                    break;
                case "combo-water":
                    return self::water();
                    break;
                case "combo-wave-height":
                    return self::height();
                    break;
                case "combo-wave-length":
                    return self::length();
                    break;
                case "combo-wave-direction":
                    return self::direction();
                    break;
                case "combo-wave-description":
                    return self::description();
                    break;
                case "combo-direction":
                    return self::coordinates();
                    break;
                case "combo-swell-strength":
                    return self::strength();
                    break;
                case "combo-localism":
                    return self::localism();
                    break;
                case "combo-conflict":
                    return self::conflict();
                    break;
                case "combo-spot":
                    return self::spots();
                    break;
                case "table-spot":
                    return self::tblSpots();
                    break;
                case "table-spot-admin":
                    return self::tblSpotsAdmin();
                    break;
                case "spot-map":
                    return self::spotMap();
                    break;
                case "spot-description":
                    return self::spotDescription();
                    break;
                case "forecast":
                    return self::forecast();
                    break;
                default:
                    throw new ApiError(
                        404,
                        0,
                        "The resource is badly referenced.",
                        $_SERVER['HTTP_HOST'],
                        "Resource $_SERVER[REQUEST_URI] is not subject to results."
                    );
            }
        } else {
            throw new ApiError(
                404,
                0,
                "The resource is badly referenced.",
                $_SERVER['HTTP_HOST'],
                "Resource $_SERVER[REQUEST_URI] is not subject to results"
            );
        }
    }

    public static function put($url)
    {

    }

    public static function delete($url)
    {

    }

    // Función para el combo de provincias
    private static function region()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT r.id, r.region FROM naonda.spot_region r";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["region" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para el combo de ubicaciones
    private static function location()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT l.id, l.location FROM naonda.spot_location l ORDER BY l.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["location" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para los checks de épocas
    private static function time()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT t.id, t.time FROM naonda.spot_time t ORDER BY t.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["time" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para los checks de fondo
    private static function bottom()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT b.id, b.bottom FROM naonda.spot_bottom b ORDER BY b.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["bottom" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para los checks de marea
    private static function tide()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT t.id, t.tide FROM naonda.spot_tide t ORDER BY t.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["tide" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para el combo de calidad del agua
    private static function water()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT w.id, w.water FROM naonda.spot_water w ORDER BY w.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["water" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para los checks de tamaño de ola
    private static function height()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT h.id, h.height FROM naonda.spot_wave_height h ORDER BY h.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["height" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para los checks de largo de la ola
    private static function length()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT l.id, l.length FROM naonda.spot_wave_length l ORDER BY l.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["length" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para los checks de dirección de la ola
    private static function direction()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT d.id, d.direction FROM naonda.spot_wave_direction d ORDER BY d.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["direction" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para los checks de descrioción de la ola
    private static function description()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT d.id, d.description FROM naonda.spot_wave_decription d ORDER BY d.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["description" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para las direcciones de coordenadas
    private static function coordinates()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT d.id, d.direction FROM naonda.spot_direction d ORDER BY d.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["direction" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para los checks de la fuerza del swell
    private static function strength()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT s.id, s.strength FROM naonda.spot_swell_strength s ORDER BY s.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["strength" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para el combo de localismo
    private static function localism()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT l.id, l.localism FROM naonda.spot_localism l ORDER BY l.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["localism" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para el combo de conflictividad
    private static function conflict()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT c.id, c.conflict FROM naonda.spot_conflict c ORDER BY c.id";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return ["conflict" => $stc->fetchAll(PDO::FETCH_ASSOC)];
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función para el combo de spots a partir de la región
    private static function spots()
    {
        // Obtenemos los parámetros
        $params = json_decode(file_get_contents('php://input'), true);

        // Comprobar errores en JSON
        if (json_last_error() != JSON_ERROR_NONE) {
            throw new ApiError(
                500,
                0,
                "Error en el servidor. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "Parse JSON error: " . json_last_error_msg()
            );
        }

        // Comprobamos los parámetros
        if (isset($params['id_region'])) {

            // Obtenemos los datos de los parámetros
            $id_region = $params['id_region'];

            try {
                $pdo = Manager::get()->getCnn();
                if ($id_region == 0) {
                    $qry = "SELECT s.id, s.name, s.latitude, s.longitude, s.rating, s.idForecast FROM naonda.spot s WHERE s.active = 1 ORDER BY s.name;";
                } else {
                    $qry = "SELECT s.id, s.name, s.latitude, s.longitude, s.rating, s.idForecast FROM naonda.spot s WHERE s.id_region = ? AND s.active = 1 ORDER BY s.name;";
                }
                $stc = $pdo->prepare($qry);
                if ($id_region != 0) {
                    $stc->bindParam(1, $id_region);
                }
                if ($stc->execute()) {
                    return ["spot" => $stc->fetchAll(PDO::FETCH_ASSOC)];
                } else {
                    throw new ApiError(
                        500,
                        0,
                        "Error en la BBDD. Contacte con el administrador.",
                        $_SERVER['HTTP_HOST'],
                        "MySQL Error: " . $e->getMessage()
                    );
                }
            } catch (PDOException $e) {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } else {
            throw new ApiError(
                400,
                0,
                "Verifique que ha indicado todos los datos necesarios.",
                $_SERVER['HTTP_HOST'],
                "One or more parameters are not defined."
            );
        }
    }

    // Función para los datos de una playa para el mapa
    private static function spotMap()
    {
        // Obtenemos los parámetros
        $params = json_decode(file_get_contents('php://input'), true);

        // Comprobar errores en JSON
        if (json_last_error() != JSON_ERROR_NONE) {
            throw new ApiError(
                500,
                0,
                "Error en el servidor. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "Parse JSON error: " . json_last_error_msg()
            );
        }

        // Comprobamos los parámetros
        if (isset($params['idForecast'])) {

            // Obtenemos los datos de los parámetros
            $idForecast = $params['idForecast'];

            try {
                $pdo = Manager::get()->getCnn();
                $qry = "SELECT s.id, s.name, s.latitude, s.longitude, s.rating, s.idForecast FROM naonda.spot s WHERE s.active = 1 AND s.idForecast = ? ORDER BY s.name;";
                $stc = $pdo->prepare($qry);
                $stc->bindParam(1, $idForecast);
                if ($stc->execute()) {
                    return ["spot" => $stc->fetchAll(PDO::FETCH_ASSOC)];
                } else {
                    throw new ApiError(
                        500,
                        0,
                        "Error en la BBDD. Contacte con el administrador.",
                        $_SERVER['HTTP_HOST'],
                        "MySQL Error: " . $e->getMessage()
                    );
                }
            } catch (PDOException $e) {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } else {
            throw new ApiError(
                400,
                0,
                "Verifique que ha indicado todos los datos necesarios.",
                $_SERVER['HTTP_HOST'],
                "One or more parameters are not defined."
            );
        }
    }

    // Función para obtener todos los datos descriptivos de una playa
    private static function spotDescription()
    {
        // Obtenemos los parámetros
        $params = json_decode(file_get_contents('php://input'), true);

        // Comprobar errores en JSON
        if (json_last_error() != JSON_ERROR_NONE) {
            throw new ApiError(
                500,
                0,
                "Error en el servidor. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "Parse JSON error: " . json_last_error_msg()
            );
        }

        // Comprobamos los parámetros
        if (isset($params['idForecast'])) {

            // Obtenemos los datos de los parámetros
            $idForecast = $params['idForecast'];

            try {
                $pdo = Manager::get()->getCnn();
                $qry = "SELECT * FROM naonda.vst_spots_description WHERE idForecast = ?";
                $stc = $pdo->prepare($qry);
                $stc->bindParam(1, $idForecast);
                if ($stc->execute()) {
                    return $stc->fetchAll(PDO::FETCH_ASSOC);
                } else {
                    throw new ApiError(
                        500,
                        0,
                        "Error en la BBDD. Contacte con el administrador.",
                        $_SERVER['HTTP_HOST'],
                        "MySQL Error: " . $e->getMessage()
                    );
                }
            } catch (PDOException $e) {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } else {
            throw new ApiError(
                400,
                0,
                "Verifique que ha indicado todos los datos necesarios.",
                $_SERVER['HTTP_HOST'],
                "One or more parameters are not defined."
            );
        }
    }

    // Función apa on¡btener las playas para la tabla de inicio
    private static function tblSpots()
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT r.region, s.name, s.rating, s.idForecast FROM naonda.spot s INNER JOIN naonda.spot_region r ON s.id_region = r.id WHERE s.active = 1";
            $stc = $pdo->prepare($qry);
            if ($stc->execute()) {
                return $stc->fetchAll(PDO::FETCH_NUM);
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        } catch (PDOException $e) {
            throw new ApiError(
                500,
                0,
                "Error en la BBDD. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "MySQL Error: " . $e->getMessage()
            );
        }
    }

    // Función apa on¡btener las playas para la tabla de inicio con perfil administrador
    private static function tblSpotsAdmin()
    {
        if (User::authAdmin() != null) {
            try {
                $pdo = Manager::get()->getCnn();
                $qry = "SELECT r.region, s.name, s.rating, IF(s.active = 1, 'SI', 'NO'), s.idForecast, s.id, s.id FROM naonda.spot s LEFT JOIN naonda.spot_region r ON s.id_region = r.id";
                $stc = $pdo->prepare($qry);
                if ($stc->execute()) {
                    return $stc->fetchAll(PDO::FETCH_NUM);
                } else {
                    throw new ApiError(
                        500,
                        0,
                        "Error en la BBDD. Contacte con el administrador.",
                        $_SERVER['HTTP_HOST'],
                        "MySQL Error: " . $e->getMessage()
                    );
                }
            } catch (PDOException $e) {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }
        }
    }

    // Función para obtener la previsión de una playa
    private static function forecast()
    {
        // Obtenemos los parámetros
        $params = json_decode(file_get_contents('php://input'), true);

        // Comprobar errores en JSON
        if (json_last_error() != JSON_ERROR_NONE) {
            throw new ApiError(
                500,
                0,
                "Error en el servidor. Contacte con el administrador.",
                $_SERVER['HTTP_HOST'],
                "Parse JSON error: " . json_last_error_msg()
            );
        }

        // Comprobamos los parámetros
        if (isset($params['idForecast'])) {

            // Obtenemos los datos de los parámetros
            $idForecast = $params['idForecast'];

            $curl = curl_init();

            curl_setopt_array($curl, array(
                CURLOPT_URL => "http://magicseaweed.com/api/48b0ffaad52d1cdc4f9dfeba72c01815/forecast/?spot_id=" . $idForecast . "&units=eu",
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => "",
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "GET",
            ));

            $response = curl_exec($curl);
            $err = curl_error($curl);

            curl_close($curl);

            if ($err) {
                throw new ApiError(
                    500,
                    0,
                    "Error al consultar la previsión.",
                    $_SERVER['HTTP_HOST'],
                    "cURL Error #:" . $err
                );
            } else {
                return json_decode($response, true);
            }

        } else {
            throw new ApiError(
                400,
                0,
                "Verifique que ha indicado todos los datos necesarios.",
                $_SERVER['HTTP_HOST'],
                "One or more parameters are not defined."
            );
        }
    }

    // Función para obtener los datos del formulario de una playa
    private static function editSpot()
    {
        if (User::authAdmin() != null) {

            // Obtenemos los parámetros
            $params = json_decode(file_get_contents('php://input'), true);

            // Comprobar errores en JSON
            if (json_last_error() != JSON_ERROR_NONE) {
                throw new ApiError(
                    500,
                    0,
                    "Error en el servidor. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "Parse JSON error: " . json_last_error_msg()
                );
            }

            // Comprobamos los parámetros
            if (isset($params['id']) && isset($params['data'])) {

                // Obtenemos los datos de los parámetros
                $id = $params['id'];
                $data = $params['data'];

                try {
                    $pdo = Manager::get()->getCnn();
                    if ($data == 'time') {
                        $qry = "SELECT id_time AS time FROM naonda.spot_rel_time WHERE id_spot = ?";
                    } else if ($data == 'bottom') {
                        $qry = "SELECT id_bottom AS bottom FROM naonda.spot_rel_bottom WHERE id_spot = ?";
                    } else if ($data == 'tide') {
                        $qry = "SELECT id_tide AS tide FROM naonda.spot_rel_tide WHERE id_spot = ?";
                    } else if ($data == 'wave-heigth') {
                        $qry = "SELECT id_wave AS height FROM naonda.spot_rel_wave_height WHERE id_spot = ?";
                    } else if ($data == 'wave-direction') {
                        $qry = "SELECT id_wave_direction AS wave_direction FROM naonda.spot_rel_wave_direction WHERE id_spot = ?";
                    } else if ($data == 'wave-description') {
                        $qry = "SELECT id_wave_description AS wave_description FROM naonda.spot_rel_wave_description WHERE id_spot = ?";
                    } else if ($data == 'wind-direction') {
                        $qry = "SELECT id_direction AS wind_direction FROM naonda.spot_rel_wind WHERE id_spot = ?";
                    } else if ($data == 'swell-direction') {
                        $qry = "SELECT id_direction AS swell_direction FROM naonda.spot_rel_swell_direction WHERE id_spot = ?";
                    } else {
                        $qry = "SELECT * FROM naonda.vst_spots_edit_main WHERE id = ?";
                    }
                    $stc = $pdo->prepare($qry);
                    $stc->bindParam(1, $id);
                    if ($stc->execute()) {
                        return $stc->fetchAll(PDO::FETCH_ASSOC);
                    } else {
                        throw new ApiError(
                            500,
                            0,
                            "Error en la BBDD. Contacte con el administrador.",
                            $_SERVER['HTTP_HOST'],
                            "MySQL Error: " . $e->getMessage()
                        );
                    }
                } catch (PDOException $e) {
                    throw new ApiError(
                        500,
                        0,
                        "Error en la BBDD. Contacte con el administrador.",
                        $_SERVER['HTTP_HOST'],
                        "MySQL Error: " . $e->getMessage()
                    );
                }
            }
        }
    }

    // Función para guardar o modificar una playa
    private static function saveSpot()
    {

        if (User::authAdmin() != null) {

            // Obtenemos los parámetros
            $params = json_decode(file_get_contents('php://input'), true);

            // Comprobar errores en JSON
            if (json_last_error() != JSON_ERROR_NONE) {
                throw new ApiError(
                    500,
                    0,
                    "Error en el servidor. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "Parse JSON error: " . json_last_error_msg()
                );
            }

            // Comprobamos los parámetros
            if (isset($params['id']) &&
                isset($params['name']) &&
                isset($params['region']) &&
                isset($params['location']) &&
                isset($params['latitude']) &&
                isset($params['longitude']) &&
                isset($params['time']) &&
                isset($params['bottom']) &&
                isset($params['tide']) &&
                isset($params['water']) &&
                isset($params['wave-heigth']) &&
                isset($params['wave-length']) &&
                isset($params['wave-direction']) &&
                isset($params['wave-description']) &&
                isset($params['wind']) &&
                isset($params['strength']) &&
                isset($params['swell']) &&
                isset($params['localism']) &&
                isset($params['conflict']) &&
                isset($params['shower']) &&
                isset($params['parking']) &&
                isset($params['hostelry']) &&
                isset($params['life-guard']) &&
                isset($params['wc']) &&
                isset($params['wifi']) &&
                isset($params['bodyboard']) &&
                isset($params['van']) &&
                isset($params['rating']) &&
                isset($params['forecast']) &&
                isset($params['active']))

            // Obtenemos los datos de los parámetros
            $idSpot = $params['id'];
            $name = $params['name'];
            $region = $params['region'];
            $location = $params['location'];
            $latitude = $params['latitude'];
            $longitude = $params['longitude'];
            $time = $params['time'];
            $bottom = $params['bottom'];
            $tide = $params['tide'];
            $water = $params['water'];
            $height = $params['wave-heigth'];
            $length = $params['wave-length'];
            $waveDirection = $params['wave-direction'];
            $description = $params['wave-description'];
            $wind = $params['wind'];
            $strength = $params['strength'];
            $swell = $params['swell'];
            $localism = $params['localism'];
            $conflict = $params['conflict'];
            $shower = $params['shower'];
            $parking = $params['parking'];
            $hostelry = $params['hostelry'];
            $lifeGuard = $params['life-guard'];
            $wc = $params['wc'];
            $wifi = $params['wifi'];
            $bodyboard = $params['bodyboard'];
            $van = $params['van'];
            $rating = $params['rating'];
            $forecast = $params['forecast'];
            $active = $params['active'];

            try {
                $pdo = Manager::get()->getCnn();
                $qry = "call naonda.prc_spot_save(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $stc = $pdo->prepare($qry);
                $stc->bindParam(1, $idSpot);
                $stc->bindParam(2, $name);
                $stc->bindParam(3, $region);
                $stc->bindParam(4, $location);
                $stc->bindParam(5, $latitude);
                $stc->bindParam(6, $longitude);
                $stc->bindParam(7, $time);
                $stc->bindParam(8, $bottom);
                $stc->bindParam(9, $tide);
                $stc->bindParam(10, $water);
                $stc->bindParam(11, $height);
                $stc->bindParam(12, $length);
                $stc->bindParam(13, $waveDirection);
                $stc->bindParam(14, $description);
                $stc->bindParam(15, $wind);
                $stc->bindParam(16, $strength);
                $stc->bindParam(17, $swell);
                $stc->bindParam(18, $localism);
                $stc->bindParam(19, $conflict);
                $stc->bindParam(20, $shower);
                $stc->bindParam(21, $parking);
                $stc->bindParam(22, $hostelry);
                $stc->bindParam(23, $lifeGuard);
                $stc->bindParam(24, $wc);
                $stc->bindParam(25, $wifi);
                $stc->bindParam(26, $bodyboard);
                $stc->bindParam(27, $van);
                $stc->bindParam(28, $rating);
                $stc->bindParam(29, $forecast);
                $stc->bindParam(30, $active);
                if ($stc->execute()) {
                    return $stc->fetchAll(PDO::FETCH_ASSOC);
                } else {
                    throw new ApiError(
                        500,
                        0,
                        "Error en la BBDD. Contacte con el administrador.",
                        $_SERVER['HTTP_HOST'],
                        "MySQL Error: " . $e->getMessage()
                    );
                }
            } catch (PDOException $e) {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $e->getMessage()
                );
            }

        }

    }

    // Función para eliminar una playa
    private static function delSpot()
    {
        if (User::authAdmin() != null) {

            // Obtenemos los parámetros
            $params = json_decode(file_get_contents('php://input'), true);

            // Comprobar errores en JSON
            if (json_last_error() != JSON_ERROR_NONE) {
                throw new ApiError(
                    500,
                    0,
                    "Error en el servidor. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "Parse JSON error: " . json_last_error_msg()
                );
            }

            // Comprobamos los parámetros
            if (isset($params['id'])) {

                try {
                    $pdo = Manager::get()->getCnn();
                    $qry = "DELETE FROM naonda.spot WHERE id = ?";
                    $stc = $pdo->prepare($qry);
                    $stc->bindParam(1, $params['id']);
                    if ($stc->execute()) {
                        return [
                            "status" => 200,
                            "resultado" => "Eliminado"
                        ];
                    } else {
                        throw new ApiError(
                            500,
                            0,
                            "Error en la BBDD. Contacte con el administrador.",
                            $_SERVER['HTTP_HOST'],
                            "MySQL Error: " . $e->getMessage()
                        );
                    }
                } catch (PDOException $e) {
                    throw new ApiError(
                        500,
                        0,
                        "Error en la BBDD. Contacte con el administrador.",
                        $_SERVER['HTTP_HOST'],
                        "MySQL Error: " . $e->getMessage()
                    );
                }
            }
        }
    }

}
?>