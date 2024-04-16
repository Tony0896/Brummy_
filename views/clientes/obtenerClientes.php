<?php
    use clientes\clientesController as ClassControllerClientes;
    require_once  __DIR__ ."/../../controllers/clientes/clientesController.php";

    $controller = new ClassControllerClientes\clientesController();
    $result = $controller->obtenerClientes();
    echo $result;
?>