
<?php
    use store\storeController as ClassControllerStore;
    require_once  __DIR__ ."/../../controllers/store/storeController.php";

    $data = $_POST;

    $controller = new ClassControllerStore\storeController();
    $result = $controller->guardaresloganVete($data);
    echo $result;
?>