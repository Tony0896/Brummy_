<?php
namespace login\loginModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . './../../conexion/dataBase.php' );
    class loginModel{ 

        function validarLogin($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $usuario = $data['usuario'];
            $pass = $data['contrasena'];

            $sql = "SELECT usuario_usua,contrasena_usua FROM usuariosbrummy WHERE usuario_usua = '$usuario'";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        while($row = mysqli_fetch_assoc($stmt)) {
                            $pw = $row['contrasena_usua'];
                            $pwd = md5($pass);
                            if($pwd == $pw){
                                $result = array('success' => true, 'result' => 'OK', 'code' => 200 );
                            } else{
                                $result = array('success' => true, 'result' => 'Contraseña Incorrecta', 'code' => 202 );
                            }
                        }
                    } else {
                        $result = array('success' => true, 'result' => 'Usuario No encontrado', 'code' => 202 );
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

        function creaSession($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $usuario = $data['usuario'];
            
            $sql = "SELECT ID, correo_usua, contacto_usua, usuario_usua, tipo_usua, estatus_usua, flag_visible_usua, fecha_vencimiento, nombre, apellidoPaterno, apellidoMaterno FROM usuariosbrummy WHERE usuario_usua = '$usuario'";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        while($row = mysqli_fetch_assoc($stmt)) {
                            session_start();
                            $_SESSION['ID_usuario'] = $row['ID'];
                            $_SESSION['correo_usua'] = $row['correo_usua'];
                            $_SESSION['contacto_usua'] = $row['contacto_usua'];
                            $_SESSION['usuario_usua'] = $row['usuario_usua'];
                            $_SESSION['tipo_usua'] = $row['tipo_usua'];
                            $_SESSION['estatus_usua'] = $row['estatus_usua'];
                            $_SESSION['flag_visible_usua'] = $row['flag_visible_usua'];
                            $_SESSION['fecha_vencimiento'] = $row['fecha_vencimiento'];
                            $_SESSION['nombre'] = $row['nombre'];
                            $_SESSION['apellidoPaterno'] = $row['apellidoPaterno'];
                            $_SESSION['apellidoMaterno'] = $row['apellidoMaterno'];
                            $_SESSION["token"] = base64_encode($row['ID'].strtotime("now").rand(0,100).$row['usuario_usua']);
                            $result = array('success' => true, 'result' => 'OK', 'code' => 200 );
                        }
                    } else {
                        $result = array('success' => true, 'result' => 'Usuario No encontrado', 'code' => 202 );
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

        function cargaPermisos($ID_usuario){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT * FROM vw_usuariosmodulo WHERE estatus = 1 AND FK_usuario = $ID_usuario AND FK_aplicativo = 1";
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