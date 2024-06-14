<?php
    use avisos\avisosController as ClassControllerAvisos;
    require_once  __DIR__ ."/../../controllers/avisos/avisosController.php";

    $controller = new ClassControllerAvisos\avisosController();
    $result = $controller->obtenerAvisosToday();
    echo $result;
?>