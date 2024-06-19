<?php
    namespace clientes\clientesController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use clientes\clientesModel AS ClaseClientesModelo;
    require_once __DIR__ . '/../../models/clientes/clientesModel.php';
    
    class clientesController {
        function getConexionModelClass(){
            return $model_class = new ClaseClientesModelo\clientesModel();
        }

        function obtenerClientes(){
            $model_clientes = $this->getConexionModelClass();
            $result_model = $model_clientes->obtenerClientes();
            return $result_model;
        }

        function guardaCliente($data){
            $model_clientes = $this->getConexionModelClass();
            $result_model = $model_clientes->guardaCliente($data);
            return $result_model;
        }

        function obtenerCliente($data){
            $model_clientes = $this->getConexionModelClass();
            $result_model = $model_clientes->obtenerCliente($data);
            return $result_model;
        }

        function actualizaCliente($data){
            $model_clientes = $this->getConexionModelClass();
            $result_model = $model_clientes->actualizaCliente($data);
            return $result_model;
        }

        function eliminarCliente($data){
            $model_clientes = $this->getConexionModelClass();
            $result_model = $model_clientes->eliminarCliente($data);
            return $result_model;
        }

        function traerHistorialCliente($data){
            $model_clientes = $this->getConexionModelClass();
            $result_model = $model_clientes->traerHistorialCliente($data);
            return $result_model;
        }
        
        function getDireecionCliente($data){
            $model_clientes = $this->getConexionModelClass();
            $result_model = $model_clientes->getDireecionCliente($data);
            return $result_model;
        }
        
    }
?>