$(document).ready(() => {
    preloader.hide();

    let estatusAvisos = $("#estatusAvisos").val();
    obtenerAvisos(estatusAvisos);

    $("#estatusAvisos").change(() => {
        obtenerAvisos($("#estatusAvisos").val());
    });
});

function obtenerAvisos(estatus) {
    preloader.show();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/avisos/obtenerAvisos.php",
        data: { estatus },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        dataTableDestroy();
                        $("#avisosBody").html(html);
                        dataTableCreateDes();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        let html;
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${Number(index + 1)}</td>
                                <td class="capitalize">${data.aviso}</td>
                                <td>${FormatDate(data.fechaInicio)}</td>
                                <td>${FormatDate(data.fechaFin)}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-green buttom button-sinText mx-1" title="Ver Detalle" onclick="verDetalleAvisos(${
                                            data.ID
                                        })">
                                            <span class="text-sm mb-0"><i class="material-icons"> edit </i></span>
                                        </div>
                                        <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="eliminarAviso(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#avisosBody").html(html);
                        dataTableCreateDes();
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

function crearNuevoAviso() {
    $("#labelModal").html(`Crear Nuevo Aviso`);

    $("#body_modal").html(`<br>
        <div id="formAvisos">
            <div class="coolinput">
                <label name="Aviso" for="aviso" class="text">Aviso:</label>
                <input name="Aviso" type="text" class="input capitalize obligatorio" id="aviso" autocomplete="off" maxlength"20"/>
            </div>

            <div class="coolinput">
                <label name="Fecha Inicio" for="fechaInicio" class="text">Fecha Inicio:</label>
                <input name="Fecha Inicio" type="date" class="input capitalize obligatorio" id="fechaInicio" autocomplete="off" maxlength"20"/>
            </div>

            <div class="coolinput">
                <label name="Fecha Fin" for="fechaFin" class="text">Fecha Fin:</label>
                <input name="Fecha Fin" type="date" class="input capitalize obligatorio" id="fechaFin" autocomplete="off" maxlength"20"/>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarAviso();">
                <span class="text-sm mb-0 span-buttom"> 
                    Guardar
                    <i class="material-icons"> save </i>
                </span>
            </div>
        </div>
    `);

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

function guardarAviso() {
    let values = get_datos_completos("formAvisos");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let aviso = String($("#aviso").val()).trim();
        let fechaInicio = String($("#fechaInicio").val()).trim();
        let fechaFin = String($("#fechaFin").val()).trim();

        aviso.replaceAll("'", '"');
        fechaInicio.replaceAll("'", '"');
        fechaFin.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/avisos/guardarAviso.php",
            data: { aviso, fechaInicio, fechaFin },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerAvisos($("#estatusAvisos").val());
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
    } else {
        let html =
            '<span style="font-weight: 900;">Debes llenar estos campos para poder guardar:</span> <br> <ul style="text-align: left; margin-left: 15px; font-style: italic;"> ';
        response.forEach((data) => {
            html += `<li style="list-style: disc;">${data}.</li> `;
        });
        html += `</ul>`;
        Swal.fire({ icon: "warning", title: "", html: html });
    }
}

function verDetalleAvisos(ID) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/avisos/verDetalleAvisos.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let aviso, fechaInicio, fechaFin;
            switch (success) {
                case true:
                    result.forEach((data, index) => {
                        aviso = data.aviso;
                        fechaInicio = FormatDate(data.fechaInicio);
                        fechaFin = FormatDate(data.fechaFin);
                    });

                    $("#labelModal").html(`Editar Aviso`);

                    $("#body_modal").html(`<br>
                        <div id="formAvisosModal">
                            <div class="coolinput">
                                <label name="Aviso" for="aviso" class="text">Aviso:</label>
                                <input name="Aviso" type="text" class="input capitalize obligatorio" id="avisoModal" autocomplete="off" maxlength"20"/>
                            </div>

                            <div class="coolinput">
                                <label name="Fecha Inicio" for="fechaInicio" class="text">Fecha Inicio:</label>
                                <input name="Fecha Inicio" type="date" class="input capitalize obligatorio" id="fechaInicioModal" autocomplete="off" maxlength"20"/>
                            </div>

                            <div class="coolinput">
                                <label name="Fecha Fin" for="fechaFin" class="text">Fecha Fin:</label>
                                <input name="Fecha Fin" type="date" class="input capitalize obligatorio" id="fechaFinModal" autocomplete="off" maxlength"20"/>
                            </div>
                        </div>

                        <div class="center-fitcomponent" style="width: 100%;">
                            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarEdicionAviso(${ID});">
                                <span class="text-sm mb-0 span-buttom"> 
                                    Guardar
                                    <i class="material-icons"> save </i>
                                </span>
                            </div>
                        </div>
                    `);

                    $("#avisoModal").val(aviso);
                    $("#fechaInicioModal").val(volteaFecha(fechaInicio, 2));
                    $("#fechaFinModal").val(volteaFecha(fechaFin, 2));

                    $("#modalTemplate").modal({
                        backdrop: "static",
                        keyboard: false,
                    });

                    $("#modalTemplate").modal("show");

                    $("#btnClose").on("click", () => {
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                    });

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

function guardarEdicionAviso(ID) {
    let values = get_datos_completos("formAvisosModal");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let aviso = String($("#avisoModal").val()).trim();
        let fechaInicio = String($("#fechaInicioModal").val()).trim();
        let fechaFin = String($("#fechaFinModal").val()).trim();

        aviso.replaceAll("'", '"');
        fechaInicio.replaceAll("'", '"');
        fechaFin.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/avisos/guardarEdicionAviso.php",
            data: { aviso, fechaInicio, fechaFin, ID },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerAvisos($("#estatusAvisos").val());
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
    } else {
        let html =
            '<span style="font-weight: 900;">Debes llenar estos campos para poder guardar:</span> <br> <ul style="text-align: left; margin-left: 15px; font-style: italic;"> ';
        response.forEach((data) => {
            html += `<li style="list-style: disc;">${data}.</li> `;
        });
        html += `</ul>`;
        Swal.fire({ icon: "warning", title: "", html: html });
    }
}

function eliminarAviso(ID) {
    Swal.fire({
        title: "",
        text: "¿Estás seguro de querer eliminar el registro?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#7066e0",
        cancelButtonColor: "#FF0037",
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            preloader.show();
            $.ajax({
                method: "POST",
                dataType: "JSON",
                url: "./views/avisos/eliminarAviso.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            msj.show("Aviso", "Eliminado correctamente", [{ text1: "OK" }]);
                            obtenerAvisos($("#estatusAvisos").val());
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
    });
}
