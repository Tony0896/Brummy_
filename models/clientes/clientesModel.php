<?php
namespace clientes\clientesModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . './../../conexion/dataBase.php' );
    class clientesModel{ 

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
            echo $resultJson;
        }
        
        function guardaCliente($data){
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
                    $rowcount=0;
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
            echo $resultJson;
        }
        
        function obtenerCliente($data){
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
            echo $resultJson;
        }

        function actualizaCliente($data){
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
                    $rowcount=0;
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
            echo $resultJson;
        }

        function eliminarCliente($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];
            $motivoMovimiento = 'Cliente Eliminado';

            $sql = "UPDATE Clientes SET estatus = 0, fechaUlmitoMovimiento = current_timestamp(), motivoMovimiento = '$motivoMovimiento' WHERE ID = $ID ";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=0;
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
            echo $resultJson;
        }
    }
?>