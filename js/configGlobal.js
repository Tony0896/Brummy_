const preloader = function () {};

preloader.show = function () {
    $(".modals").modal({ backdrop: "static", keyboard: false });
    $(".modals").modal("show");
    $(".modal").css("z-index", "1050");
    $(".modals").css("z-index", "1056");
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
                    previous: "Anterior",
                    next: "Siguiente",
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
