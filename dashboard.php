<!DOCTYPE html>
<html lang="en">
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
                            <h1 class="welcome-text">Good Morning, <span class="text-black fw-bold">John Doe</span></h1>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto"></ul>
                    <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="offcanvas">
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
                                <img
                                    class="img-xs rounded-circle me-2"
                                    src="./images/faces/profile/profile.jpg"
                                    alt="Profile image"
                                    style="width: 28px; height: 28px"
                                />
                                <span class="menu-title">John Doe</span>
                            </a>
                            <div class="collapse" id="userOptions">
                                <ul class="nav flex-column sub-menu">
                                    <li class="nav-item"><a class="nav-link" href="">My Profile</a></li>
                                    <li class="nav-item"><a class="nav-link" href="">FAQ</a></li>
                                    <li class="nav-item"><a class="nav-link" href="">Cerrar sesión</a></li>
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
                                        <h4 class="card-title">Default form</h4>
                                        <div class="forms-sample">
                                            <div class="form-floating mb-3">
                                                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
                                                <label for="floatingInput">Email address</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                                                <label for="floatingPassword">Password</label>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input type="password" class="form-control" id="floatingConfirmPasswords" placeholder="Password" />
                                                <label for="floatingConfirmPasswords">Confirm Password</label>
                                            </div>

                                            <div class="form-check form-check-flat form-check-primary">
                                                <label class="form-check-label">
                                                    <input type="checkbox" class="form-check-input" />
                                                    Remember me
                                                </label>
                                            </div>
                                            <button type="submit" class="btn btn-primary me-2">Submit</button>
                                            <button class="btn btn-light">Cancel</button>
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
    </body>
</html>
