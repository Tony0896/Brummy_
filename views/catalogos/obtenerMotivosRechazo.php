<?php
    use catalogos\catalogosController as ClassControllerCatalogos;
    require_once  __DIR__ ."/../../controllers/catalogos/catalogosController.php";

    $controller = new ClassControllerCatalogos\catalogosController();
    $result = $controller->obtenerMotivosRechazo();
    echo $result;
?>