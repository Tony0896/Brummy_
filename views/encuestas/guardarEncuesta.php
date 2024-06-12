
<?php
    use encuestas\encuestasController as ClassControllerEncuestas;
    require_once  __DIR__ ."/../../controllers/encuestas/encuestasController.php";

    $data = $_POST;
    $controller = new ClassControllerEncuestas\encuestasController();
    $result = $controller->guardarEncuesta($data);
    echo $result;
?>