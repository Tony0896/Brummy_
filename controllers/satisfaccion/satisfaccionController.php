<?php
    namespace satisfaccion\satisfaccionController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use satisfaccion\satisfaccionModel AS ClaseSatisfaccionModelo;
    require_once __DIR__ . '/../../models/satisfaccion/satisfaccionModel.php';
    
    class satisfaccionController {
        function getConexionModelClass(){
            return $model_class = new ClaseSatisfaccionModelo\satisfaccionModel();
        }

        function obtenerDataInitialSatisfaccion(){
            $model_satisfaccion = $this->getConexionModelClass();
            $result_model = $model_satisfaccion->obtenerDataInitialSatisfaccion();
            return $result_model;
        }

        function obtenerDataSatisfaccion($data){
            $model_satisfaccion = $this->getConexionModelClass();
            $result_model = $model_satisfaccion->obtenerDataSatisfaccion($data);
            return $result_model;
        }

        function obtenerDataPreguntas($data){
            $model_satisfaccion = $this->getConexionModelClass();
            $result_model = $model_satisfaccion->obtenerDataPreguntas($data);
            return $result_model;
        }
        
    }
?>