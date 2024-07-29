<?php
namespace citas\citasModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . './../../conexion/dataBase.php' );
    class citasModel{ 

        function InsertDomicilio($FKNombreCliente, $nombreCliente, $calle, $numero, $cp, $col, $municipio, $estado){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT ID FROM domicilios_clientes WHERE FKNombreCliente = '$FKNombreCliente'";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        $FK_Usuario = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1;
                        $nameUsuario = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';
                        
                        $sql = "UPDATE domicilios_clientes SET nombreCliente = '$nombreCliente', calle = '$calle', numero = '$numero', cp = '$cp', col = '$col', municipio = '$municipio', estado = '$estado' 
                        WHERE FKNombreCliente = $FKNombreCliente";

                        try{
                            $stmt = mysqli_query($conexion, $sql);
                            if($stmt){

                            }
                        } catch (mysqli_sql_exception $e) { }
                    } else{
                        $FK_Usuario = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1;
                        $nameUsuario = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';
                        
                        $sql = "INSERT INTO domicilios_clientes (FKNombreCliente, nombreCliente, calle, numero, cp, col, municipio, estado, pais, estatus, FKUsuarioCrea, FlagUsuarioCrea) 
                        VALUES ($FKNombreCliente, '$nombreCliente', '$calle', '$numero', '$cp', '$col', '$municipio', '$estado', 'México', 1, '$FK_Usuario', '$nameUsuario')";

                        try{
                            $stmt = mysqli_query($conexion, $sql);
                            if($stmt){

                            }
                        } catch (mysqli_sql_exception $e) { }
                    }
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }

            mysqli_close( $conexion );
        }

        function InsertHistoriaMascota($FK_mascota, $nombre, $FK_modulo, $nombreModulo, $motivo, $FK_Usuario, $nameUsuario, $ID_mov){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "CALL InsertHistoriaMascota(CURRENT_DATE(), $FK_mascota, '$nombre', $FK_modulo, '$nombreModulo', '$motivo', $FK_Usuario, '$nameUsuario', $ID_mov)";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){

                }
            } catch (mysqli_sql_exception $e) { }
            mysqli_close( $conexion );
        }

        function obtenerEventosMes($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

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
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

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
            $fechaHoraCita = $data['fechaCita'].' '.$data['horaCita'];

            $calle = $data['calleDomi'];
            $numero = $data['numeroDomi'];
            $cp = $data['cpDomi'];
            $col = $data['colDomi'];
            $municipio = $data['municipioDomi'];
            $estado = $data['estadoDomi'];
            $domicilio = $data['domicilio'];

            $sql = "INSERT INTO citas (FKnombreCita, nombreCita, FKnombreMascota, nombreMascota, fechaCita, horaCita, motivoCita, comentariosCita, FKMotivo, fechaHoraCita)
            VALUES ('$FKnombreCita', '$nombreCita', '$FKnombreMascota', '$nombreMascota', '$fechaCita', '$horaCita', '$motivoCita', '$comentariosCita', '$FKMotivo', '$fechaHoraCita')";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => 'Sin Datos');
                    $sql = "SELECT ID FROM citas ORDER BY ID DESC LIMIT 1";
                    try{
                        $stmt = mysqli_query($conexion, $sql);
                        if($stmt){
                            $rowcount=mysqli_num_rows($stmt);   
                            if ( $rowcount ) {
                                while($row = mysqli_fetch_assoc($stmt)) {
                                    $FK_mascota = $data['FKnombreMascota'];
                                    $nombre = $data['nombreMascota'];
                                    $FK_modulo = 7;
                                    $nombreModulo = 'Citas';
                                    $motivo = 'Nueva Cita: '. $fechaCita. ' '.$horaCita;
                                    $FK_Usuario = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1;
                                    $nameUsuario = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';
                                    $ID_mov = $row['ID'];
                                }
                                $this->InsertHistoriaMascota($FK_mascota, $nombre, $FK_modulo, $nombreModulo, $motivo, $FK_Usuario, $nameUsuario, $ID_mov);
                                if($domicilio == 1){
                                    $this->InsertDomicilio($FKnombreCita, $nombreCita, $calle, $numero, $cp, $col, $municipio, $estado);
                                }
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

        function obtenerEventos($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $fecha = $data['fecha'];

            $sql = "SELECT *, getTemperamentoMascota(FKnombreMascota) as temperamento, getIndicadorCliente(FKnombreCita) as indicadorCliente FROM citas WHERE fechaCita = '$fecha' ORDER BY horaCita";
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
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $flagEstatus = $data['flagEstatus'];
            $estatus = $data['estatus'];
            $comentariosCita2 = $data['comentariosAdicionales'];
            $ID = $data['ID'];

            $FK_mascota = $data['FK_mascota'];
            $nombre = $data['nombre'];
            $nuevaHora = $data['nuevaHora'];
            $nuevaFecha = $data['nuevaFecha'];

            $fecha_hora_nueva = ($flagEstatus == 'REAGENDADA') ? " , horaCita = '$nuevaHora' , fechaCita = '$nuevaFecha' " : ''; 

            $sql = "UPDATE citas SET flagEstatus = '$flagEstatus', estatus = '$estatus', comentariosCita2 = '$comentariosCita2' $fecha_hora_nueva  WHERE ID = $ID";
            
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => 'Sin Datos');
                    $FK_modulo = 7;
                    $nombreModulo = 'Citas';
                    $motivo = 'Cambio de estatus cita: A '.$flagEstatus.', '.$comentariosCita2;
                    $FK_Usuario = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1;
                    $nameUsuario = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';

                    $this->InsertHistoriaMascota($FK_mascota, $nombre, $FK_modulo, $nombreModulo, $motivo, $FK_Usuario, $nameUsuario, $ID);
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
  
        function validaCita($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $fechaCita = $data['fechaCita'];
            $horaCita = $data['horaCita'];

            $datetime = $fechaCita.' '.$horaCita;

            $horaMas = strtotime($datetime.' + 30 minute');
            $horaMenos = strtotime($datetime.' - 30 minute');
            $horaMas1 = date('Y-m-d H:i:s', $horaMas);
            $horaMenos1 = date('Y-m-d H:i:s', $horaMenos);

            $sql = "SELECT * FROM citas WHERE fechaHoraCita BETWEEN '$horaMenos1' AND '$horaMas1' AND estatus = 1";
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

        function generarLinkEncuesta($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];

            $sql = "SELECT ID FROM encuestaheader WHERE FKCita = {$ID}";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        while($row = mysqli_fetch_assoc($stmt)) {
                            $array[] = $row;
                        }
                        $result = array('success' => true, 'result' => $array);
                    } else{
                        $sql = "INSERT INTO encuestaheader (FKCita) VALUES ({$ID})";
                        try{
                            $stmt = mysqli_query($conexion, $sql);
                            if($stmt){
                                $array[] = array(
                                    'ID' => $ID
                                );
                                $result = array('success' => true, 'result' => $array);
                            } else {
                                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                            }
                        } catch (mysqli_sql_exception $e) {
                            $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
                        }
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