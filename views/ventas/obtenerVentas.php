<?php
    use ventas\ventasController as ClassControllerVentas;
    require_once  __DIR__ ."/../../controllers/ventas/ventasController.php";

    $controller = new ClassControllerVentas\ventasController();
    $result = $controller->obtenerVentas();
    echo $result;
?>