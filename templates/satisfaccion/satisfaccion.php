<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// session_start();
?>
<script type="text/javascript" src="./functions/satisfaccion/satisfaccion.js"></script>
    <div class="row" style="margin-bottom: 0.7em;">
        <div class="col-md-9 mb-2" style="display: flex;align-items: center;">
            <h4 class="card-title mb-0">KPI Satisfacción</h4>
        </div>
    </div>

    <div class="card2">
        <div class="card-body">
            <div class="row mb-4">
                <div class="col-md-3 mb-2">
                    <div class="coolinput">
                        <label for="mesEncuesta" class="text">Mes:</label>
                        <select class="input capitalize" id="mesEncuesta" style="background-color: rgb(255, 255, 255);width:100%;">
                            <option value="">Selecciona una opción</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-3 mb-2">
                    <div class="coolinput">
                        <label for="anioEncuesta" class="text">Año:</label>
                        <select class="input capitalize" id="anioEncuesta" style="background-color: rgb(255, 255, 255);width:100%;">
                            <option value="">Selecciona una opción</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-sm-12 mb-4">
                    <div class="statistics-details d-flex align-items-center justify-content-between">
                        <div>
                            <p class="statistics-title">Encuestas generadas</p>
                            <h3 class="rate-percentage" id="encuestasGeneradas">0</h3>
                        </div>
                        <div>
                            <p class="statistics-title">Encuestas contestadas</p>
                            <h3 class="rate-percentage" id="encuestasContestadas">0</h3>
                        </div>
                        <div>
                            <p class="statistics-title">Encuestas por contestar</p>
                            <h3 class="rate-percentage" id="encuestasPorContestar">0</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-sm-6 mb-4">
                    <canvas id="bar-chart_gg" width="800" height="450"></canvas>
                </div>
                <div class="col-sm-6 mb-4">
                    <div class="forms-sample">
                        <table class="mdl-data-table table responsive table-bordered table-striped" style="width:100%">
                            <thead>
                                <tr>
                                    <th style="background-color: #009071;color: #fff; padding: 10px;">Calificación</th>
                                    <th style="background-color: #009071;color: #fff; padding: 10px;">Cuenta</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>5 estrellas</td>
                                    <td id="5_estrellas"> 0 </td>
                                </tr>
                                <tr>
                                    <td>4 estrellas</td>
                                    <td id="4_estrellas"> 0 </td>
                                </tr>
                                <tr>
                                    <td>3 estrellas</td>
                                    <td id="3_estrellas"> 0 </td>
                                </tr>
                                <tr>
                                    <td>2 estrellas</td>
                                    <td id="2_estrellas"> 0 </td>
                                </tr>
                                <tr>
                                    <td>1 estrellas</td>
                                    <td id="1_estrellas"> 0 </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-sm-12 mb-4">
                    <div class="forms-sample">
                        <table class="mdl-data-table table responsive table-bordered table-striped datatable" style="width:100%">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Pregunta</th>
                                    <th>Calificación</th>
                                    <th>Gráfica</th>
                                </tr>
                            </thead>
                            <tbody id="preguntasBody">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>
    

<?php 
    require_once('./../components/modal.php');
?>