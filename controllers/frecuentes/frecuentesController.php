<?php
    namespace frecuentes\frecuentesController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use frecuentes\frecuentesModel AS ClaseFrecuentesModelo;
    require_once __DIR__ . '/../../models/frecuentes/frecuentesModel.php';
    
    class frecuentesController {
        function getConexionModelClass(){
            return $model_class = new ClaseFrecuentesModelo\frecuentesModel();
        }

        function obtenerCitasFrecuentes($data){
            $model_frecuentes = $this->getConexionModelClass();
            $result_model = $model_frecuentes->obtenerCitasFrecuentes($data);
            return $result_model;
        }

        function obtenerComprasFrecuentes($data){
            $model_frecuentes = $this->getConexionModelClass();
            $result_model = $model_frecuentes->obtenerComprasFrecuentes($data);
            return $result_model;
        }
        
    }
?>