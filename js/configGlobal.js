const preloader = function () {};

preloader.show = function () {
    $(".modals").modal({ backdrop: "static", keyboard: false });
    $(".modals").modal("show");
    $(".modal").css("z-index", "1040");
    $(".modals").css("z-index", "1056");
    $(".modalAlerts").css("z-index", "1057");
};

preloader.hide = function () {
    setTimeout(function () {
        $(".modal").css("z-index", "1051");
        $(".modals").modal("hide");
        $(".modals").data("bs.modal", null);
        $(".modalAlerts").css("z-index", "1057");
    }, 1000);
};

function dataTableCreate() {
    $(".datatable")
        .DataTable({
            responsive: true,
            language: {
                lengthMenu: "_MENU_ registros por pagina",
                zeroRecords: "No hay resultados",
                info: "Pagina _PAGE_ de _PAGES_",
                infoEmpty: "No hay registros disponibles",
                infoFiltered: "(Mostrar _MAX_ registros)",
                paginate: {
                    previous: "‹",
                    next: "›",
                },
                aria: {
                    paginate: {
                        previous: "Previous",
                        next: "Next",
                    },
                },
                search: "Buscar",
            },
            order: [[0, "asc"]],
        })
        .draw();
    preloader.hide();
}

function dataTableCreateDes() {
    $(".datatable")
        .DataTable({
            responsive: true,
            language: {
                lengthMenu: "_MENU_ registros por pagina",
                zeroRecords: "No hay resultados",
                info: "Pagina _PAGE_ de _PAGES_",
                infoEmpty: "No hay registros disponibles",
                infoFiltered: "(Mostrar _MAX_ registros)",
                paginate: {
                    previous: "‹",
                    next: "›",
                },
                aria: {
                    paginate: {
                        previous: "Previous",
                        next: "Next",
                    },
                },
                search: "Buscar",
            },
            order: [[0, "desc"]],
        })
        .draw();
    preloader.hide();
}

function dataTableDestroy() {
    $(".datatable").DataTable().destroy();
}

$(".tagAMenu").click(function (e) {
    e.preventDefault();
});

function get_datos_completos(form) {
    let campos;
    let trae_los_campos_sin_llennar = [];
    campos = document.querySelectorAll("#" + form + " .obligatorio");
    let valido = true;

    [].slice.call(campos).forEach(function (campo) {
        if ($(campo).get(0).tagName == "SELECT") {
            if (campo.value.trim() == 0 || campo.value.trim() == "") {
                valido = false;
                trae_los_campos_sin_llennar = [...trae_los_campos_sin_llennar, $(campo).attr("name")];
            }
        } else if ($(campo).get(0).tagName == "TEXTAREA") {
            if (campo.value.trim() === "") {
                valido = false;
                trae_los_campos_sin_llennar = [...trae_los_campos_sin_llennar, $(campo).attr("name")];
            }
        } else {
            if (campo.value.trim() === "") {
                valido = false;
                trae_los_campos_sin_llennar = [...trae_los_campos_sin_llennar, $(campo).attr("name")];
            }
        }
    });

    if (valido) {
        return {
            valido: valido,
            reponse: 1,
        };
    } else {
        return {
            valido: valido,
            response: trae_los_campos_sin_llennar,
        };
    }
}

const msj = function () {};

msj.show = function (title, subtile, buttons) {
    let buttonOne = "",
        buttonTwo = "";
    $("#titleAlert").html(title);
    $("#subtitleAlert").html(subtile);
    buttons[0].text2
        ? ((buttonTwo = `<button class="reject cookie-button acceptOne">${buttons[0].text2}</button>`),
          (buttonOne = `<button class="accept cookie-button">${buttons[0].text1}</button>`))
        : (buttonOne = `<button class="accept cookie-button px-3 acceptOne" style="width: fit-content;">${buttons[0].text1}</button>`);

    $("#btnAlert").html(buttonOne + buttonTwo);
    $("#modalAlert").modal("show");

    $(".acceptOne").on("click", () => {
        $("#modalAlert").modal("hide");
    });
};

function capitalizeLetras(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function genRandom() {
    const digitHundreds = Math.floor(Math.random() * 900) + 1;
    let digitTens = Math.floor(Math.random() * 9);
    if (digitTens >= digitHundreds) digitTens++;
    let digitUnits = Math.floor(Math.random() * 8);
    if (digitUnits >= digitHundreds || digitUnits >= digitTens) digitUnits++;
    if (digitUnits >= digitHundreds && digitUnits >= digitTens) digitUnits++;
    return digitHundreds * 100 + digitTens * 10 + digitUnits;
}

function FormatDate(fecha) {
    let n = new Date(fecha);
    n = String(n.toLocaleString("es-CL")).split(",")[0];
    return n;
}

function volteaFecha(fecha, tipo) {
    if (tipo == 1) {
        //? recibe 2024-04-27 => 27-04-2024
        let anio = fecha.split("-")[0];
        let mes = fecha.split("-")[1];
        let day = fecha.split("-")[2];

        let nuevaFecha = day + "-" + mes + "-" + anio;
        return nuevaFecha;
    } else if (tipo == 2) {
        //? recibe 27-04-2024 => 2024-04-27
        let anio = fecha.split("-")[2];
        let mes = fecha.split("-")[1];
        let day = fecha.split("-")[0];

        let nuevaFecha = anio + "-" + mes + "-" + day;
        return nuevaFecha;
    }
}

localStorage.removeItem("btnHideDash");

$("#btnHideDash").click(() => {
    if (localStorage.getItem("btnHideDash")) {
        if (localStorage.getItem("btnHideDash") == 1) {
            localStorage.setItem("btnHideDash", 0);
        } else if (localStorage.getItem("btnHideDash") == 0) {
            localStorage.setItem("btnHideDash", 1);
        }
    } else {
        localStorage.setItem("btnHideDash", 1);
    }
});

function changeViewMenuIcon() {
    $("#btnHideDash").trigger("click");
}
