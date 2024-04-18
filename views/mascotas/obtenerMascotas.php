<?php
    use mascotas\mascotasController as ClassControllerMascotas;
    require_once  __DIR__ ."/../../controllers/mascotas/mascotasController.php";

    $controller = new ClassControllerMascotas\mascotasController();
    $result = $controller->obtenerMascotas();
    echo $result;
?>