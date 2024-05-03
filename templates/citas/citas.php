<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// session_start();
?>
<style>
    table {
        width: 100%;
        text-wrap: nowrap;
        user-select: none;
        border-radius: 10px !important;
        box-shadow: 0 0 0 0 rgba(90, 113, 208, 0.11), 0 4px 16px 0 rgba(167, 175, 183, 0.33) !important;
        -webkit-box-shadow: 0 0 0 0 rgba(90, 113, 208, 0.11), 0 4px 16px 0 rgba(167, 175, 183, 0.33) !important;
        -moz-box-shadow: 0 0 0 0 rgba(90, 113, 208, 0.11), 0 4px 16px 0 rgba(167, 175, 183, 0.33) !important;
        -ms-box-shadow: 0 0 0 0 rgba(90, 113, 208, 0.11), 0 4px 16px 0 rgba(167, 175, 183, 0.33) !important;
    }
    td#dayNowBrummy {
        color: #0277bd;
    }
    td#dayNowBrummy.jsCalendar-current {
        background-color: #009071;
        border-radius: 18px;
        color: #fff;
    }
    .jsCalendar tbody td.jsCalendar-selected {
        background-color: #0277bdbd;
        color: #fff !important;
    }
    thead {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .card {
        box-shadow: none;
        background-color: transparent;
    }
    .jsCalendar tbody td:hover {
        cursor: pointer;
    }
</style>
<script type="text/javascript" src="./functions/citas/citas.js"></script>
<div class="accordion" id="accordionExample">
    <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
            <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                id="tnAcordionCalendar"
                style="background-color: #009071 !important;color: #FFF;font-weight: bold;border-radius: 10px;"
            >
            </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div style="display: flex;justify-content: center;padding-bottom: 15px;padding-top: 10px;">
                <div class="auto-jsCalendar material-theme green" id="calendar" data-language="es"></div>
                <input type="hidden" id="fechaActual">
            </div>
        </div>
    </div>
</div>

<!-- <div class="forms-sample" style="text-align: center; align-items: center; display: flex; justify-content: center; width: 100%">
    <div class="auto-jsCalendar material-theme green" id="calendar" data-language="es"></div>
</div> -->
<div class="row mt-3">
    <div class="col-md-12 mb-0" style="padding: 0;">
        <div class="card">
            <div class="card-body" style="padding: 0;">
                <div class="divNotas">
                    <h4 class="card-title">Citas Agendadas</h4>
                    <div class="buttom-green buttom" id="btnNuevaCita">
                        <span class="text-sm mb-0">Nueva <i class="material-icons"> add_circle </i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="divEventos">
    
</div>


<!-- <button id="my-button-a">Select</button>
<button id="my-button-b">Unselect</button>
<button id="my-button-c">Clear</button>
<button id="my-button">Set date</button>
<button id="my-button-d">Goto</button> -->
<?php 
    require_once('./../components/modal.php');
?>
