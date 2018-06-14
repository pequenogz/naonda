<?php

require_once "Data/Manager.php";

/**
 * Clase para gestionar los usuarios
 */
class User
{
    public static function get($url)
    {

    }

    public static function post($url)
    {
        if (isset($url[0])) {
            switch ($url[0]) {
                case "register":
                    return self::register();
                    break;
                case "login":
                    return self::login();
                    break;
                case "combo-level":
                    return self::level();
                    break;
                case "profile":
                    return self::profile();
                    break;
                case "modify":
                    return self::modify();
                    break;
                case "rate-forecast":
                    return self::rate();
                    break;
                case "historic":
                    return self::historic();
                    break;
                default:
                    throw new ApiError(
                        404,
                        0,
                        "El recurso solicitado no se ha nombrado correctamente.",
                        $_SERVER['HTTP_HOST'],
                        "Resource $_SERVER[REQUEST_URI] is not subject to results."
                    );
            }
        } else {
            throw new ApiError(
                404,
                0,
                "El recurso solicitado no se ha nombrado correctamente.",
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

    // Función para comprobar que el token del usuario es válido
    public static function authUser()
    {
        // Obtenemos cabeceras
        $headers = apache_request_headers();

        if (isset($headers['authorization'])) {
            // Obtenemos Token
            $token = $headers['authorization'];
            // Verificacmos Token
            $rs = self::findUserByToken($token);
            if ($rs != null) {
                return $rs;
            } else {
                throw new ApiError(
                    400,
                    0,
                    "Acceso denegado.",
                    $_SERVER['HTTP_HOST'],
                    "User with invalid token."
                );
            }
        } else {
            throw new ApiError(
                400,
                0,
                "Acceso denegado.",
                $_SERVER['HTTP_HOST'],
                "User without token."
            );
        }
    }

    // Función para comprobar que el token del administrador es válido
    public static function authAdmin()
    {
        // Obtenemos cabeceras
        $headers = apache_request_headers();

        if (isset($headers['authorization'])) {
            // Obtenemos Token
            $token = $headers['authorization'];
            // Verificacmos Token
            $rs = self::findUserByToken($token);
            if ($rs != null) {
                if ($rs['id_role'] == 1) {
                    return $rs;
                } else {
                    throw new ApiError(
                        400,
                        0,
                        "Acceso denegado. Sólo con permisos de Administrador.",
                        $_SERVER['HTTP_HOST'],
                        "User with invalid token."
                    );
                }
            } else {
                throw new ApiError(
                    400,
                    0,
                    "Acceso denegado.",
                    $_SERVER['HTTP_HOST'],
                    "User with invalid token."
                );
            }
        } else {
            throw new ApiError(
                400,
                0,
                "Acceso denegado.",
                $_SERVER['HTTP_HOST'],
                "User without token."
            );
        }
    }

    // Función para realizar el registro usuario
    private static function register()
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
        if (isset($params['user_name']) && isset($params['mail']) && isset($params['pass'])) {
            // Insertamos usuarios
            $rs = self::insert($params);
            if ($rs) {
                return self::login();
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en el servidor. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "Error on insert user in the database."
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

    // Función para realizar el login usuario
    private static function login()
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
        if (isset($params['mail']) && isset($params['pass'])) {

            // Obtenemos los parámetros
            $mail = $params['mail'];
            $pass = $params['pass'];

            try {
                $pdo = Manager::get()->getCnn();
                $qry = "SELECT u.user_name, u.name, u.surname, u.mail, u.level, u.img_name, u.img, u.password, u.token, u.id_role FROM naonda.user u WHERE u.mail = ?";
                $stc = $pdo->prepare($qry);
                $stc->bindParam(1, $mail);
                if ($stc->execute()) {
                    $user = $stc->fetch(PDO::FETCH_ASSOC);
                    if (password_verify($pass, $user['password'])) {
                        return [
                            "status" => 200,
                            "user_name" => $user['user_name'],
                            "name" => $user['name'],
                            "surname" => $user['surname'],
                            "mail" => $user['mail'],
                            "level" => $user['level'],
                            "img_name" => $user['img_name'],
                            "img" => $user['img'],
                            "token" => $user['token'],
                            "user" => $user['id_role']
                        ];
                    } else {
                        throw new ApiError(
                            400,
                            0,
                            "E-Mail o contraseña incorrecta.",
                            $_SERVER['HTTP_HOST'],
                            "Incorrect mail or password for: " . $mail
                        );
                    }
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

    // Función para obtener los valores del combo de nivel
    private static function level()
    {

        if (self::authUser() != null) {

            try {
                $pdo = Manager::get()->getCnn();
                $qry = "SELECT u.id, u.level, u.description FROM naonda.user_level u";
                $stc = $pdo->prepare($qry);
                if ($stc->execute()) {
                    return ["level" => $stc->fetchAll(PDO::FETCH_ASSOC)];
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

    // Función para obtener el perfil del usuario
    private function profile()
    {
        $user = self::authUser();
        if ($user != null) {
            return ["user" => $user];
        }
    }

    // Función para modificar el perfil del usuario
    private static function modify()
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
        if (isset($params['user_name']) && isset($params['name']) && isset($params['surname']) && isset($params['mail']) && isset($params['level']) && isset($params['img_name']) && isset($params['img']) && isset($params['pass'])) {
            // Actualizamos usuario
            $rs = self::update($params);
            if ($rs) {
                return self::profile();
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en el servidor. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "Error on insert user in the database."
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

    // Función para registrar valoración de una previsión
    private static function rate()
    {
        // Obtenemos parámetros
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
        
        // Comprobamos usuario válido
        $rs = self::authUser();
        if ($rs != null) {
        
            // Comprobamos los parámetros
            if (isset($params['id_forecast']) && isset($params['local_timestamp']) && isset($params['min_breaking_height']) && isset($params['max_breaking_height']) &&
                isset($params['wave_1_height']) && isset($params['wave_1_period']) && isset($params['wave_1_direction']) &&
                isset($params['wave_2_height']) && isset($params['wave_2_period']) && isset($params['wave_2_direction']) &&
                isset($params['wave_3_height']) && isset($params['wave_3_period']) && isset($params['wave_3_direction']) &&
                isset($params['wind_speed']) && isset($params['wind_gusts']) && isset($params['wind_direction']) &&
                isset($params['weather']) && isset($params['temperature']) && isset($params['rate'])) {

                $id_user = $rs['id'];
                $id_forecast = $params['id_forecast'];
                $local_timestamp = $params['local_timestamp'];
                $min_breaking_height = $params['min_breaking_height'];
                $max_breaking_height = $params['max_breaking_height'];
                $wave_1_height = $params['wave_1_height'] == 'NULL' ? null : $params['wave_1_height'];
                $wave_1_period = $params['wave_1_period'] == 'NULL' ? null : $params['wave_1_period'];
                $wave_1_direction = $params['wave_1_direction'] == 'NULL' ? null : $params['wave_1_direction'];
                $wave_2_height = $params['wave_2_height'] == 'NULL' ? null : $params['wave_2_height'];
                $wave_2_period = $params['wave_2_period'] == 'NULL' ? null : $params['wave_2_period'];
                $wave_2_direction = $params['wave_2_direction'] == 'NULL' ? null : $params['wave_2_direction'];
                $wave_3_height = $params['wave_3_height'] == 'NULL' ? null : $params['wave_3_height'];
                $wave_3_period = $params['wave_3_period'] == 'NULL' ? null : $params['wave_3_period'];
                $wave_3_direction = $params['wave_3_direction'] == 'NULL' ? null : $params['wave_3_direction'];
                $wind_speed = $params['wind_speed'];
                $wind_gusts = $params['wind_gusts'];
                $wind_direction = $params['wind_direction'];
                $weather = $params['weather'];
                $temperature = $params['temperature'];
                $rate = $params['rate'];

                try {
                    $pdo = Manager::get()->getCnn();
                    $qry = "REPLACE INTO user_historic (
                                id_user
                            ,	id_forecast
                            ,	local_timestamp
                            ,	min_breaking_height
                            ,	max_breaking_height
                            ,	wave_1_height
                            ,	wave_1_period
                            ,	wave_1_direction
                            ,	wave_2_height
                            ,	wave_2_period
                            ,	wave_2_direction
                            ,	wave_3_height
                            ,	wave_3_period
                            ,	wave_3_direction
                            ,	wind_speed
                            ,	wind_gusts
                            ,	wind_direction
                            ,	weather
                            ,	temperature
                            ,   rate)
                            
                            VALUES (
                                ?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,	?
                            ,   ?)
                            ";
                    $stc = $pdo->prepare($qry);
                    $stc->bindParam(1, $id_user);
                    $stc->bindParam(2, $id_forecast);
                    $stc->bindParam(3, $local_timestamp);
                    $stc->bindParam(4, $min_breaking_height);
                    $stc->bindParam(5, $max_breaking_height);
                    $stc->bindParam(6, $wave_1_height);
                    $stc->bindParam(7, $wave_1_period);
                    $stc->bindParam(8, $wave_1_direction);
                    $stc->bindParam(9, $wave_2_height);
                    $stc->bindParam(10, $wave_2_period);
                    $stc->bindParam(11, $wave_2_direction);
                    $stc->bindParam(12, $wave_3_height);
                    $stc->bindParam(13, $wave_3_period);
                    $stc->bindParam(14, $wave_3_direction);
                    $stc->bindParam(15, $wind_speed);
                    $stc->bindParam(16, $wind_gusts);
                    $stc->bindParam(17, $wind_direction);
                    $stc->bindParam(18, $weather);
                    $stc->bindParam(19, $temperature);
                    $stc->bindParam(20, $rate);
                    return $stc->execute();
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

        } else {
            throw new ApiError(
                400,
                0,
                "Acceso denegado.",
                $_SERVER['HTTP_HOST'],
                "Unauthorized access."
            );
        }
    }

    // Función para obtener el histórico de valoraciones del usuario
    private static function historic()
    {
        // Validamos usuario
        $rs = self::authUser();
        if ($rs != null) {

            try {
                $pdo = Manager::get()->getCnn();
                $qry = "SELECT
                            CONCAT(s.name, ' (', r.region, ')') AS spot
                        ,	h.rate
                        ,	h.local_timestamp
                        ,	h.min_breaking_height
                        ,	h.max_breaking_height
                        ,	h.wave_1_height
                        ,	h.wave_1_period
                        ,	h.wave_1_direction
                        ,	h.wave_2_height
                        ,	h.wave_2_period
                        ,	h.wave_2_direction
                        ,	h.wave_3_height
                        ,	h.wave_3_period
                        ,	h.wave_3_direction
                        ,	h.wind_speed
                        ,	h.wind_gusts
                        ,	h.wind_direction
                        ,	h.weather
                        ,	h.temperature
                        
                        FROM
                            user_historic h
                            LEFT JOIN spot s ON h.id_forecast = s.idForecast
                            LEFT JOIN spot_region r ON s.id_region = r.id
                        
                        WHERE
                            h.id_user = ?
                        
                        ORDER BY
                            h.local_timestamp DESC";
                $stc = $pdo->prepare($qry);
                $stc->bindParam(1, $rs['id']);
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
                "Acceso denegado.",
                $_SERVER['HTTP_HOST'],
                "Unauthorized access."
            );
        }

    }

    // Función para añadir usuario
    private static function insert($params)
    {
        // Obtenemos datos de usuario
        $name = $params['user_name'];
        $mail = $params['mail'];
        $pass = $params['pass'];

        // Comprobams que el nombre no esté en uso
        $rs = self::findUserByName($name);
        if ($rs != null) {
            throw new ApiError(
                400,
                0,
                "Nonbre no válido. Ya existe un usuario con el mismo nombre.",
                $_SERVER['HTTP_HOST'],
                "A user with the name already exists: " . $name
            );
        }

        // Comprobamos que el mail no esté en uso
        $rs = self::findUserByMail($mail);
        if ($rs != null) {
            throw new ApiError(
                400,
                0,
                "E-Mail no válido. Ya existe un usuario con el mismo E-Mail.",
                $_SERVER['HTTP_HOST'],
                "There is already a user with the mail: " . $mail
            );
        }

        // Encriptamos el password
        $hashPass = password_hash($pass, PASSWORD_DEFAULT);

        // Generamos token
        while (true) {
            $token = uniqid(rand(), true);
            // Comprobamos que no esté en uso
            $rs = self::findUserByToken($token);
            if ($rs == null) {
                break;
            }
        }

        // Insertamos usuario
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "INSERT INTO naonda.user (user_name, mail, password, token) VALUES (?, ?, ?, ?)";
            $stc = $pdo->prepare($qry);
            $stc->bindParam(1, $name);
            $stc->bindParam(2, $mail);
            $stc->bindParam(3, $hashPass);
            $stc->bindParam(4, $token);
            return $stc->execute();
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

    // Función para actualizar perfil de usuario
    private static function update($params)
    {
        // Obtenemos datos del usuario
        $nick = $params['user_name'];
        $name = $params['name'];
        $surn = $params['surname'];
        $mail = $params['mail'];
        $levl = $params['level'];
        $imgn = $params['img_name'];
        $imgb = $params['img'];
        $pass = $params['pass'];

        // Validamos token
        $rs = self::authUser();
        if ($rs != null) {

            if (strtolower($nick) != strtolower($rs['user_name'])) {
                // Comprobamos que el nombre no esté en uso
                $rsn = self::findUserByName($nick);
                if ($rsn != null) {
                    throw new ApiError(
                        400,
                        0,
                        "Nonbre no válido. Ya existe un usuario con el mismo nombre.",
                        $_SERVER['HTTP_HOST'],
                        "A user with the name already exists: " . $name
                    );
                }
            }

            if (strtolower($mail) != strtolower($rs['mail'])) {
                // Comprobamos que el mail no esté en uso
                $rsm = self::findUserByMail($mail);
                if ($rsm != null) {
                    throw new ApiError(
                        400,
                        0,
                        "E-Mail no válido. Ya existe un usuario con el mismo E-Mail.",
                        $_SERVER['HTTP_HOST'],
                        "There is already a user with the mail: " . $mail
                    );
                }
            }

            // Encriptamos paswword
            if (!empty($pass)) {
                $hashPass = password_hash($pass, PASSWORD_DEFAULT);
            }

            // Actualizamos usuario
            try {
                $pdo = Manager::get()->getCnn();
                if (empty($pass)) {
                    $qry = "UPDATE naonda.user u SET u.user_name = ?, u.name = ?, u.surname = ?, u.mail = ?, u.level = ?, u.img_name = ?, u.img = ? WHERE u.token = ?";
                } else {
                    $qry = "UPDATE naonda.user u SET u.user_name = ?, u.name = ?, u.surname = ?, u.mail = ?, u.level = ?, u.img_name = ?, u.img = ?, u.password = ? WHERE u.token = ?";
                }

                $stc = $pdo->prepare($qry);
                $stc->bindParam(1, $nick);
                $stc->bindParam(2, $name);
                $stc->bindParam(3, $surn);
                $stc->bindParam(4, $mail);
                $stc->bindParam(5, $levl);
                $stc->bindParam(6, $imgn);
                $stc->bindParam(7, $imgb);
                if (empty($pass)) {
                    $stc->bindParam(8, $rs['token']);
                } else {
                    $stc->bindParam(8, $hashPass);
                    $stc->bindParam(9, $rs['token']);
                }
                return $stc->execute();
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
                "Acceso denegado.",
                $_SERVER['HTTP_HOST'],
                "Unauthorized access."
            );
        }
    }

    // Función para buscar usuario por nombre
    private static function findUserByName($name)
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT * FROM naonda.user WHERE user_name = ?";
            $stc = $pdo->prepare($qry);
            $stc->bindParam(1, $name);
            if ($stc->execute()) {
                $rs = $stc->fetch(PDO::FETCH_ASSOC);
                if (strtolower($name) == strtolower($rs['user_name'])) {
                    return $rs;
                } else {
                    return null;
                }
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $pdo->errorInfo()[2]
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

    // Función para buscar usuario por mail
    private static function findUserByMail($mail)
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT * FROM naonda.user WHERE mail = ?";
            $stc = $pdo->prepare($qry);
            $stc->bindParam(1, $mail);
            if ($stc->execute()) {
                $rs = $stc->fetch(PDO::FETCH_ASSOC);
                if (strtolower($mail) == strtolower($rs['mail'])) {
                    return $rs;
                } else {
                    return null;
                }
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $pdo->errorInfo()[2]
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

    // Función para buscar usuario por token
    private static function findUserByToken($token)
    {
        try {
            $pdo = Manager::get()->getCnn();
            $qry = "SELECT * FROM naonda.user WHERE token = ?";
            $stc = $pdo->prepare($qry);
            $stc->bindParam(1, $token);
            if ($stc->execute()) {
                $rs = $stc->fetch(PDO::FETCH_ASSOC);
                if ($token == $rs['token']) {
                    return $rs;
                } else {
                    return null;
                }
            } else {
                throw new ApiError(
                    500,
                    0,
                    "Error en la BBDD. Contacte con el administrador.",
                    $_SERVER['HTTP_HOST'],
                    "MySQL Error: " . $pdo->errorInfo()[2]
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

?>