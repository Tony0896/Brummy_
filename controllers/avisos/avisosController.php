<?php
    namespace avisos\avisosController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use avisos\avisosModel AS ClaseAvisosModelo;
    require_once __DIR__ . '/../../models/avisos/avisosModel.php';
    
    class avisosController {
        function getConexionModelClass(){
            return $model_class = new ClaseAvisosModelo\avisosModel();
        }

        function obtenerAvisos($data){
            $model_avisos = $this->getConexionModelClass();
            $result_model = $model_avisos->obtenerAvisos($data);
            return $result_model;
        }

        function guardarAviso($data){
            $model_avisos = $this->getConexionModelClass();
            $result_model = $model_avisos->guardarAviso($data);
            return $result_model;
        }

        function obtenerAvisosToday(){
            $model_avisos = $this->getConexionModelClass();
            $result_model = $model_avisos->obtenerAvisosToday();
            return $result_model;
        }

        function verDetalleAvisos($data){
            $model_avisos = $this->getConexionModelClass();
            $result_model = $model_avisos->verDetalleAvisos($data);
            return $result_model;
        }

        function guardarEdicionAviso($data){
            $model_avisos = $this->getConexionModelClass();
            $result_model = $model_avisos->guardarEdicionAviso($data);
            return $result_model;
        }

        function eliminarAviso($data){
            $model_avisos = $this->getConexionModelClass();
            $result_model = $model_avisos->eliminarAviso($data);
            return $result_model;
        }
        
    }
?>