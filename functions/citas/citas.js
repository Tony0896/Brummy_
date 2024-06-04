$(document).ready(() => {
    preloader.hide();

    let myCalendar = jsCalendar.new("#calendar", "now", {
        language: "es",
        dayFormat: "DD",
    });

    $(".jsCalendar-current").attr("id", "dayNowBrummy");

    // myCalendar.select(["01/04/2024", "02/04/2024", "03/04/2024", "05/04/2024"]);

    myCalendar.onDateClick(function (event, date) {
        let dateOld = $("#fechaActual").val();
        let monthOld = dateOld.split("-")[1];
        let yearOld = dateOld.split("-")[2];
        let dateSelected;
        let year = new Date(date).toLocaleDateString("es-MX", { year: "numeric" });
        let month = new Date(date).toLocaleDateString("es-MX", {
            month: "2-digit",
        });
        let day = new Date(date).toLocaleDateString("es-MX", { day: "2-digit" });

        dateSelected = day + "-" + month + "-" + year;
        myCalendar.set(dateSelected);
        $("#fechaActual").val(dateSelected);
        if (monthOld != month || yearOld != year) {
            cargaEventosMes(dateSelected);
        }
        recargaEventosDay(dateSelected);
        let nuevaFecha = new Date(date);

        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

        let fechaText = nuevaFecha.toLocaleDateString("es-MX", options);

        $("#tnAcordionCalendar").html(fechaText);
    });

    myCalendar.onMonthChange(function (event, date) {
        let dateOld = $("#fechaActual").val();
        let monthOld = dateOld.split("-")[1];
        let yearOld = dateOld.split("-")[2];
        let dateSelected;
        let year = new Date(date).toLocaleDateString("es-MX", { year: "numeric" });
        let month = new Date(date).toLocaleDateString("es-MX", {
            month: "2-digit",
        });
        let day = new Date(date).toLocaleDateString("es-MX", { day: "2-digit" });
        dateSelected = day + "-" + month + "-" + year;
        myCalendar.set(dateSelected);
        $("#fechaActual").val(dateSelected);
        if (monthOld != month || yearOld != year) {
            cargaEventosMes(dateSelected);
        }
        recargaEventosDay(dateSelected);
        let nuevaFecha = new Date(date);

        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

        let fechaText = nuevaFecha.toLocaleDateString("es-MX", options);

        $("#tnAcordionCalendar").html(fechaText);
    });

    let nuevaFecha = new Date();
    let dateSelected;
    let year = new Date(nuevaFecha).toLocaleDateString("es-MX", { year: "numeric" });
    let month = new Date(nuevaFecha).toLocaleDateString("es-MX", {
        month: "2-digit",
    });
    let day = new Date(nuevaFecha).toLocaleDateString("es-MX", { day: "2-digit" });

    dateSelected = day + "-" + month + "-" + year;
    $("#fechaActual").val(dateSelected);

    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

    let fechaText = nuevaFecha.toLocaleDateString("es-MX", options);

    $("#tnAcordionCalendar").html(fechaText);

    cargaEventosMes(dateSelected);
    recargaEventosDay(dateSelected);
    // var buttonA = document.getElementById("my-button-a");
    // var buttonB = document.getElementById("my-button-b");
    // var buttonC = document.getElementById("my-button-c");
    // // Add events
    // buttonA.addEventListener(
    //     "click",
    //     function () {
    //         myCalendar.select(["01/04/2024", "02/04/2024", "03/04/2024", "05/04/2024"]);
    //     },
    //     false
    // );
    // buttonB.addEventListener(
    //     "click",
    //     function () {
    //         myCalendar.unselect(["05/04/2024"]);
    //     },
    //     false
    // );
    // buttonC.addEventListener(
    //     "click",
    //     function () {
    //         myCalendar.clearselect();
    //     },
    //     false
    // );

    $("#btnNuevaCita").click(() => {
        preloader.show();
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/clientes/obtenerClientes.php",
            data: {},
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                let html = "<option value=''> Selecciona un cliente </option>";
                switch (success) {
                    case true:
                        if (result == "Sin Datos") {
                        } else {
                            result.forEach((data, index) => {
                                html += `<option value="${data.ID}">${data.nombre} ${data.apellidoP} ${data.apellidoM}</option>`;
                            });
                        }

                        $.ajax({
                            method: "POST",
                            dataType: "JSON",
                            url: "./views/catalogos/obtenerMotivos.php",
                            data: {},
                        })
                            .done(function (results) {
                                let success = results.success;
                                let result = results.result;
                                let html3 = "<option value=''> Selecciona una opción </option>";
                                switch (success) {
                                    case true:
                                        if (result == "Sin Datos") {
                                            preloader.hide();
                                        } else {
                                            result.forEach((data, index) => {
                                                html3 += `<option value='${data.ID}'> ${data.motivoCita} </option>`;
                                            });
                                        }

                                        $("#labelModal").html(`Crear Nueva Cita`);

                                        $("#body_modal").html(`<br>
                                            <div id="nuevaCita">
                                                <div class="coolinput">
                                                    <label for="nombreCita" class="text">Cliente: </label>
                                                    <select class="input capitalize obligatorio" name="Cliente" id="nombreCita" style="background-color: rgb(255, 255, 255);width:100%;">
                                                        ${html}
                                                    </select>
                                                </div>
                
                                                <div class="coolinput">
                                                    <label for="nombreMascota" class="text">Mascota: </label>
                                                    <select class="input capitalize obligatorio" name="nombreMascota" id="nombreMascota" style="background-color: rgb(255, 255, 255);width:100%;">
                                                        <option value="">Selecciona una opción</option>
                                                    </select>
                                                </div>
                
                                                <div class="coolinput">
                                                    <label for="fechaCita" class="text">Fecha:</label>
                                                    <input name="Fecha" type="date" class="input obligatorio" id="fechaCita" autocomplete="off" maxlength"50"/>
                                                </div>
                
                                                <div class="coolinput">
                                                    <label for="horaCita" class="text">Hora:</label>
                                                    <input name="Hora" type="time" class="input obligatorio" id="horaCita" autocomplete="off" maxlength"50"/>
                                                </div>
                
                                                <div class="coolinput">
                                                    <label for="motivoCita" class="text">Motivo de Cita:</label>
                                                    <select class="input capitalize obligatorio" name="Motivo Cita" id="motivoCita" style="background-color: rgb(255, 255, 255);width:100%;">
                                                        ${html3}
                                                    </select>
                                                </div>
                
                                                <div class="coolinput">
                                                    <label for="comentariosCita" class="text">Comentarios:</label>
                                                    <input name="Comentarios" type="text" class="input capitalize" id="comentariosCita" autocomplete="off" maxlength"50"/>
                                                </div>
                
                                            </div>
                
                                            <div class="center-fitcomponent" style="width: 100%;">
                                                <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" id="btnGuardarCita">
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

                                        $("#nombreCita").select2({
                                            dropdownParent: $("#modalTemplate"),
                                        });

                                        $("#motivoCita").select2({
                                            dropdownParent: $("#modalTemplate"),
                                        });

                                        $("#nombreCita").change(() => {
                                            let FK_dueno = $("#nombreCita").val();
                                            if (FK_dueno) {
                                                preloader.show();
                                                $.ajax({
                                                    method: "POST",
                                                    dataType: "JSON",
                                                    url: "./views/mascotas/obtenerMascotasDuenios.php",
                                                    data: { FK_dueno },
                                                })
                                                    .done(function (results) {
                                                        let success = results.success;
                                                        let result = results.result;
                                                        let html2 = "<option value=''> Selecciona una opción </option>";
                                                        switch (success) {
                                                            case true:
                                                                if (result == "Sin Datos") {
                                                                    $("#nombreMascota").html(html2);
                                                                    $("#nombreMascota").trigger("change");
                                                                    preloader.hide();
                                                                } else {
                                                                    result.forEach((data, index) => {
                                                                        html2 += `<option value='${data.ID}'> ${data.nombre} </option>`;
                                                                    });

                                                                    $("#nombreMascota").html(html2);
                                                                    $("#nombreMascota").select2({
                                                                        dropdownParent: $("#modalTemplate"),
                                                                    });
                                                                    $("#nombreMascota").trigger("change");

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
                                                        console.log(
                                                            "error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown
                                                        );
                                                    });
                                            } else {
                                                $("#nombreMascota").html(`<option value="">Selecciona una opción</option>`);
                                                $("#nombreMascota").select2({
                                                    dropdownParent: $("#modalTemplate"),
                                                });
                                                $("#nombreMascota").trigger("change");
                                            }
                                        });

                                        $("#btnGuardarCita").click(() => {
                                            validacioesCita();
                                        });

                                        preloader.hide();
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
    });
});

function validaEventos(fechaCita) {
    let anioCita = String(fechaCita).split("-")[0];
    let mesCita = String(fechaCita).split("-")[1];
    let diaCita = String(fechaCita).split("-")[2];

    let fechaActual = $("#fechaActual").val();

    let diaActual = String(fechaActual).split("-")[0];
    let mesActual = String(fechaActual).split("-")[1];
    let anioActual = String(fechaActual).split("-")[2];

    let fechaActual1 = anioActual + "-" + mesActual + "-" + diaActual;
    if (fechaActual1 == fechaCita) {
        let myCalendar = jsCalendar.get("#calendar");
        myCalendar.select([fechaActual]);
        cargaBolitasCalendar();
        recargaEventosDay(fechaActual);
    } else {
        if (mesCita == mesActual && anioActual == anioCita) {
            let myCalendar = jsCalendar.get("#calendar");
            myCalendar.select([diaCita + "-" + mesCita + "-" + anioCita]);
            cargaBolitasCalendar();
        }
    }
}

function recargaEventosDay(oldFecha) {
    cargaBolitasCalendar();
    preloader.show();
    let fecha = volteaFecha(oldFecha, 2);
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/citas/obtenerEventos.php",
        data: { fecha },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        preloader.hide();
                        $("#divEventos").html(`<div class="row mt-3">
                            <div class="col-md-12 mb-0" style="padding: 0;">
                                <div class="card2">
                                    <div class="card-body" style="border-left: 10px solid #009071;border-radius: 10px;">
                                        <div>
                                            <h4 class="mb-0"><small class="text-muted" style="margin-bottom: 0px;"> No hay citas agendadas para este día </small></h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`);
                    } else {
                        let html = "",
                            colorText = "",
                            TextEstatus = "";
                        result.forEach((data, index) => {
                            TextEstatus = "";
                            if (data.estatus == 1) {
                                TextEstatus = `<h4 class="card-title text-success" style="margin: 0px;"><strong>${data.flagEstatus}</strong></h4>`;
                                colorText = "#009071";
                            } else if (data.estatus == 2) {
                                TextEstatus = `<h4 class="card-title text-primary" style="margin: 0px;"><strong>${data.flagEstatus}</strong></h4>`;
                                colorText = "#0277BD";
                            } else if (data.estatus == 3) {
                                TextEstatus = `<h4 class="card-title text-danger" style="margin: 0px;"><strong>${data.flagEstatus}</strong></h4>`;
                                colorText = "#F95F53";
                            } else if (data.estatus == 4) {
                                TextEstatus = `<h4 class="card-title text-warning" style="margin: 0px;"><strong>${data.flagEstatus}</strong></h4>`;
                                colorText = "#FFAF00";
                            }

                            html += `
                            <div class="row mt-3">
                                <div class="col-md-12 mb-0" style="padding: 0;">
                                    <div class="card2">
                                        <div class="card-body" style="border-left: 10px solid ${colorText};border-radius: 10px; padding: 1rem 1.5rem;">                        
                                            <div class="row">
                                                <div class="col-md-8 my-2"> 
                                                    <div class="row">
                                                        <div class="col-md-12 my-2"> <h4 class="card-title">
                                                        ${data.nombreCita} Y  ${data.nombreMascota} </h4> <div> ${TextEstatus} </div></div>
                                                        <div class="col-md-12 my-2"> <span class="capitalize"> ${
                                                            String(data.comentariosCita).trim()
                                                                ? String(data.comentariosCita).trim()
                                                                : "Sin comentarios adicionales"
                                                        } </span></div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4 my-2" style="display: flex;flex-direction: column;">
                                                    <div style="display: flex;margin-bottom: 12px;"> <span class="material-icons" style="margin-right: 15px;color: #0277bd;"> schedule </span> <strong class="capitalize" style="font-weight: 500;"> ${
                                                        String(data.horaCita).split(":")[0]
                                                    }:${String(data.horaCita).split(":")[1]} </strong></div> 
                                                    <div style="display: flex;margin-bottom: 12px;"> <span class="material-icons" style="margin-right: 15px;color: #0277bd;"> checklist </span> <strong class="capitalize" style="font-weight: 500;"> ${String(
                                                        data.motivoCita
                                                    ).trim()} </strong> </div> 
                                                    <div class="col-md-4 my-0"> 
                                                        <div class="buttom-blue buttom" onclick="marcarCita(${data.ID})">
                                                            <span class="text-sm mb-0">Acciones <i class="material-icons"> date_range </i></span>
                                                        </div>    
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <div class="row">
                                                <div class="col-md-4 my-2"> 
                                                    <div class="buttom-green buttom" onclick="AtendidiaCita(${data.ID})">
                                                        <span class="text-sm mb-0">Atendidia <i class="material-icons"> check_circle </i></span>
                                                    </div> 
                                                </div>
                                                <div class="col-md-4 my-2"> 
                                                    <div class="buttom-blue buttom" onclick="ReagendarCita(${data.ID})">
                                                        <span class="text-sm mb-0">Reagendar <i class="material-icons"> date_range </i></span>
                                                    </div>    
                                                </div>
                                                <div class="col-md-4 my-2"> 
                                                    <div class="buttom-red buttom" onclick="CancelarCita(${data.ID})">
                                                        <span class="text-sm mb-0">Cancelar <i class="material-icons"> cancel </i></span>
                                                    </div>    
                                                </div>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        });
                        $("#divEventos").html(html);
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

function cargaEventosMes(fecha) {
    preloader.show();
    let mes = fecha.split("-")[1];
    let anio = fecha.split("-")[2];
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/citas/obtenerEventosMes.php",
        data: { mes, anio },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        preloader.hide();
                    } else {
                        let myCalendar = jsCalendar.get("#calendar");
                        let fechaInsert = [];
                        result.forEach((data, index) => {
                            fechaInsert = [...fechaInsert, volteaFecha(data.fechaCita, 1)];
                        });
                        myCalendar.select(fechaInsert);
                        cargaBolitasCalendar();
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

function marcarCita(ID) {
    $("#labelModal").html(`Marcar Cita`);

    $("#body_modal").html(`<br>
        <div id="formEspecies">
            <div class="coolinput">
                <label for="newEstatusCita" class="text">La cita fue:</label>
                <select class="input capitalize" id="newEstatusCita" style="background-color: rgb(255, 255, 255);width:100%;">
                    <option value="2">ATENDIDA</option>
                    <option value="3">CANCELADA</option>
                    <option value="4">REAGENDADA</option>
                </select>
            </div>

            <div class="coolinput">
                <label for="comentariosAdicionales" class="text">Comentarios Adicionales</label>
                <input type="text" class="capitalize input" id="comentariosAdicionales" autocomplete="off" maxlength"50"/>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarEstausCita(${ID});">
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

function guardarEstausCita(ID) {
    let estatus = $("#newEstatusCita").val();
    let flagEstatus = String($("#newEstatusCita").find("option:selected").text());
    let comentariosAdicionales = String($("#comentariosAdicionales").val()).trim();

    console.log(estatus, flagEstatus, comentariosAdicionales);

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/citas/guardarEstausCita.php",
        data: {
            estatus,
            flagEstatus,
            comentariosAdicionales,
            ID,
        },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    $("#modalTemplate").modal("hide");
                    $("#btnClose").off("click");
                    msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                    // preloader.hide();
                    recargaEventosDay($("#fechaActual").val());
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

function validacioesCita() {
    let values = get_datos_completos("nuevaCita");
    let response = values.response;
    let valido = values.valido;
    let fecha_actual_val = new Date();

    const year = fecha_actual_val.getFullYear();
    const month = String(fecha_actual_val.getMonth() + 1).padStart(2, '0');
    const day = String(fecha_actual_val.getDate()).padStart(2, '0');

    let fecha_actual_format = `${year}-${month}-${day}`;

    if (valido) {
        preloader.show();
        let fechaCita = $("#fechaCita").val();
        let horaCita = $("#horaCita").val();

        if ($("#fechaCita").val() < fecha_actual_format) {
            console.log("La fecha seleccionada es menor a la actual");
            msj.show("Aviso", "La fecha de la cita no puede ser menor a la actual", [{ text1: "OK" }]);
            preloader.hide();
            return false;
        }

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/citas/validaCita.php",
            data: { fechaCita, horaCita },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                let disponible = true;
                switch (success) {
                    case true:
                        if (result == "Sin Datos") {
                            guardarCita();
                        } else {
                            disponible = false;
                            let Texto = "";
                            result.forEach((data, index) => {
                                Texto += ` ${data.nombreCita} y ${data.nombreMascota} que podria empalmarse. ¿Deseas continuar?`;
                            });
                            Swal.fire({
                                title: "Hay una cita ya agendada de:",
                                text: Texto,
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonColor: "#7066e0",
                                cancelButtonColor: "#FF0037",
                                confirmButtonText: "OK",
                                cancelButtonText: "Cancelar",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    guardarCita();
                                }
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

function guardarCita() {
    let FKnombreCita = $("#nombreCita").val();
    let nombreCita = String($("#nombreCita").find("option:selected").text());
    let FKnombreMascota = $("#nombreMascota").val();
    let nombreMascota = String($("#nombreMascota").find("option:selected").text());
    let fechaCita = $("#fechaCita").val();
    let horaCita = $("#horaCita").val();
    let motivoCita = $("#motivoCita").find("option:selected").text();
    let comentariosCita = String($("#comentariosCita").val());
    let FKMotivo = $("#motivoCita").val();

    nombreCita.replaceAll("'", '"');
    nombreMascota.replaceAll("'", '"');
    motivoCita.replaceAll("'", '"');
    comentariosCita.replaceAll("'", '"');

    preloader.show();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/citas/guardarCita.php",
        data: {
            FKnombreCita,
            nombreCita,
            FKnombreMascota,
            nombreMascota,
            fechaCita,
            horaCita,
            motivoCita,
            comentariosCita,
            FKMotivo,
        },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    $("#modalTemplate").modal("hide");
                    $("#btnClose").off("click");
                    msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                    preloader.hide();
                    validaEventos(fechaCita);
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

function cargaBolitasCalendar() {
    let campos,
        contenido = "";
    campos = document.querySelectorAll("#calendar table tbody tr td.jsCalendar-selected");

    [].slice.call(campos).forEach(function (campo) {
        contenido = $(campo).get(0).innerHTML;
        if (!contenido.includes("mbsc-calendar-marks mbsc-ios mbsc-ltr")) {
            $(campo).append(
                '<div> <div class="mbsc-calendar-marks mbsc-ios mbsc-ltr"> <div class="mbsc-calendar-mark  mbsc-ios"> </div> </div> </div>'
            );
        }
    });
}
