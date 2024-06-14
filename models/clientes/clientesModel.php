<?php
namespace clientes\clientesModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . './../../conexion/dataBase.php' );
    class clientesModel{

        function InsertHistoriaCliente($FK_Cliente, $nombre, $FK_modulo, $nombreModulo, $motivo, $FK_Usuario, $nameUsuario, $ID_mov){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "CALL InsertHistoriaCliente(CURRENT_DATE(), $FK_Cliente, '$nombre', $FK_modulo, '$nombreModulo', '$motivo', $FK_Usuario, '$nameUsuario', $ID_mov)";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){

                }
            } catch (mysqli_sql_exception $e) { }
            mysqli_close( $conexion );
        }

        function obtenerClientes(){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT * FROM clientes WHERE estatus = 1";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        while($row = mysqli_fetch_assoc($stmt)) {
                            $array[] =$row;
                        }
                        $result = array('success' => true, 'result' => $array);
                    } else{
                        $result = array('success' => true, 'result' => 'Sin Datos');
                    }
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }
            
            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }
        
        function guardaCliente($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $nombre = $data['nombre'];
            $apellidoP = $data['apellidoP'];
            $apellidoM = $data['apellidoM'];
            $telefono = $data['telefono'];
            $correo = $data['correo'];
            $motivoMovimiento = 'Cliente registrado';

            $sql = "INSERT INTO Clientes (nombre, apellidoP, apellidoM, telefono, correo, fechaUlmitoMovimiento, motivoMovimiento)
            VALUES ('$nombre', '$apellidoP', '$apellidoM', '$telefono', '$correo', current_timestamp(), '$motivoMovimiento')";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => 'Sin Datos');
                    $sql = "SELECT * FROM Clientes ORDER BY ID DESC LIMIT 1";
                    try{
                        $stmt = mysqli_query($conexion, $sql);
                        if($stmt){
                            $rowcount=mysqli_num_rows($stmt);   
                            if ( $rowcount ) {
                                while($row = mysqli_fetch_assoc($stmt)) {
                                    $FK_Cliente = $row['ID'];
                                    $nombre = $row['nombre'].' '.$row['apellidoP'].' '.$row['apellidoM'];
                                    $FK_modulo = 5;
                                    $nombreModulo = 'Clientes';
                                    $motivo = 'Nuevo Cliente Registrado';
                                    $FK_Usuario = $_SESSION['ID_usuario'];
                                    $nameUsuario = $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'];
                                    $ID_mov = $row['ID'];
                                }
                                $this->InsertHistoriaCliente($FK_Cliente, $nombre, $FK_modulo, $nombreModulo, $motivo, $FK_Usuario, $nameUsuario, $ID_mov);
                            }
                        }
                    } catch (mysqli_sql_exception $e) { }
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }
            
            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }
        
        function obtenerCliente($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];
            $sql = "SELECT * FROM Clientes WHERE ID = $ID";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        while($row = mysqli_fetch_assoc($stmt)) {
                            $array[] =$row;
                        }
                        $result = array('success' => true, 'result' => $array);
                    } else{
                        $result = array('success' => true, 'result' => 'Sin Datos');
                    }
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }
            
            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }

        function actualizaCliente($data){

            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $nombre = $data['nombre'];
            $apellidoP = $data['apellidoP'];
            $apellidoM = $data['apellidoM'];
            $telefono = $data['telefono'];
            $correo = $data['correo'];
            $motivoMovimiento = 'Datos Cliente Actualizado';
            $ID = $data['ID'];

            $sql = "UPDATE Clientes SET nombre = '$nombre', apellidoP = '$apellidoP', apellidoM = '$apellidoM', telefono = '$telefono', 
            correo = '$correo', fechaUlmitoMovimiento = current_timestamp(), motivoMovimiento = '$motivoMovimiento' WHERE ID = $ID ";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => 'Sin Datos');
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }
            
            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }

        function eliminarCliente($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];
            $motivoMovimiento = 'Cliente Eliminado';

            $sql = "UPDATE Clientes SET estatus = 0, fechaUlmitoMovimiento = current_timestamp(), motivoMovimiento = '$motivoMovimiento' WHERE ID = $ID ";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => 'Sin Datos');
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }
            
            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }
        
        function traerHistorialCliente($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];

            $sql = "SELECT ID, fecha, FK_cliente, nombre, FK_modulo, nombre_modulo, motivo_movimiento, FK_registro_accion FROM historial_cliente WHERE estatus = 1 AND FK_cliente = $ID ORDER BY ID DESC";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        while($row = mysqli_fetch_assoc($stmt)) {
                            $array[] =$row;
                        }
                        $result = array('success' => true, 'result' => $array);
                    } else{
                        $result = array('success' => true, 'result' => 'Sin Datos');
                    }
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }
            
            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }
    }
?>