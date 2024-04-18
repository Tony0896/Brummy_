$(document).ready(() => {
    // preloader.hide();
    dataTableCreate();
    obtenerClientes();
});

function obtenerClientes() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/clientes/obtenerClientes.php",
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
                        $("#clientesBody").html(html);
                        dataTableCreate();
                    } else {
                        dataTableDestroy();
                        let html;
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.nombre} ${data.apellidoP} ${data.apellidoM}</td>
                                <td>${data.telefono}</td>
                                <td>${data.correo}</td>
                                <td><div> <div>${data.motivoMovimiento}</div> <div>${data.fechaUlmitoMovimiento}</div> </div></td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-blue buttom button-sinText mx-1" title="Ver Perfil" onclick="verPerfilCliente(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> person </i></span>
                                        </div>

                                        <div class="buttom-green buttom button-sinText mx-1" title="Ver Historial" onclick="HistorialCliente(${
                                            data.ID
                                        })">
                                            <span class="text-sm mb-0"><i class="material-icons"> timeline </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#clientesBody").html(html);
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

function crearCliente() {
    $("#labelModal").html(`Crear Nuevo Cliente`);

    $("#body_modal").html(`<br>
        <div id="formClientes">
            <div class="form-floating mb-2 mt-1">
                <input type="text" class="form-control capitalize obligatorio" id="nombre" autocomplete="off" placeholder="Nombre" onchange="pintaInput(this.id)" maxlength"20"/>
                <label name="Nombre" for="nombre" class="labelFloating">Nombre</label>
            </div>

            <div class="form-floating mb-2 mt-1">
                <input type="text" class="form-control capitalize obligatorio" id="apellidoP" autocomplete="off" placeholder="Apellido Paterno" onchange="pintaInput(this.id)" maxlength"20"/>
                <label name="Apellido Paterno" for="apellidoP" class="labelFloating">Apellido Paterno</label>
            </div>

            <div class="form-floating mb-2 mt-1">
                <input type="text" class="form-control capitalize" id="apellidoM" autocomplete="off" placeholder="Apellido Materno" onchange="pintaInput(this.id)" maxlength"20"/>
                <label name="Apellido Materno" for="apellidoM" class="labelFloating">Apellido Materno</label>
            </div>

            <div class="form-floating mb-2 mt-1">
                <input type="text" class="form-control capitalize" id="telefono" autocomplete="off" placeholder="Teléfono" onchange="pintaInput(this.id)" maxlength"20"/>
                <label name="Teléfono" for="telefono" class="labelFloating">Teléfono</label>
            </div>
            
            <div class="form-floating mb-2 mt-1">
                <input type="text" class="form-control" id="correo" autocomplete="off" placeholder="Correo" onchange="pintaInput(this.id)" maxlength"100"/>
                <label name="Correo" for="correo" class="labelFloating">Correo</label>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarCliente();">
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

function verPerfilCliente(ID) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/clientes/obtenerCliente.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        Swal.fire({ icon: "warning", title: "Sin datos.", text: "" });
                    } else {
                        result.forEach((data, index) => {
                            let nombreModal = data.nombre;
                            let apellidoPModal = data.apellidoP;
                            let apellidoMModal = data.apellidoM;
                            let telefonoModal = data.telefono;
                            let correoModal = data.correo;
                            let motivoMovimientoModal = data.motivoMovimiento;
                            let fechaUlmitoMovimientoModal = data.fechaUlmitoMovimiento;
                            let IDModal = data.ID;

                            $("#labelModal").html(`Actualizar Cliente`);

                            $("#body_modal").html(`<br>
                                <div id="formClientes">
                                    <div class="form-floating mb-2 mt-1">
                                        <input type="text" class="form-control capitalize obligatorio" id="nombre" autocomplete="off" placeholder="Nombre" onchange="pintaInput(this.id)" maxlength"20" value="${nombreModal}"/>
                                        <label name="Nombre" for="nombre" class="labelFloating">Nombre</label>
                                    </div>

                                    <div class="form-floating mb-2 mt-1">
                                        <input type="text" class="form-control capitalize obligatorio" id="apellidoP" autocomplete="off" placeholder="Apellido Paterno" onchange="pintaInput(this.id)" maxlength"20" value="${apellidoPModal}"/>
                                        <label name="Apellido Paterno" for="apellidoP" class="labelFloating">Apellido Paterno</label>
                                    </div>

                                    <div class="form-floating mb-2 mt-1">
                                        <input type="text" class="form-control capitalize" id="apellidoM" autocomplete="off" placeholder="Apellido Materno" onchange="pintaInput(this.id)" maxlength"20" value="${apellidoMModal}"/>
                                        <label name="Apellido Materno" for="apellidoM" class="labelFloating">Apellido Materno</label>
                                    </div>

                                    <div class="form-floating mb-2 mt-1">
                                        <input type="text" class="form-control capitalize" id="telefono" autocomplete="off" placeholder="Teléfono" onchange="pintaInput(this.id)" maxlength"20" value="${telefonoModal}"/>
                                        <label name="Teléfono" for="telefono" class="labelFloating">Teléfono</label>
                                    </div>
                                    
                                    <div class="form-floating mb-2 mt-1">
                                        <input type="text" class="form-control" id="correo" autocomplete="off" placeholder="Correo" onchange="pintaInput(this.id)" maxlength"100" value="${correoModal}"/>
                                        <label name="Correo" for="correo" class="labelFloating">Correo</label>
                                    </div>
                                </div>

                                <div class="center-fitcomponent" style="width: 100%;">
                                    <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="actualizarCliente(${IDModal});">
                                        <span class="text-sm mb-0 span-buttom"> 
                                            Actualizar
                                            <i class="material-icons"> save </i>
                                        </span>
                                    </div>
                                </div>

                                <div class="center-fitcomponent" style="width: 100%;">
                                    <div class="buttom-red buttom" style="margin-left: auto;margin-right: auto;" onclick="eliminarCliente(${IDModal});">
                                        <span class="text-sm mb-0 span-buttom"> 
                                            Eliminar
                                            <i class="material-icons"> delete </i>
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

function guardarCliente() {
    let values = get_datos_completos("formClientes");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombre = String($("#nombre").val()).trim();
        let apellidoP = String($("#apellidoP").val()).trim();
        let apellidoM = String($("#apellidoM").val()).trim();
        let telefono = String($("#telefono").val()).trim();
        let correo = String($("#correo").val()).trim();

        nombre.replaceAll("'", '"');
        apellidoP.replaceAll("'", '"');
        apellidoM.replaceAll("'", '"');
        telefono.replaceAll("'", '"');
        correo.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/clientes/guardaCliente.php",
            data: { nombre, apellidoP, apellidoM, telefono, correo },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        Swal.fire({ icon: "success", title: "Guardado correctamente.", text: "" });
                        obtenerClientes();
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

function actualizarCliente(ID) {
    let values = get_datos_completos("formClientes");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombre = String($("#nombre").val()).trim();
        let apellidoP = String($("#apellidoP").val()).trim();
        let apellidoM = String($("#apellidoM").val()).trim();
        let telefono = String($("#telefono").val()).trim();
        let correo = String($("#correo").val()).trim();

        nombre.replaceAll("'", '"');
        apellidoP.replaceAll("'", '"');
        apellidoM.replaceAll("'", '"');
        telefono.replaceAll("'", '"');
        correo.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/clientes/actualizaCliente.php",
            data: { nombre, apellidoP, apellidoM, telefono, correo, ID },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        Swal.fire({ icon: "success", title: "Actualizado correctamente.", text: "" });
                        obtenerClientes();
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

function eliminarCliente(ID) {
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
                url: "./views/clientes/eliminarCliente.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            obtenerClientes();
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

function HistorialCliente() {
    // $.ajax({
    //     method: "POST",
    //     dataType: "JSON",
    //     url: "./views/clientes/obtenerCliente.php",
    //     data: { ID },
    // })
    //     .done(function (results) {
    //         let success = results.success;
    //         let result = results.result;
    //         let html = "";
    //         switch (success) {
    //             case true:
    //                 if (result == "Sin Datos") {
    //                     Swal.fire({ icon: "warning", title: "Sin datos.", text: "" });
    //                 } else {
    //                     result.forEach((data, index) => {
    //                         let nombreModal = data.nombre;
    //                         let apellidoPModal = data.apellidoP;
    //                         let apellidoMModal = data.apellidoM;
    //                         let telefonoModal = data.telefono;
    //                         let correoModal = data.correo;
    //                         let motivoMovimientoModal = data.motivoMovimiento;
    //                         let fechaUlmitoMovimientoModal = data.fechaUlmitoMovimiento;
    //                         let IDModal = data.ID;

    $("#labelModal").html(`Historial Cliente`);

    $("#body_modal").html(`<br>
        <div>
            <div class="rb-container" style="max-height: 500px; overflow-y: scroll;padding-top: 15px;pointer-events: all;padding-left: 15px; text-align: center;">
                <ul class="rb" style="margin: 0;">
                    <li class="rb-item" ng-repeat="itembx">
                        <div class="timestamp">15-04-2024 </div>
                        <div class="item-title">Aplicación de Vacuna sextuple</div>
                        <div class="timestamp">Mascota </div>
                    </li>
                    
                    <li class="rb-item" ng-repeat="itembx">
                        <div class="timestamp">15-04-2024 </div>
                        <div class="item-title">Revisión General</div>
                        <div class="timestamp">Mascota </div>
                    </li>
                    
                    <li class="rb-item" ng-repeat="itembx">
                        <div class="timestamp">13-04-2024 </div>
                        <div class="item-title">Agenda de cita: 15-04-2024, para Vacuna</div>
                        <div class="timestamp">Mascota </div>
                    </li>
                    
                    <li class="rb-item" ng-repeat="itembx">
                        <div class="timestamp">02-04-2024 </div>
                        <div class="item-title">Acude a baño</div>
                        <div class="timestamp">Mascota </div>
                    </li>

                    <li class="rb-item" ng-repeat="itembx">
                        <div class="timestamp">01-04-2024 </div>
                        <div class="item-title">Agenda de cita: 02-04-2024, para baño</div>
                        <div class="timestamp">Mascota </div>
                    </li>  
                    
                    <li class="rb-item" ng-repeat="itembx">
                        <div class="timestamp">28-03-2024 </div>
                        <div class="item-title">Compra de juguete</div>
                        <div class="timestamp">Mascota </div>
                    </li>   
                </ul>
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
    //                 });
    //                 preloader.hide();
    //             }
    //             break;
    //         case false:
    //             preloader.hide();
    //             Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
    //             break;
    //     }
    // })
    // .fail(function (jqXHR, textStatus, errorThrown) {
    //     preloader.hide();
    //     Swal.fire({ icon: "warning", title: "Algo salió mal.", text: "" });
    //     console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
    // });
}
