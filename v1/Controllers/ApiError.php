<?php

/**
 * Clase para manejar las excepciones
 */
class ApiError extends Exception
{

    private $apiStatus;
    private $apiCode;
    private $apiMessage;
    private $apiInfo;
    private $apiDeveloper;

    public function __construct($apiStatus, $apiCode, $apiMessage, $apiInfo, $apiDeveloper)
    {
        $this->apiStatus = $apiStatus;
        $this->apiCode = $apiCode;
        $this->apiMessage = $apiMessage;
        $this->apiInfo = $apiInfo;
        $this->apiDeveloper = $apiDeveloper;
    }

    public function getApiStatus()
    {
        return $this->apiStatus;
    }

    public function getApiCode()
    {
        return $this->apiCode;
    }

    public function getApiMessage()
    {
        return $this->apiMessage;
    }

    public function getApiInfo()
    {
        return $this->apiInfo;
    }

    public function getApiDeveloper()
    {
        return $this->apiDeveloper;
    }

    public function toArray()
    {
        $body = array(
            "status" => $this->apiStatus,
            "code" => $this->apiCode,
            "message" => $this->apiMessage,
            "info" => $this->apiInfo,
            "developer" => $this->apiDeveloper
        );

        return $body;
    }

}

?>