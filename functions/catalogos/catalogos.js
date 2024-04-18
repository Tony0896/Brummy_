$(document).ready(() => {
    // preloader.hide();
    obtenerEspecies();
    obtenerRazas();
});

function crearNuevaEspecie() {
    $("#labelModal").html(`Crear Nueva Especie`);

    $("#body_modal").html(`<br>
        <div id="formEspecies">
            <div class="form-floating mb-1 mt-1">
                <input type="text" class="form-control capitalize obligatorio" id="nombreEspecie" autocomplete="off" placeholder="Nombre Especie" onchange="pintaInput(this.id)" maxlength"50"/>
                <label name="Nombre Especie" for="nombreEspecie" class="labelFloating">Nombre Especie</label>
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
                        Swal.fire({ icon: "success", title: "Guardado correctamente.", text: "" });
                        obtenerEspecies();
                        break;
                    case false:
                        preloader.hide();
                        Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
                        break;
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                preloader.hide();
                Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
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
                        let html;
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
                    Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            preloader.hide();
            Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
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
                        let html;
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
                    Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            preloader.hide();
            Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
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
                                <div class="form-floating mb-1 mt-1">
                                    <input type="text" class="form-control capitalize obligatorio" id="nombreRaza" autocomplete="off" placeholder="Nombre Raza" onchange="pintaInput(this.id)" maxlength"50"/>
                                    <label name="Nombre Raza" for="nombreRaza" class="labelFloating">Nombre Raza</label>
                                </div>

                                <div class="form-floating mb-1 mt-1">
                                    <select class="form-control capitalize obligatorio" name="Relación Especie" id="relacionEspecie" placeholder="Relación Especie" onchange="pintaInput(this.id)" style="background-color: rgb(255, 255, 255);width:100%;">
                                        <option value="">Selecciona una opción</option>
                                        ${html}
                                    </select>
                                    <label for="relacionEspecie" class="labelFloating">Relación Especie</label>
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
                    Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            preloader.hide();
            Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
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
                        Swal.fire({ icon: "success", title: "Guardado correctamente.", text: "" });
                        obtenerRazas();
                        break;
                    case false:
                        preloader.hide();
                        Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
                        break;
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                preloader.hide();
                Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
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
                            Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
                            break;
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    preloader.hide();
                    Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
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
                            Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
                            break;
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    preloader.hide();
                    Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
                    console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
                });
        }
    });
}
