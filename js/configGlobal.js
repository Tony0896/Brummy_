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
