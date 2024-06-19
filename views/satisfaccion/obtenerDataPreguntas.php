
<?php
    use satisfaccion\satisfaccionController as ClassControllerSatisfaccion;
    require_once  __DIR__ ."/../../controllers/satisfaccion/satisfaccionController.php";

    $data = $_POST;
    $controller = new ClassControllerSatisfaccion\satisfaccionController();
    $result = $controller->obtenerDataPreguntas($data);
    echo $result;
?>