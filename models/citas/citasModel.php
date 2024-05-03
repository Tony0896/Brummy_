<?php
namespace citas\citasModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . './../../conexion/dataBase.php' );
    class citasModel{ 

        function obtenerEventosMes($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $mes = $data['mes'];
            $year = $data['anio'];
            $sql = "SELECT fechaCita FROM citas WHERE YEAR(fechaCita) = '$year' AND MONTH(fechaCita) = '$mes'";
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
        
        function guardarCita($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $FKnombreCita = $data['FKnombreCita'];
            $nombreCita = $data['nombreCita'];
            $FKnombreMascota = $data['FKnombreMascota'];
            $nombreMascota = $data['nombreMascota'];
            $fechaCita = $data['fechaCita'];
            $horaCita = $data['horaCita'];
            $motivoCita = $data['motivoCita'];
            $comentariosCita = $data['comentariosCita'];
            $FKMotivo = $data['FKMotivo'];

            $sql = "INSERT INTO citas (FKnombreCita, nombreCita, FKnombreMascota, nombreMascota, fechaCita, horaCita, motivoCita, comentariosCita, FKMotivo)
            VALUES ('$FKnombreCita', '$nombreCita', '$FKnombreMascota', '$nombreMascota', '$fechaCita', '$horaCita', '$motivoCita', '$comentariosCita', '$FKMotivo')";
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
            return $resultJson;
        }

        function obtenerEventos($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $fecha = $data['fecha'];

            $sql = "SELECT * FROM citas WHERE fechaCita = '$fecha' ORDER BY horaCita";
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

        function guardarEstausCita($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $flagEstatus = $data['flagEstatus'];
            $estatus = $data['estatus'];
            $comentariosCita2 = $data['comentariosAdicionales'];
            $ID = $data['ID'];
            
            $sql = "UPDATE citas SET flagEstatus = '$flagEstatus', estatus = '$estatus', comentariosCita2 = '$comentariosCita2' WHERE ID = $ID";
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
            return $resultJson;
        }
        
    }
?>