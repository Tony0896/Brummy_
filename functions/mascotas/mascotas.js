$(document).ready(() => {
    preloader.hide();
    obtenerMascotas();
});

function obtenerMascotas() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/mascotas/obtenerMascotas.php",
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
                        $("#mascotasBody").html(html);
                        dataTableCreate();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        let html;
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize"> 
                                    <div> 
                                        <div><span>${data.nombre}</span></div> 
                                        <div><span>${data.especie} - ${data.raza}</span></div> 
                                    </div> 
                                </td>
                                <td>${data.NombreCliente}</td>
                                <td>${data.fechaNacimiento}</td>
                                <td>${data.sexo}</td>
                                <td>${data.color}</td>
                                <td><div> <div>${data.motivoMovimiento}</div> <div>${data.fechaUlmitoMovimiento}</div> </div></td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-blue buttom button-sinText mx-1" title="Ver Perfil" onclick="verMascota(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> pets </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#mascotasBody").html(html);
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

function crearMascota() {
    preloader.show();

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerRazas.php",
        data: {},
    })
        .done(function (results2) {
            let success2 = results2.success;
            let result2 = results2.result;
            switch (success2) {
                case true:
                    if (result2 == "Sin Datos") {
                    } else {
                        let html2 = "";
                        result2.forEach((data2, index) => {
                            html2 += `<option value="${data2.ID}" FK_especie="${data2.FK_especie}" especie="${data2.especie}" raza="${data2.nombreRaza}">${data2.especie} - ${data2.nombreRaza}</option>`;
                        });
                        $.ajax({
                            method: "POST",
                            dataType: "JSON",
                            url: "./views/clientes/obtenerClientes.php",
                            data: {},
                        })
                            .done(function (results3) {
                                let success3 = results3.success;
                                let result3 = results3.result;
                                switch (success3) {
                                    case true:
                                        if (result3 == "Sin Datos") {
                                        } else {
                                            let html3 = "";
                                            result3.forEach((data3, index) => {
                                                html3 += `<option value="${data3.ID}">${data3.nombre} ${data3.apellidoP} ${data3.apellidoM}</option>`;
                                            });
                                            $("#labelModal").html(`Agregar nueva Mascota`);

                                            $("#body_modal").html(`<br>
                                                <div id="formMascotas">
                                                    <div class="form-floating mb-2 mt-1">
                                                        <input type="text" class="form-control capitalize obligatorio" id="nombreMascota" autocomplete="off" placeholder="Nombre Mascota" onchange="pintaInput(this.id)" maxlength"50"/>
                                                        <label name="Nombre Mascota" for="nombreMascota" class="labelFloating">Nombre Mascota</label>
                                                    </div>

                                                    <div class="form-floating mb-2 mt-1">
                                                        <input type="date" class="form-control obligatorio" id="fechaMascota" autocomplete="off" placeholder="Fecha Nacimiento" onchange="pintaInput(this.id)" maxlength"50"/>
                                                        <label name="Fecha Nacimiento" for="fechaMascota" class="labelFloating">Fecha Nacimiento</label>
                                                    </div>

                                                    <div class="form-floating mb-2 mt-1">
                                                        <select class="form-control capitalize obligatorio" name="Relación Especie" id="relacionEspecie" placeholder="Relación Especie" onchange="pintaInput(this.id)" style="background-color: rgb(255, 255, 255);width:100%;">
                                                            <option value="">Selecciona una opción</option>
                                                            ${html2}
                                                        </select>
                                                        <label for="relacionEspecie" class="labelFloating">Relación Especie</label>
                                                    </div>

                                                    <div class="form-floating mb-2 mt-1">
                                                        <select class="form-control capitalize obligatorio" name="Sexo Mascota" id="sexoMascota" placeholder="Sexo Mascota" onchange="pintaInput(this.id)" style="background-color: rgb(255, 255, 255);width:100%;">
                                                            <option value="">Selecciona una opción</option>
                                                            <option value="Macho">Macho</option>
                                                            <option value="Hembra">Hembra</option>
                                                        </select>
                                                        <label for="sexoMascota" class="labelFloating">Sexo Mascota</label>
                                                    </div>

                                                    <div class="form-floating mb-2 mt-1">
                                                        <input type="text" class="form-control capitalize" id="colorMascota" autocomplete="off" placeholder="Color Mascota" onchange="pintaInput(this.id)" maxlength"50"/>
                                                        <label name="Color Mascota" for="colorMascota" class="labelFloating">Color Mascota</label>
                                                    </div>

                                                    <div class="form-floating mb-2 mt-1">
                                                        <input type="text" class="form-control capitalize" id="rasgosMascota" autocomplete="off" placeholder="Rasgos Particulares" onchange="pintaInput(this.id)" maxlength"50"/>
                                                        <label name="Rasgos Particulares" for="rasgosMascota" class="labelFloating">Rasgos Particulares</label>
                                                    </div>

                                                    <div class="form-floating mb-2 mt-1">
                                                        <select class="form-control capitalize obligatorio" name="Dueño Mascota" id="FK_dueno" placeholder="Dueño Mascota" onchange="pintaInput(this.id)" style="background-color: rgb(255, 255, 255);width:100%;">
                                                            <option value="">Selecciona una opción</option>
                                                            ${html3}
                                                        </select>
                                                        <label for="FK_dueno" class="labelFloating">Dueño Mascota</label>
                                                    </div>

                                                </div>

                                                <div class="center-fitcomponent" style="width: 100%;">
                                                    <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarMascota();">
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

                                            $("#FK_dueno").select2({
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

function guardarMascota() {
    let values = get_datos_completos("formMascotas");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombre = String($("#nombreMascota").val());
        let fechaNacimiento = String($("#fechaMascota").val());
        let FK_especie = String($("#relacionEspecie").find(":selected").attr("FK_especie"));
        let especie = String($("#relacionEspecie").find(":selected").attr("especie"));
        let raza = String($("#relacionEspecie").find(":selected").attr("raza"));
        let FK_raza = String($("#relacionEspecie").val());
        let sexo = String($("#sexoMascota").val());
        let color = String($("#colorMascota").val());
        let rasgosParticulares = String($("#rasgosMascota").val());
        let FK_dueno = String($("#FK_dueno").val());

        nombre.replaceAll("'", '"');
        fechaNacimiento.replaceAll("'", '"');
        FK_especie.replaceAll("'", '"');
        especie.replaceAll("'", '"');
        raza.replaceAll("'", '"');
        FK_raza.replaceAll("'", '"');
        sexo.replaceAll("'", '"');
        color.replaceAll("'", '"');
        rasgosParticulares.replaceAll("'", '"');
        FK_dueno.replaceAll("'", '"');

        preloader.show();
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/mascotas/guardarMascota.php",
            data: { nombre, fechaNacimiento, FK_especie, especie, raza, FK_raza, sexo, color, rasgosParticulares, FK_dueno },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        Swal.fire({ icon: "success", title: "Guardado correctamente.", text: "" });
                        obtenerMascotas();
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

function verMascota(ID) {
    localStorage.setItem("IDMascota", ID);
    $("#contenido").load("templates/mascotas/perfilMascota.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            // documentReadyVacantes();
        }
    });
}
