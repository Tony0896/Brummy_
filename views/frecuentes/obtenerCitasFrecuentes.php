<?php
    use frecuentes\frecuentesController as ClassControllerFrecuentes;
    require_once  __DIR__ ."/../../controllers/frecuentes/frecuentesController.php";

    $data = $_POST;
    $controller = new ClassControllerFrecuentes\frecuentesController();
    $result = $controller->obtenerCitasFrecuentes($data);
    echo $result;
?>