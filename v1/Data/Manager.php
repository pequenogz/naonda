<?php

require_once "Config.php";

/**
 * Clase para manejar la conexión con la base de datos
 */
class Manager
{

    private static $manager = null;
    private static $pdo;

    final private function __construct()
    {

        try {

            // Crear conexión
            self::getCnn();

        } catch (PDOException $e) {

            // API Error
            throw new ApiError(
                500,
                0,
                "Error de conexión con la Base de Datos.",
                $_SERVER['HTTP_HOST'],
                "DB connection error: " . $e->getMessage()
            );

        }

    }

    public static function get()
    {

        if (self::$manager == null) {

            self::$manager = new self();

        }

        return self::$manager;

    }

    public function getCnn()
    {

        if (self::$pdo == null) {

            // PDO Params
            $dns = sprintf("mysql:dbname=%s; host=%", DB_NAME, DB_HOST);
            $usr = DB_USER;
            $pss = DB_PASS;
            $opt = array(
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            );

            // Nueva conexión
            self::$pdo = new PDO($dns, $usr, $pss, $opt);

        }

        return self::$pdo;

    }

    final protected function __clone()
    {

    }

    function __destruct()
    {
        
        self::$pdo = null;

    }

}

?>