<?php
    use clientes\clientesController as ClassControllerClientes;
    require_once  __DIR__ ."/../../controllers/clientes/clientesController.php";

    $data = $_POST;
    $controller = new ClassControllerClientes\clientesController();
    $result = $controller->eliminarCliente($data);
    echo $result;
?>