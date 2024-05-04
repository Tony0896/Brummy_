<?php
    session_start();
if(isset ( $_SESSION['ID_usuario'] ) ){
    $ID_usuario = $_SESSION['ID_usuario']; 
    if($ID_usuario == ''){
        $boolean_session = false;
    } else {
        $boolean_session = true;
    }
} else {
    $boolean_session = false;
}

if( !$boolean_session ){
    session_unset(); 
    session_destroy();
    header("Location: /Brummy/");
}
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Brummy</title>
        <!-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" /> -->
        <link href="./css/CDN/Material_Icons.css" rel="stylesheet">
        <link href="./css/CDN/sweetalert2.min.css" rel="stylesheet">
        <link rel="stylesheet" media="all" href="./css/ispinner.prefixed.css" />
        <!-- plugins:css -->
        <link rel="stylesheet" href="./vendors/feather/feather.css" />
        <link rel="stylesheet" href="./vendors/ti-icons/css/themify-icons.css" />
        <link rel="stylesheet" href="./vendors/css/vendor.bundle.base.css" />
        <!-- endinject -->
        <!-- Plugin css for this page -->
        <link rel="stylesheet" href="./vendors/select2/select2.min.css" />
        <link rel="stylesheet" href="./vendors/select2-bootstrap-theme/select2-bootstrap.min.css" />
        <!-- End plugin css for this page -->
        <!-- inject:css -->
        <link rel="stylesheet" href="./css/vertical-layout-light/style.css" />
        <link rel="stylesheet" href="./css/brummy.css" />
        <!-- endinject -->
        <link rel="shortcut icon" href="./images/favicon.png" />

        <link rel="stylesheet" href="./libraries/datatables-1.12.1/jquery.dataTables.min.css" />
        <link rel="stylesheet" href="./libraries/datatables-1.12.1/responsive/2.3.0/responsive.dataTables.min.css" />
        <link rel="stylesheet" href="./libraries/jsCalendar/jsCalendar.min.css" />
    </head>

    <style>
        .card {
            box-shadow: none;
            background-color: transparent;
        }
        .table.dashTable thead > tr > th {
            background-color: #009071;
            color: #fff;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        
    </style>
    <body>
        <div class="modal modals fade bd-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1">
            <div class="modal-dialog modal-sm">
                <div class="modal-content" style="width: 48px">
                    <div class="ispinner ispinner-large">
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                    </div>
                </div>
            </div>
        </div>
        <?php include_once('./templates/components/modalAlert.php'); ?>
        <div class="container-scroller">
            <nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row" style="user-select: none;">
                <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
                    <div class="me-3">
                        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="minimize">
                            <span class="material-icons"> menu </span>
                        </button>
                    </div>
                    <div>
                        <a class="navbar-brand brand-logo" href="./dashboard.php">
                            <img src="./images/logo.svg" alt="logo" />
                        </a>
                        <a class="navbar-brand brand-logo-mini" href="./dashboard.php">
                            <img src="./images/logo-mini.svg" alt="logo" />
                        </a>
                    </div>
                </div>
                <div class="navbar-menu-wrapper d-flex align-items-top">
                    <ul class="navbar-nav">
                        <li class="nav-item font-weight-semibold d-none d-lg-block ms-0">
                            <h1 class="welcome-text">Hola!, <span class="text-black fw-bold"><?php echo $_SESSION['nombre']." ".$_SESSION['apellidoPaterno']; ?></span></h1>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto"></ul>
                    <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="offcanvas" id="btnHideDash">
                        <span class="material-icons"> menu </span>
                    </button>
                </div>
            </nav>
            <div class="container-fluid page-body-wrapper">
                <nav class="sidebar sidebar-offcanvas" id="sidebar" style="position: fixed; user-select: none;">
                    <ul class="nav">
                        <li class="nav-item">
                            <a class="nav-link" href="./dashboard.php">
                                <span class="material-icons me-2"> dashboard </span>
                                <span class="menu-title">Dashboard</span>
                            </a>
                        </li>
                        <li class="nav-item nav-category" style="padding-top: 0px"><hr style="margin: 5px 0px" /></li>
                        <li class="nav-item" id="apps_menu_li">
                            <a class="nav-link" href="#" id="apps_menu" onclick="cargaTemplate(this.id)">
                                <span class="material-icons me-2"> apps </span>
                                <span class="menu-title">Cátalogos</span>
                            </a>
                        </li>
                        <li class="nav-item" id="paid_menu_li">
                            <a class="nav-link tagAMenu" href="#" id="paid_menu" onclick="cargaTemplate(this.id)">
                                <span class="material-icons me-2"> paid </span>
                                <span class="menu-title">Venta</span>
                            </a>
                        </li>
                        <li class="nav-item" id="people_menu_li">
                            <a class="nav-link tagAMenu" href="#" id="people_menu" onclick="cargaTemplate(this.id)">
                                <span class="material-icons me-2"> people </span>
                                <span class="menu-title">Clientes</span>
                            </a>
                        </li>
                        <li class="nav-item" id="pets_menu_li">
                            <a class="nav-link tagAMenu" href="#" id="pets_menu" onclick="cargaTemplate(this.id)">
                                <span class="material-icons me-2"> pets </span>
                                <span class="menu-title">Mascotas</span>
                            </a>
                        </li>
                        <li class="nav-item" id="event_menu_li">
                            <a class="nav-link tagAMenu" href="#" id="event_menu" onclick="cargaTemplate(this.id)">
                                <span class="material-icons me-2"> event </span>
                                <span class="menu-title">Citas</span>
                            </a>
                        </li>
                        <li class="nav-item" id="inventory_menu_li">
                            <a class="nav-link tagAMenu" href="#" id="inventory_menu" onclick="cargaTemplate(this.id)">
                                <span class="material-icons me-2"> inventory_2 </span>
                                <span class="menu-title">Inventario</span>
                            </a>
                        </li>
                        <li class="nav-item nav-category" style="padding-top: 0px"><hr style="margin: 5px 0px" /></li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="collapse" href="#userOptions" aria-expanded="false" aria-controls="userOptions">
                                <span class="material-icons" style="margin-right: 10px;"> account_circle </span>
                                <span class="menu-title"><?php echo $_SESSION['nombre']." ".$_SESSION['apellidoPaterno']; ?></span>
                            </a>
                            <div class="collapse" id="userOptions">
                                <ul class="nav flex-column sub-menu">
                                    <li class="nav-item tagAMenu"><a class="nav-link" href="#">My Profile</a></li>
                                    <!-- <li class="nav-item tagAMenu"><a class="nav-link" href="#">FAQ</a></li> -->
                                    <li class="nav-item tagAMenu"><a class="nav-link" href="#" onclick="cerrarSesion()">Cerrar sesión</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
                <!-- partial -->
                <div class="main-panel" style="margin-left: auto">
                    <div class="content-wrapper">
                        <div class="row">
                            <div class="col-md-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body" id="contenido">
                                        <div class="row">
                                            <div class="col-sm-12 mb-4">
                                                <div class="statistics-details d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <p class="statistics-title">Ganancias del día</p>
                                                        <h3 class="rate-percentage">$0.00</h3>
                                                        
                                                    </div>
                                                    <div>
                                                        <p class="statistics-title">Citas agendadas(HOY)</p>
                                                        <h3 class="rate-percentage">12</h3>
                                                        
                                                    </div>
                                                    <div>
                                                        <p class="statistics-title">Citas atendidas(HOY)</p>
                                                        <h3 class="rate-percentage">1</h3>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 grid-margin stretch-card">
                                                <div class="card2 mb-2">
                                                    <div class="card-body">
                                                        <h4 class="statistics-title">Proximas Citas (5)</h4>
                                                        <div id="div_citas">
                                                            <table class="mdl-data-table table responsive table-bordered table-striped dashTable" style="width:100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Cliente</th>
                                                                        <th>Mascota</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>1</td>
                                                                        <td>CLiente</td>
                                                                        <td>Mascota</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 grid-margin stretch-card">
                                                <div class="card2 mb-2">
                                                    <div class="card-body">
                                                        <h4 class="statistics-title">Últimas ventas (5)</h4>
                                                        <div id="div_citas">
                                                            <table class="mdl-data-table table responsive table-bordered table-striped dashTable" style="width:100%">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Nombre</th>
                                                                        <th>Costo</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>1</td>
                                                                        <td>baño</td>
                                                                        <td>$100.00</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 grid-margin stretch-card">
                                                <div class="card2 mb-2">
                                                    <div class="card-body">
                                                        <h4 class="statistics-title">TOP 5 Productos más vendidos</h4>
                                                        <div id="div_citas">
                                                            <canvas id="bar-chart2" width="800" height="450"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 grid-margin stretch-card">
                                                <div class="card2 mb-2">
                                                    <div class="card-body">
                                                        <h4 class="statistics-title">Satisfacción cliente</h4>
                                                        <div id="div_citas">
                                                            <canvas id="bar-chart" width="800" height="450"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- content-wrapper ends -->
                    <footer class="footer">
                        <div class="d-sm-flex justify-content-center justify-content-sm-between">
                            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block"> &nbsp; </span>
                            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Copyright © 2024. All rights reserved.</span>
                        </div>
                    </footer>
                    <!-- partial -->
                </div>
                <!-- main-panel ends -->
            </div>
            <!-- page-body-wrapper ends -->
        </div>
        <!-- container-scroller -->
        <!-- plugins:js -->
        <script src="./vendors/js/vendor.bundle.base.js"></script>
        <!-- endinject -->
        <!-- Plugin js for this page -->
        <script src="./vendors/select2/select2.min.js"></script>
        <!-- End plugin js for this page -->
        <!-- inject:js -->
        <script src="./js/off-canvas.js"></script>
        <script src="./js/hoverable-collapse.js"></script>
        <script src="./js/template.js"></script>
        <script src="./js/settings.js"></script>
        <script src="./js/configGlobal.js"></script>
        <script src="./js/principal.js"></script>
        <!-- endinject -->
        <!-- Custom js for this page-->
        <script src="./js/select2.js"></script>
        <!-- End custom js for this page-->
        <script type="text/javascript" src="./libraries/datatables-1.12.1/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="./libraries/datatables-1.12.1/responsive/2.3.0/dataTables.responsive.min.js"></script>
        <script src="./libraries/sweetalert2.all.min.js"></script>
        <script src="./libraries/jsCalendar/jsCalendar.lang.es.js"></script>
        <script src="./libraries/jsCalendar/jsCalendar.min.js"></script>
        <!-- <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
    </body>
</html>
