<?php
    namespace citas\citasController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use citas\citasModel AS ClaseCitasModelo;
    require_once __DIR__ . '/../../models/citas/citasModel.php';
    
    class citasController {
        function getConexionModelClass(){
            return $model_class = new ClaseCitasModelo\citasModel();
        }

        // function obtenerEspecies(){
        //     $model_citas = $this->getConexionModelClass();
        //     $result_model = $model_citas->obtenerEspecies();
        //     return $result_model;
        // }

        function guardarCita($data){
            $model_citas = $this->getConexionModelClass();
            $result_model = $model_citas->guardarCita($data);
            return $result_model;
        }
        
    }
?>