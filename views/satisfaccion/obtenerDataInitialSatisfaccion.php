<?php
    use satisfaccion\satisfaccionController as ClassControllerSatisfaccion;
    require_once  __DIR__ ."/../../controllers/satisfaccion/satisfaccionController.php";

    $controller = new ClassControllerSatisfaccion\satisfaccionController();
    $result = $controller->obtenerDataInitialSatisfaccion();
    echo $result;
?>