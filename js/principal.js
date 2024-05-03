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

$(document).ready(() => {
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

    new Chart(document.getElementById("bar-chart2"), {
        type: "horizontalBar",
        data: {
            labels: ["Shampoo", "Croquetas Dog Chow", "Correa 1.5 metros", "Bolsas para heces", "Premios ganador"],
            datasets: [
                {
                    label: "Vendidos",
                    backgroundColor: ["#009071", "#009071", "#009071", "#009071", "#009071"],
                    data: [10, 9, 8, 7, 6, 5],
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
});

function activeSubmenu(id_element_submenu) {
    $(".nav-item").attr("class", "nav-item");
    $("#" + id_element_submenu + "_li").attr("class", "nav-item active");
}

function cargaTemplate(id) {
    preloader.show();
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
