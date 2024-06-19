$(document).ready(() => {
    preloader.hide();
    obtenerEncuestas();
});

function nuevaPregunta() {
    $("#labelModal").html(`Agregar pregunta a encuesta`);

    $("#body_modal").html(`<br>
        <div id="formPreguntas">
            <div class="coolinput">
                <label name="Pregunta" for="pregunta" class="text">Pregunta</label>
                <input name="Pregunta" type="text" class="input capitalize obligatorio" id="pregunta" autocomplete="off" maxlength"50"/>
            </div>

            <div class="coolinput" style="display: none;">
                <label for="tipoPregunta" class="text">Tipo Pregunta</label>
                <select class="input capitalize obligatorio" name="Tipo Pregunta" id="tipoPregunta" style="background-color: rgb(255, 255, 255);width:100%;">
                    <option value="">Selecciona una opción</option>
                    <option value="1" selected>Opciones</option>
                    <option value="2">Abierta</option>
                </select>
            </div>

        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarPregunta();">
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

    preloader.hide();
}

function guardarPregunta() {
    let values = get_datos_completos("formPreguntas");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let pregunta = String($("#pregunta").val());
        let tipoPregunta = String($("#tipoPregunta").val());

        pregunta.replaceAll("'", '"');
        tipoPregunta.replaceAll("'", '"');

        preloader.show();
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/encuestas/guardarPregunta.php",
            data: { pregunta, tipoPregunta },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerEncuestas();
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

function obtenerEncuestas() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/encuestas/obtenerEncuestas.php",
        data: {},
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        dataTableDestroy();
                        $("#encuestaBody").html(html);
                        dataTableCreate();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.Pregunta}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-blue buttom button-sinText mx-1" title="Editar Pregunta" onclick="verPregunta(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> edit </i></span>
                                        </div>

                                        <div class="buttom-red buttom button-sinText mx-1" title="Eliminar Pregunta" onclick="eliminarPregunta(${
                                            data.ID
                                        })">
                                            <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#encuestaBody").html(html);
                        dataTableCreate();
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

function eliminarPregunta(ID) {
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
                url: "./views/encuestas/eliminarPregunta.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            obtenerEncuestas();
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

function verPregunta(ID) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/encuestas/obtenerDataEncuesta.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;

            let preguntaModal;
            let tipoPreguntaModal;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                    } else {
                        result.forEach((data, index) => {
                            preguntaModal = data.Pregunta;
                            tipoPreguntaModal = data.tipoPregunta;
                        });

                        $("#labelModal").html(`Editar pregunta`);

                        $("#body_modal").html(`<br>
                            <div id="formPreguntas">
                                <div class="coolinput">
                                    <label name="Pregunta" for="pregunta" class="text">Pregunta</label>
                                    <input name="Pregunta" type="text" class="input capitalize obligatorio" id="preguntaModal" autocomplete="off" maxlength"50"/>
                                </div>

                                <div class="coolinput" style="display: none;">
                                    <label for="tipoPregunta" class="text">Tipo Pregunta</label>
                                    <select class="input capitalize obligatorio" name="Tipo Pregunta" id="tipoPreguntaModal" style="background-color: rgb(255, 255, 255);width:100%;">
                                        <option value="">Selecciona una opción</option>
                                        <option value="1">Opciones</option>
                                        <option value="2">Abierta</option>
                                    </select>
                                </div>

                            </div>

                            <div class="center-fitcomponent" style="width: 100%;">
                                <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="actualizarPregunta(${ID});">
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

                        $("#preguntaModal").val(preguntaModal);
                        $("#tipoPreguntaModal").val(tipoPreguntaModal);

                        $("#modalTemplate").modal("show");

                        $("#btnClose").on("click", () => {
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                        });

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

function actualizarPregunta(ID) {
    let pregunta = $("#preguntaModal").val();
    let tipoPregunta = $("#tipoPreguntaModal").val();

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/encuestas/actualizarPregunta.php",
        data: { ID, pregunta, tipoPregunta },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    $("#modalTemplate").modal("hide");
                    $("#btnClose").off("click");
                    msj.show("Aviso", "Actualizada correctamente", [{ text1: "OK" }]);
                    obtenerEncuestas();
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
