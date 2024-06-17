<?php
    use store\storeController as ClassControllerStore;
    require_once  __DIR__ ."/../../controllers/store/storeController.php";

    $controller = new ClassControllerStore\storeController();
    $result = $controller->obtenerDataVeterinaria();
    echo $result;
?>