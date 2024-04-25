<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// session_start();
?>
<script type="text/javascript" src="./functions/ventas/ventas.js"></script>
    <div class="row" style="margin-bottom: 0.7em;">
        <div class="col-md-9 mb-2" style="display: flex;align-items: center;">
            <h4 class="card-title mb-0">Ventas</h4>
        </div>
        <div class="col-md-3 mb-2" style="display: flex;justify-content: end;">
            <div class="buttom-green buttom" onclick="irNuevaVenta()">
                <span class="text-sm mb-0">Nueva <i class="material-icons"> add_circle </i></span>
            </div>
        </div>
    </div>

    <div class="forms-sample">
        <table class="mdl-data-table table responsive table-bordered table-striped datatable" style="width:100%">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Productos</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="ventasBody">
            </tbody>
        </table>
    </div>
<?php 
    require_once('./../components/modal.php');
?>