<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// session_start();
?>
<script type="text/javascript" src="./functions/frecuentes/frecuentes.js"></script>
    <div class="card2">
        <div class="card-body">
            <div class="forms-sample">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
                            Citas
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
                            Compras
                        </button>
                    </li>
                </ul>
                <div class="tab-content px-0 pt-0 pb-0" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">  
                        <div class="row" style="margin-bottom: 0.7em;">
                            <div class="col-md-3 mb-2" style="display: flex;">
                                <div class="coolinput" style="width: 100%;">
                                    <label for="filtroCitas" class="text">TOP: </label>
                                    <select class="input capitalize obligatorio" name="filtroCitas" id="filtroCitas" style="background-color: rgb(255, 255, 255);width:100%;">
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="TODOS">TODOS</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 mb-2" style="display: flex;">
                                <div class="coolinput" style="width: 100%;">
                                    <label for="filtroAnioCitas" class="text">Año: </label>
                                    <select class="input capitalize obligatorio" name="filtroAnioCitas" id="filtroAnioCitas" style="background-color: rgb(255, 255, 255);width:100%;">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 mb-2" style="display: flex;">
                                <div class="coolinput" style="width: 100%;">
                                    <label for="filtroMesCitas" class="text">Mes: </label>
                                    <select class="input capitalize obligatorio" name="filtroMesCitas" id="filtroMesCitas" style="background-color: rgb(255, 255, 255);width:100%;">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 mb-2" style="display: flex;"> &nbsp; </div>
                        </div>
                        <table class="mdl-data-table table responsive table-bordered table-striped datatable" style="width:100%">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Citas Agendadas</th>
                                </tr>
                            </thead>
                            <tbody id="frecuentesCitasBody">
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"> 
                        <div class="row" style="margin-bottom: 0.7em;">
                            <div class="col-md-3 mb-2" style="display: flex;">
                                <div class="coolinput" style="width: 100%;">
                                    <label for="filtroCompras" class="text">TOP: </label>
                                    <select class="input capitalize obligatorio" name="filtroCompras" id="filtroCompras" style="background-color: rgb(255, 255, 255);width:100%;">
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="TODOS">TODOS</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 mb-2" style="display: flex;">
                                <div class="coolinput" style="width: 100%;">
                                    <label for="filtroAnioCompras" class="text">Año: </label>
                                    <select class="input capitalize obligatorio" name="filtroAnioCompras" id="filtroAnioCompras" style="background-color: rgb(255, 255, 255);width:100%;">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 mb-2" style="display: flex;">
                                <div class="coolinput" style="width: 100%;">
                                    <label for="filtroMesCompras" class="text">Mes: </label>
                                    <select class="input capitalize obligatorio" name="filtroMesCompras" id="filtroMesCompras" style="background-color: rgb(255, 255, 255);width:100%;">
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3 mb-2" style="display: flex;"> &nbsp; </div>
                        </div>
                        <table class="mdl-data-table table responsive table-bordered table-striped datatable" style="width:100%">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Total Compras</th>
                                    <th>Productos</th>
                                    <th>Suma de Compras</th>
                                </tr>
                            </thead>
                            <tbody id="frecuentesComprasBody">
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