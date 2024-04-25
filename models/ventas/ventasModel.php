<?php
namespace ventas\ventasModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . './../../conexion/dataBase.php' );
    class ventasModel{
        function guardarHeaderVenta($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $cliente = $data['cliente'];
            $price = $data['price'];
            $FlagExacto = $data['FlagExacto'];
            $efectivo = $data['efectivo'];
            $cambio = $data['cambio'];

            $sql = "INSERT INTO ventaHeader (cliente, price, FlagExacto, efectivo, cambio, fechaCreacion)
            VALUES ($cliente, '$price', '$FlagExacto', '$efectivo', '$cambio', current_timestamp())";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $sql = "SELECT ID as IDHeader FROM ventaHeader ORDER BY ID DESC LIMIT 1";
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
        
        function guardarDetalleVenta($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $dataID = $data['dataID'];
            $FlagProducto = $data['FlagProducto'];
            $FKProducto = $data['FKProducto'];
            $label = $data['label'];
            $total = $data['total'];

            $sql = "INSERT INTO ventaDetalle (FKVenta, FlagProducto, FKProducto, cantidad, total)
            VALUES ( '$dataID', '$FlagProducto', '$FKProducto', '$label', '$total' )";

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
        
        function obtenerVentas(){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT * FROM vwventasgeneral ORDER BY ID DESC";
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

        function obtenerVenta($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];

            $sql = "SELECT * FROM vwVentaDetails WHERE ID = $ID";

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