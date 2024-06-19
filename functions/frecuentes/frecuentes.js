$(document).ready(() => {
    let fechaNow = new Date().toLocaleString("sv-SE").split(" ")[0];
    let mes = fechaNow.split("-")[1];
    let anio = fechaNow.split("-")[0];

    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    $("#filtroMesCitas").append(`<option value="TODOS" selected>TODOS</option>`);
    $("#filtroMesCompras").append(`<option value="TODOS" selected>TODOS</option>`);
    for (let i = 0; i < months.length; i++) {
        let m = i;
        m++;
        $("#filtroMesCitas").append(`<option value="${m}">${months[i]}</option>`);
        $("#filtroMesCompras").append(`<option value="${m}">${months[i]}</option>`);
    }

    for (let i = 3; i > 0; i--) {
        let new_anio = Number(anio) - i;
        $("#filtroAnioCitas").append(`<option value="${new_anio}">${new_anio}</option>`);
        $("#filtroAnioCompras").append(`<option value="${new_anio}">${new_anio}</option>`);
    }

    $("#filtroAnioCitas").append(`<option value="${anio}" selected>${anio}</option>`);
    $("#filtroAnioCompras").append(`<option value="${anio}" selected>${anio}</option>`);

    for (let i = 1; i < 4; i++) {
        let new_anio = Number(anio) + i;
        $("#filtroAnioCitas").append(`<option value="${new_anio}">${new_anio}</option>`);
        $("#filtroAnioCompras").append(`<option value="${new_anio}">${new_anio}</option>`);
    }

    // obtenerVentas(mes, anio);

    // $("#filtroMesCitas").change(() => {
    //     obtenerVentas($("#filtroMesCitas").val(), $("#filtroAnioCitas").val());
    // });
    // $("#filtroAnioCitas").change(() => {
    //     obtenerVentas($("#filtroMesCitas").val(), $("#filtroAnioCitas").val());
    // });

    obtenerCitasFrecuentes();
    obtenerComprasFrecuentes();

    $("#filtroCitas").change(() => {
        obtenerCitasFrecuentes();
    });

    $("#filtroAnioCitas").change(() => {
        obtenerCitasFrecuentes();
    });

    $("#filtroMesCitas").change(() => {
        obtenerCitasFrecuentes();
    });

    $("#filtroCompras").change(() => {
        obtenerComprasFrecuentes();
    });

    $("#filtroAnioCompras").change(() => {
        obtenerComprasFrecuentes();
    });

    $("#filtroMesCompras").change(() => {
        obtenerComprasFrecuentes();
    });
});

function obtenerCitasFrecuentes() {
    let filtroCitas = $("#filtroCitas").val();
    let filtroMesCitas = $("#filtroMesCitas").val();
    let filtroAnioCitas = $("#filtroAnioCitas").val();

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/frecuentes/obtenerCitasFrecuentes.php",
        data: { filtroCitas, filtroMesCitas, filtroAnioCitas },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        dataTableDestroy();
                        $("#frecuentesCitasBody").html(html);
                        dataTableCreate();
                    } else {
                        let indicadorCliente = "";
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            if (data.indicadorCliente == "verde") {
                                indicadorCliente = `#27AE60`;
                            } else if (data.indicadorCliente == "amarilo") {
                                indicadorCliente = `#ffb02e`;
                            } else if (data.indicadorCliente == "rojo") {
                                indicadorCliente = `#ff0300`;
                            }
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.FKnombreCita}</td>
                                <td class="capitalize d-sm-flex" style="align-items: center;text-wrap: nowrap;">
                                    <div> <span class="material-icons" style="font-size: 18px;color: ${indicadorCliente}; margin-left: 5px; margin-right: 5px;"> fiber_manual_record </span> </div>
                                    ${data.nombreCita}
                                </td>
                                <td class="capitalize">${data.citas}</td>
                            </tr>`;
                        });
                        $("#frecuentesCitasBody").html(html);
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

function obtenerComprasFrecuentes() {
    let filtroCompras = $("#filtroCompras").val();
    let filtroAnioCompras = $("#filtroAnioCompras").val();
    let filtroMesCompras = $("#filtroMesCompras").val();

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/frecuentes/obtenerComprasFrecuentes.php",
        data: { filtroCompras, filtroAnioCompras, filtroMesCompras },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        dataTableDestroy();
                        $("#frecuentesComprasBody").html(html);
                        dataTableCreate();
                    } else {
                        dataTableDestroy();
                        let indicadorCliente = "";
                        result.forEach((data, index) => {
                            if (data.indicadorCliente == "verde") {
                                indicadorCliente = `#27AE60`;
                            } else if (data.indicadorCliente == "amarilo") {
                                indicadorCliente = `#ffb02e`;
                            } else if (data.indicadorCliente == "rojo") {
                                indicadorCliente = `#ff0300`;
                            }
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.cliente}</td>
                                <td class="capitalize d-sm-flex" style="align-items: center;text-wrap: nowrap;">
                                    <div> <span class="material-icons" style="font-size: 18px;color: ${indicadorCliente}; margin-left: 5px; margin-right: 5px;"> fiber_manual_record </span> </div>
                                    ${data.nombreCompleto}
                                </td>
                                <td class="capitalize">${data.compras}</td>
                                <td class="capitalize">${data.sumaPiezas}</td>
                                <td class="capitalize">$ ${CantidadConCommas(data.sumaPrice)}</td>
                            </tr>`;
                        });
                        $("#frecuentesComprasBody").html(html);
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
