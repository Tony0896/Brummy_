<?php
    namespace store\storeController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use store\storeModel AS ClaseStoreModelo;
    require_once __DIR__ . '/../../models/store/storeModel.php';
    
    class storeController {
        function getConexionModelClass(){
            return $model_class = new ClaseStoreModelo\storeModel();
        }

        function guardarNombreVete($data){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->guardarNombreVete($data);
            return $result_model;
        }

        function obtenerDataVeterinaria(){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->obtenerDataVeterinaria($_SESSION['empresa']);
            return $result_model;
        }

        function guardaresloganVete($data){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->guardaresloganVete($data);
            return $result_model;
        }

        function guardardescripcionVete($data){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->guardardescripcionVete($data);
            return $result_model;
        }

        function guardardireccionVete($data){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->guardardireccionVete($data);
            return $result_model;
        }

        function guardarredesVete($data){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->guardarredesVete($data);
            return $result_model;
        }

        function obtenerRedesSocialesVete(){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->obtenerRedesSocialesVete($_SESSION['empresa']);
            return $result_model;
        }

        function guardarcontactosVete($data){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->guardarcontactosVete($data);
            return $result_model;
        }

        function obtenerContactosVete(){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->obtenerContactosVete($_SESSION['empresa']);
            return $result_model;
        }

        function guardarHorariosBD($data){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->guardarHorariosBD($data);
            return $result_model;
        }
        
        function obtenerHorariosVete(){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->obtenerHorariosVete($_SESSION['empresa']);
            return $result_model;
        }

        function deleteHorariosVete($data){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->deleteHorariosVete($data);
            return $result_model;
        }

        function deleteContactosVete($data){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->deleteContactosVete($data);
            return $result_model;
        }

        function deleteRedesSocialesVete($data){
            $model_store = $this->getConexionModelClass();
            $result_model = $model_store->deleteRedesSocialesVete($data);
            return $result_model;
        }
        
    }
?>