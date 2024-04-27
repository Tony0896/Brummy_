$(document).ready(() => {
    preloader.hide();

    let myCalendar = jsCalendar.new("#calendar", "now", {
        language: "es",
        dayFormat: "DD",
    });

    $(".jsCalendar-current").attr("id", "dayNowBrummy");

    myCalendar.select(["01/04/2024", "02/04/2024", "03/04/2024", "05/04/2024"]);

    myCalendar.onDateClick(function (event, date) {
        let dateSelected;
        let year = new Date(date).toLocaleDateString("es-MX", { year: "numeric" });
        let month = new Date(date).toLocaleDateString("es-MX", {
            month: "2-digit",
        });
        let day = new Date(date).toLocaleDateString("es-MX", { day: "2-digit" });

        dateSelected = day + "-" + month + "-" + year;
        myCalendar.set(dateSelected);
        console.log(dateSelected);
        let nuevaFecha = new Date(date);

        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

        let fechaText = nuevaFecha.toLocaleDateString("es-MX", options);

        $("#tnAcordionCalendar").html(fechaText);
    });

    myCalendar.onMonthChange(function (event, date) {
        console.log("cambio de mes");
        console.log(date.toString());
    });

    let nuevaFecha = new Date();

    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

    let fechaText = nuevaFecha.toLocaleDateString("es-MX", options);

    $("#tnAcordionCalendar").html(fechaText);
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
                                            let values = get_datos_completos("nuevaCita");
                                            let response = values.response;
                                            let valido = values.valido;
                                            if (valido) {
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
                                                                // obtenerMascotas();
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
                                                let html =
                                                    '<span style="font-weight: 900;">Debes llenar estos campos para poder guardar:</span> <br> <ul style="text-align: left; margin-left: 15px; font-style: italic;"> ';
                                                response.forEach((data) => {
                                                    html += `<li style="list-style: disc;">${data}.</li> `;
                                                });
                                                html += `</ul>`;
                                                Swal.fire({ icon: "warning", title: "", html: html });
                                            }
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
