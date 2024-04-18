<?php
namespace mascotas\mascotasModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . './../../conexion/dataBase.php' );
    class mascotasModel{ 

        function obtenerMascotas(){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT ms.*, CONCAT(cl.nombre, ' ' ,cl.apellidoM, ' ' ,cl.apellidoP) as NombreCliente FROM mascotas ms LEFT JOIN clientes cl ON cl.ID = ms.FK_dueno WHERE ms.estatus = 1";
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

        function guardarMascota($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $nombre = $data['nombre'];
            $fechaNacimiento = $data['fechaNacimiento'];
            $FK_especie = $data['FK_especie'];
            $especie = $data['especie'];
            $raza = $data['raza'];
            $FK_raza = $data['FK_raza'];
            $sexo = $data['sexo'];
            $color = $data['color'];
            $rasgosParticulares = $data['rasgosParticulares'];
            $FK_dueno = $data['FK_dueno'];
            $nota = '';
            $motivoMovimiento = 'Mascota registrada';

            $sql = "INSERT INTO mascotas (nombre, fechaNacimiento, FK_especie, especie, raza, FK_raza, sexo, color, rasgosParticulares, nota, fechaCreacion, fechaUlmitoMovimiento, motivoMovimiento, FK_dueno)
            VALUES ('$nombre', '$fechaNacimiento', '$FK_especie', '$especie', '$raza', '$FK_raza', '$sexo', '$color', '$rasgosParticulares', '$nota', current_timestamp(), current_timestamp(), '$motivoMovimiento', '$FK_dueno')";

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

        function obtenerMascota($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];

            $sql = "SELECT ms.*, CONCAT(cl.nombre, ' ' ,cl.apellidoM, ' ' ,cl.apellidoP) as NombreCliente FROM mascotas ms LEFT JOIN clientes cl ON cl.ID = ms.FK_dueno WHERE ms.estatus = 1 AND ms.ID = $ID";
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

        function eliminarMascota($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];
            $motivoMovimiento = 'Cliente Eliminado';

            $sql = "UPDATE Mascotas SET estatus = 0, fechaUlmitoMovimiento = current_timestamp(), motivoMovimiento = '$motivoMovimiento' WHERE ID = $ID ";
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