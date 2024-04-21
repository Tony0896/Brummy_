<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// session_start();
?>
<style>
    .card{
        box-shadow: none;
        background-color: transparent;
    }
    th{
        background-color: #009071 !important;
        color: #fff;
    }
</style>
<script type="text/javascript" src="./functions/ventas/nuevaVenta.js"></script>
    <div class="row" style="margin-bottom: 0.7em;">
        <div class="col-md-12 mb-2" style="display: flex;align-items: center;">
            <p class="backButton" onclick="regresaVentas()"><span class='material-icons'>arrow_back_ios_new</span> <span>REGRESAR</span> </p>
        </div>
    </div>
    
    <div class="forms-sample">
        <div class="row" style="margin-bottom: 0.7em;">
            <div class="col-md-12 mb-2" style="display: flex;align-items: center;">
                <div class="card2">
                    <div class="card-body">
                        <h4 class="card-title">Nueva Venta</h4>
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <div class="cointainer-info">
                                    <div class="coolinput">
                                        <label for="clientes" class="text">Cliente</label>
                                        <select class="input capitalize obligatorio" name="Cliente" id="clientes" style="background-color: rgb(255, 255, 255);width:100%;">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div class="cointainer-info">
                                    <div class="coolinput">
                                        <label for="productos" class="text">Productos/Servicios:</label>
                                        <select class="input capitalize obligatorio" name="Productos" id="productos" style="background-color: rgb(255, 255, 255);width:100%;" onchange="confirmarAgregarProducto()">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 mb-2">
                                <table class="mdl-data-table table responsive table-bordered table-striped datatable" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Tipo</th>
                                            <th>Stock</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Total</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="nuevaVentaBody">
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="row" >
                            <div class="col-md-12 mb-2">
                                <table class="mdl-data-table table responsive table-bordered table-striped datatable" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th>Total</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody id="nuevaVentaBody2">
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12 mb-2">
                                <!-- <div class="buttom-red buttom" onclick="">
                                    <span class="text-sm mb-0 span-buttom"> 
                                        Eliminar
                                        <i class="material-icons"> delete </i>
                                    </span>
                                </div> -->
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php 
    require_once('./../components/modal.php');
?>