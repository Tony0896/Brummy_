<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// session_start();
?>
<script type="text/javascript" src="./functions/avisos/avisos.js"></script>
    <div class="row" style="margin-bottom: 0.7em;">
        <div class="col-md-9 mb-2" style="display: flex;align-items: center;">
            <h4 class="card-title mb-0">Avisos</h4>
        </div>
        <div class="col-md-3 mb-2" style="display: flex;justify-content: end;">
            <div class="buttom-green buttom" onclick="crearNuevoAviso()">
                <span class="text-sm mb-0">Nuevo <i class="material-icons"> add_circle </i></span>
            </div>
        </div>
    </div>

    <div class="card2">
        <div class="card-body">
            <!-- <div class="row">
                <div class="col-md-3 mb-2">
                    <div class="coolinput">
                        <label for="estatusAvisos" class="text">Estatus:</label>
                        <select class="input capitalize" id="estatusAvisos" style="background-color: rgb(255, 255, 255);width:100%;">
                            <option value="">Selecciona una opción</option>
                            <option value="1" selected>ACTIVO</option>
                            <option value="0">INACTIVO</option>
                            <option value="2">ELIMINADO</option>
                        </select>
                    </div>
                </div>
            </div> -->
            <input type="hidden" id="estatusAvisos" value="1">
            
            <div class="forms-sample">
                <table class="mdl-data-table table responsive table-bordered table-striped datatable" style="width:100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Aviso</th>
                            <th>Fecha Inicio</th>
                            <th>Fecha Fin</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="avisosBody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>  

<?php 
    require_once('./../components/modal.php');
?>