// function documentReadyPrincipalController() {
//     $(document).ready(function () {
//         $("#apps_menu").click(function () {
//             preloader.show();
//             // activeSubmenu(this.id);
//             // let clave_menu_n2 = $("#" + this.id).attr("data-clave-menu-n2");
//             cargarTemplateVacantes();
//         });
//     });

//     apps_menu;
//     paid_menu;
//     people_menu;
//     pets_menu;
//     event_menu;
//     inventory_menu;
// }

{
    /* <li class="nav-item" id="apps_menu_li">
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
</li> */
}

$(document).ready(() => {
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/cargaPermisos.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            switch (success) {
                case true:
                    results.forEach((data, index) => {
                        if (data.ID_modulo == 1) {
                            $(".dahsboardContenido").css("display", "flex");
                            cargaDataDash();
                        }

                        if (data.ID_modulo != 1 && data.ID_modulo != 2) {
                            $("#navSide").append(`
                                <li class="nav-item nav_item2" id="${data.id_element}_li">
                                    <a class="nav-link tagAMenu" href="#" id="${data.id_element}" onclick="cargaTemplate(this.id, '${data.permiso}')">
                                        <span class="material-icons me-2"> ${data.icono} </span>
                                        <span class="menu-title">${data.titulo}</span>
                                    </a>
                                </li>
                            `);
                        }
                    });
                    let name = $(".welcome-text span").text();

                    $("#navSide").append(`
                        <li class="nav-item nav-category" style="padding-top: 0px"><hr style="margin: 5px 0px" /></li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="collapse" href="#userOptions" aria-expanded="false" aria-controls="userOptions">
                                <span class="material-icons" style="margin-right: 10px;"> account_circle </span>
                                <span class="menu-title">${name}</span>
                            </a>
                            <div class="collapse" id="userOptions">
                                <ul class="nav flex-column sub-menu">
                                    <li class="nav-item tagAMenu"><a class="nav-link" href="#">My Profile</a></li>
                                    <!-- <li class="nav-item tagAMenu"><a class="nav-link" href="#">FAQ</a></li> -->
                                    <li class="nav-item tagAMenu"><a class="nav-link" href="#" onclick="cerrarSesion()">Cerrar sesión</a></li>
                                </ul>
                            </div>
                        </li>
                    `);

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
});

function cargaDataDash() {
    cargaDataMarquee();

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/dataHeader.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            switch (success) {
                case true:
                    results.forEach((data, index) => {
                        $("#gananciasDia").html(`$ ${CantidadConCommas(Number(data.cuenta).toFixed(2))}`);
                        $("#citasAgendadasCita").html(`${Number(data.cuentaAgenda)}`);
                        $("#citasAtendidasDia").html(`${Number(data.cuentaAtendidas)}`);
                    });

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/getProximasCitas.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let html = "";
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        $("#bodyCitasDashbora").html(html);
                    } else {
                        results.forEach((data, index) => {
                            html += `
                                <tr>
                                    <td>${Number(index + 1)}</td>
                                    <td>${data.nombreCita}</td>
                                    <td>${data.nombreMascota}</td>
                                </tr>
                            `;
                        });

                        $("#bodyCitasDashbora").html(html);
                    }

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/getLastVentas.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let html = "";
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        $("#bodyVentasDashbora").html(html);
                    } else {
                        results.forEach((data, index) => {
                            html += `
                            <tr>
                                <td>${Number(index + 1)}</td>
                                <td>${data.FlagProducto}</td>
                                <td>$ ${CantidadConCommas(Number(data.total).toFixed(2))}</td>
                            </tr>
                        `;
                        });
                        $("#bodyVentasDashbora").html(html);
                    }

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/topProductos.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let colores = [];
            let sumasProductos = [];
            let productos = [];
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                    } else {
                        results.forEach((data, index) => {
                            colores = [...colores, "#009071"];
                            productos = [...productos, data.FlagProducto];
                            sumasProductos = [...sumasProductos, Number(data.suma)];
                        });
                        new Chart(document.getElementById("bar-chart2"), {
                            type: "horizontalBar",
                            data: {
                                labels: productos,
                                datasets: [
                                    {
                                        label: "Vendidos",
                                        backgroundColor: colores,
                                        data: sumasProductos,
                                    },
                                ],
                            },
                            options: {
                                legend: { display: false },
                                title: {
                                    display: true,
                                    text: "",
                                },
                                scales: {
                                    xAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true,
                                            },
                                        },
                                    ],
                                },
                            },
                        });
                    }

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });

    new Chart(document.getElementById("bar-chart"), {
        type: "bar",
        data: {
            labels: ["1 estrellas", "2 estrellas", "3 estrellas", "4 estrellas", "5 estrellas"],
            datasets: [
                {
                    label: "Calificaciones",
                    backgroundColor: ["#009071", "#009071", "#009071", "#009071", "#009071"],
                    data: [0, 0, 0, 2, 3, 5],
                },
            ],
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "",
            },
        },
    });
}

function cargaDataMarquee() {
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/avisos/obtenerAvisosToday.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let htmlAviso = "";
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        $("#texttMarquee").html(
                            `<marquee class="card2"><p class="p_marquee" style="padding-top: 15px;padding-bottom: 15px;margin-bottom: 0;">&nbsp;</p></marquee>`
                        );
                    } else {
                        results.forEach((data, index) => {
                            htmlAviso += data.aviso + `&emsp;- -&emsp;`;
                        });

                        htmlAviso = String(htmlAviso).slice(0, -9);
                        $("#texttMarquee").html(
                            `<marquee class="card2"><p class="p_marquee" style="padding-top: 15px;padding-bottom: 15px;margin-bottom: 0;">${htmlAviso}</p></marquee>`
                        );
                    }
                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function reporteProductosVendidos() {
    $("#labelModal").html(`Reporte Productos más vendidos`);

    $("#body_modal").html(`<br>
        <div>
            <div class="coolinput">
                <label for="fechaReporteInicio" class="text">Fecha Inicio:</label>
                <input name="Fecha" type="text" class="input obligatorio" id="fechaReporteInicio" autocomplete="off" />
            </div>

            <div class="coolinput">
                <label for="fechaReporteFin" class="text">Fecha Fin:</label>
                <input name="Fecha" type="text" class="input obligatorio" id="fechaReporteFin" autocomplete="off" />
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="generarReporteInventario();">
                <span class="text-sm mb-0 span-buttom"> 
                    Generar
                    <i class="material-icons"> file_download </i>
                </span>
            </div>
        </div>
    `);

    $("#fechaReporteInicio").duDatepicker({ format: "dd-mm-yyyy", clearBtn: true, cancelBtn: true });
    $("#fechaReporteFin").duDatepicker({ format: "dd-mm-yyyy", clearBtn: true, cancelBtn: true });

    $("#modalTemplate").modal({
        backdrop: "static",
        keyboard: false,
    });

    $("#modalTemplate").modal("show");

    $("#btnClose").on("click", () => {
        $("#modalTemplate").modal("hide");
        $("#btnClose").off("click");
    });
}

function generarReporteInventario() {
    if (!$("#fechaReporteInicio").val() || !$("#fechaReporteInicio").val()) {
        // msj.show("Aviso", ".", [{ text1: "OK" }]);
        Swal.fire({
            icon: "warning",
            title: "Aviso",
            text: "Debes indicar una Fecha Inicio y una Fecha Fin a buscar.",
        });
        return false;
    }

    let fechaReporteInicio = volteaFecha($("#fechaReporteInicio").val(), 2);
    let fechaReporteFin = volteaFecha($("#fechaReporteFin").val(), 2);
    preloader.show();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/inventario/generarReporteInventario.php",
        data: { fechaReporteInicio, fechaReporteFin },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        msj.show("Aviso", "No se encontró información en este rango de fechas.", [{ text1: "OK" }]);
                        preloader.hide();
                    } else {
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td data-b-b-s="thin" data-b-l-s="thin" data-b-r-s="thin" data-a-wrap="true">${Number(index + 1)}</td>
                                <td data-b-b-s="thin" data-b-l-s="thin" data-b-r-s="thin" data-a-wrap="true">${data.FlagProducto}</td>
                                <td data-b-b-s="thin" data-b-l-s="thin" data-b-r-s="thin" data-a-wrap="true">${data.suma}</td>
                            </tr>`;
                        });

                        $("#tbodyExportInventario").html(html);
                        let table = document.getElementsByClassName("tableExport");
                        let now = String(Date.now());
                        let lastFive = now.substr(now.length - 8);
                        TableToExcel.convert(table[0], {
                            name: `Reporte_${lastFive}.xlsx`,
                            sheet: {
                                name: "Ventas",
                            },
                        });
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        preloader.hide();
                    }
                    break;
                case false:
                    preloader.hide();
                    msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function activeSubmenu(id_element_submenu) {
    $(".nav-item.nav_item2").attr("class", "nav-item nav_item2");
    $("#" + id_element_submenu + "_li").attr("class", "nav-item nav_item2 active");
}

function cargaTemplate(id, permiso) {
    preloader.show();
    cargaDataMarquee();
    switch (id) {
        case "apps_menu":
            cargarTemplateCatalogos();
            activeSubmenu(id);
            break;

        case "paid_menu":
            cargaTemplateVentas();
            activeSubmenu(id);
            break;

        case "people_menu":
            cargaTemplateClientes();
            activeSubmenu(id);
            break;

        case "pets_menu":
            cargaTemplateMascotas();
            activeSubmenu(id);
            break;

        case "event_menu":
            cargaTemplateCitas();
            activeSubmenu(id);
            break;

        case "inventory_menu":
            cargaTemplateInventario();
            activeSubmenu(id);
            break;

        case "grade_menu":
            cargaTemplateEncuestas();
            activeSubmenu(id);
            break;

        case "bar_chart_menu":
            cargaTemplateKPI();
            activeSubmenu(id);
            break;

        case "campaign_menu":
            cargaTemplateAvisos();
            activeSubmenu(id);
            break;

        case "store_menu":
            cargaTemplatePerfilStore();
            activeSubmenu(id);
            break;

        case "person_menu":
            cargaTemplateFrecuentes();
            activeSubmenu(id);
            break;

        default:
            preloader.hide();
            console.log("sin menu");
            // Swal.fire({ icon: "warning", title: "", text: "Algo salio mal vuelve a intentarlo." })
            break;
    }
}

function cargarTemplateCatalogos() {
    $("#contenido").load("templates/catalogos/catalogos.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateVentas() {
    $("#contenido").load("templates/ventas/ventas.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}
function cargaTemplateClientes() {
    $("#contenido").load("templates/clientes/clientes.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}
function cargaTemplateMascotas() {
    $("#contenido").load("templates/mascotas/mascotas.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateCitas() {
    $("#contenido").load("templates/citas/citas.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateInventario() {
    $("#contenido").load("templates/inventario/inventario.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateEncuestas() {
    $("#contenido").load("templates/encuestas/encuestas.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateKPI() {
    $("#contenido").load("templates/satisfaccion/satisfaccion.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateAvisos() {
    $("#contenido").load("templates/avisos/avisos.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplatePerfilStore() {
    $("#contenido").load("templates/store/store.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateFrecuentes() {
    $("#contenido").load("templates/frecuentes/frecuentes.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}
