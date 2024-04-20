<?php
    use inventario\inventarioController as ClassControllerInventario;
    require_once  __DIR__ ."/../../controllers/inventario/inventarioController.php";

    $data = $_POST;

    $controller = new ClassControllerInventario\inventarioController();
    $result = $controller->guardarProducto($data);
    echo $result;
?>