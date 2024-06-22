$(document).ready(() => {
    // preloader.hide();
    obtenerEspecies();
    obtenerRazas();
    obtenerMotivos();
    // obtenerMotivosRechazo();
});

function crearNuevaEspecie() {
    $("#labelModal").html(`Crear Nueva Especie`);

    $("#body_modal").html(`<br>
        <div id="formEspecies">
            <div class="coolinput">
                <label name="Nombre Especie" for="nombreEspecie" class="text">Nombre Especie</label>
                <input name="Nombre Especie" type="text" class="capitalize obligatorio input" id="nombreEspecie" autocomplete="off" maxlength"50"/>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarEspecie();">
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

function guardarEspecie() {
    let values = get_datos_completos("formEspecies");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombreEspecie = String($("#nombreEspecie").val()).trim();

        nombreEspecie.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/catalogos/guardarEspecie.php",
            data: { nombreEspecie },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerEspecies();
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

function obtenerEspecies() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerEspecies.php",
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
                        $("#especiesBody").html(html);
                        dataTableCreate();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.nombreEspecie}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="deleteEspecie(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#especiesBody").html(html);
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

function obtenerRazas() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerRazas.php",
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
                        $("#razasBody").html(html);
                        dataTableCreate();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.nombreRaza}</td>
                                <td class="capitalize">${data.especie}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="deleteRaza(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#razasBody").html(html);
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

function crearNuevaRaza() {
    preloader.show();

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerEspecies.php",
        data: {},
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                    } else {
                        let html = "";
                        result.forEach((data, index) => {
                            html += `<option value="${data.ID}">${data.nombreEspecie}</option>`;
                        });

                        $("#labelModal").html(`Crear Nueva Raza`);

                        $("#body_modal").html(`<br>
                            <div id="formRazas">
                                <div class="coolinput">
                                    <label name="Nombre Raza" for="nombreRaza" class="text">Nombre Raza</label>
                                    <input name="Nombre Raza" type="text" class="input capitalize obligatorio" id="nombreRaza" autocomplete="off" maxlength"50"/>
                                </div>

                                <div class="coolinput">
                                    <label for="relacionEspecie" class="text">Relación Especie</label>
                                    <select class="input capitalize obligatorio" name="Relación Especie" id="relacionEspecie" style="background-color: rgb(255, 255, 255);width:100%;">
                                        <option value="">Selecciona una opción</option>
                                        ${html}
                                    </select>
                                </div>
                            </div>

                            <div class="center-fitcomponent" style="width: 100%;">
                                <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarRaza();">
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

                        $("#relacionEspecie").select2({
                            dropdownParent: $("#modalTemplate"),
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

function guardarRaza() {
    let values = get_datos_completos("formRazas");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombreRaza = String($("#nombreRaza").val()).trim();
        let FK_especie = $("#relacionEspecie").val();
        let especie = $("#relacionEspecie").find("option:selected").text();

        nombreRaza.replaceAll("'", '"');
        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/catalogos/guardarRaza.php",
            data: { nombreRaza, FK_especie, especie },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerRazas();
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

function deleteEspecie(ID) {
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
                url: "./views/catalogos/deleteEspecie.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            obtenerEspecies();
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

function deleteRaza(ID) {
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
                url: "./views/catalogos/deleteRaza.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            obtenerRazas();
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

function obtenerMotivos() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerMotivos.php",
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
                        $("#motivosCitaBody").html(html);
                        dataTableCreate();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.motivoCita}</td>
                                <td >${data.tiempoPromedio}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="deleteMotivoCita(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
                                        </div>
                                        <div class="buttom-blue buttom button-sinText mx-1" title="Editar" onclick="editMotivoCita(${data.ID} ,'${data.motivoCita}' , '${data.tiempoPromedio}' )">
                                            <span class="text-sm mb-0"><i class="material-icons"> edit </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#motivosCitaBody").html(html);
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

function crearNuevoMotivo() {
    $("#labelModal").html(`Crear Nuevo Motivo de Cita`);

    $("#body_modal").html(`<br>
        <div id="formMotivoCita">
            <div class="coolinput">
                <label name="Motivo" for="motivo" class="text">Motivo</label>
                <input name="Motivo" type="text" class="capitalize obligatorio input" id="motivo" autocomplete="off" maxlength"50"/>
            </div>
            <div class="coolinput" id="">
                <label for="horaCita" class="text">Tiempo promedio Motivo:</label>
                <input type="text" name="Hora" class="input obligatorio" id="tiempoPromedioMotivo" autocomplete="off"/>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarMotivoCita();">
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

    $("#tiempoPromedioMotivo").mdtimepicker({
        timeFormat: "hh:mm:ss", // format of the time value (data-time attribute)
        format: "hh:mm", // format of the input value
        theme: "blue", // theme of the timepicker
        clearBtn: true, // determines if clear button is visible
        is24hour: true, // determines if the clock will use 24-hour format in the UI; format config will be forced to `hh:mm` if not specified
    });

    $("#modalTemplate").modal("show");

    $("#btnClose").on("click", () => {
        $("#modalTemplate").modal("hide");
        $("#btnClose").off("click");
    });
}

function guardarMotivoCita() {
    let values = get_datos_completos("formMotivoCita");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let motivoCita = String($("#motivo").val()).trim();
        let tiempoPromedio = $("#tiempoPromedioMotivo").val();

        motivoCita.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/catalogos/guardarMotivoCita.php",
            data: { motivoCita , tiempoPromedio },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerMotivos();
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

function deleteMotivoCita(ID) {
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
                url: "./views/catalogos/deleteMotivoCita.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            obtenerMotivos();
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

function obtenerMotivosRechazo() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerMotivosRechazo.php",
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
                        $("#rechazosCitaBody").html(html);
                        dataTableCreate();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.motivoRechazo}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="deleteMotivoRechazo(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#rechazosCitaBody").html(html);
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

function crearNuevoMotivoRechazo() {
    $("#labelModal").html(`Crear Nuevo Motivo de Rechazo`);

    $("#body_modal").html(`<br>
        <div id="formMotivoCitaRechazo">
            <div class="coolinput">
                <label name="MotivoRechazo" for="motivoRechazo" class="text">Motivo Rechazo</label>
                <input name="Motivo Rechazo" type="text" class="capitalize obligatorio input" id="motivoRechazo" autocomplete="off" maxlength"50"/>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarMotivoRechazo();">
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

function guardarMotivoRechazo() {
    let values = get_datos_completos("formMotivoCitaRechazo");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let motivoRechazo = String($("#motivoRechazo").val()).trim();

        motivoRechazo.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/catalogos/guardarMotivoRechazo.php",
            data: { motivoRechazo },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerMotivosRechazo();
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

function deleteMotivoRechazo(ID) {
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
                url: "./views/catalogos/deleteMotivoRechazo.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            obtenerMotivosRechazo();
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


function editMotivoCita(idCita , motivoCita , tiempoPromedio) {
    $("#labelModal").html(`Editar Motivo de Cita`);

    $("#body_modal").html(`<br>
        <div id="formMotivoCita">
            <div class="coolinput">
                <label name="Motivo" for="motivo" class="text">Motivo</label>
                <input name="Motivo" type="text" class="capitalize obligatorio input" id="motivoEdit" autocomplete="off" maxlength"50"/ value ="${motivoCita}">
            </div>
            <div class="coolinput" id="">
                <label for="horaCita" class="text">Tiempo promedio Motivo:</label>
                <input type="text" name="Hora" class="input obligatorio" id="tiempoPromedioMotivoEdit" autocomplete="off"/ value ="${tiempoPromedio}">
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="updateMotivoCita(${idCita});">
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

    $("#tiempoPromedioMotivoEdit").mdtimepicker({
        timeFormat: "hh:mm:ss", // format of the time value (data-time attribute)
        format: "hh:mm", // format of the input value
        theme: "blue", // theme of the timepicker
        clearBtn: true, // determines if clear button is visible
        is24hour: true, // determines if the clock will use 24-hour format in the UI; format config will be forced to `hh:mm` if not specified
    });

    $("#modalTemplate").modal("show");

    $("#btnClose").on("click", () => {
        $("#modalTemplate").modal("hide");
        $("#btnClose").off("click");
    });
}

function updateMotivoCita(idCita) {
    preloader.show();
    console.log(idCita);

    let nuevoMotivo = $("#motivoEdit").val();
    let tiempoPromedioMotivoEdit = $("#tiempoPromedioMotivoEdit").val();
    console.log(nuevoMotivo);
    console.log(tiempoPromedioMotivoEdit);

    axios
        .post("./views/catalogos/updateMotivoCita.php", { ID: idCita  ,motivoCita : nuevoMotivo, tiempoPromedio : tiempoPromedioMotivoEdit })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                let success = response.data.success;
                let result = response.data.result;

                switch (success) {
                    case true:
                        if (result == "Sin Datos") {
                            obtenerMotivos();
                            msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                            $("#modalTemplate").modal("hide");
                            preloader.hide();
                        } 
                        break;
                    case false:
                        preloader.hide();
                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        break;
                }
            }
        })
        .catch((error) => {
            preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            // console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
            console.error("Ocurrio un error : " + error);
        })
        .finally(() => {
            // siempre sera ejecutado
        });

}