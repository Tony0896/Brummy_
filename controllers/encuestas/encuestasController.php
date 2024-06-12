<?php
    namespace encuestas\encuestasController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use encuestas\encuestasModel AS ClaseEncuestasModelo;
    require_once __DIR__ . '/../../models/encuestas/encuestasModel.php';
    
    class encuestasController {
        function getConexionModelClass(){
            return $model_class = new ClaseEncuestasModelo\encuestasModel();
        }

        function obtenerEncuestas(){
            $model_encuestas = $this->getConexionModelClass();
            $result_model = $model_encuestas->obtenerEncuestas();
            return $result_model;
        }

        function guardarPregunta($data){
            $model_encuestas = $this->getConexionModelClass();
            $result_model = $model_encuestas->guardarPregunta($data);
            return $result_model;
        }

        function eliminarPregunta($data){
            $model_encuestas = $this->getConexionModelClass();
            $result_model = $model_encuestas->eliminarPregunta($data);
            return $result_model;
        }

        function obtenerDataEncuesta($data){
            $model_encuestas = $this->getConexionModelClass();
            $result_model = $model_encuestas->obtenerDataEncuesta($data);
            return $result_model;
        }

        function actualizarPregunta($data){
            $model_encuestas = $this->getConexionModelClass();
            $result_model = $model_encuestas->actualizarPregunta($data);
            return $result_model;
        }

        function validaEncuesta($data){
            $model_encuestas = $this->getConexionModelClass();
            $result_model = $model_encuestas->validaEncuesta($data);
            return $result_model;
        }

        function guardarEncuesta($data){
            $model_encuestas = $this->getConexionModelClass();
            $result_model = $model_encuestas->guardarEncuesta($data);
            return $result_model;
        }
        
    }
?>