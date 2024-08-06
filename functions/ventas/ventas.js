$(document).ready(() => {
    // preloader.hide();
    let fechaNow = new Date().toLocaleString("sv-SE").split(" ")[0];
    let mes = fechaNow.split("-")[1];
    let anio = fechaNow.split("-")[0];

    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    for (let i = 0; i < months.length; i++) {
        let m = i;
        m++;
        if (mes == m) {
            $("#mesVentas").append(`<option value="${m}" selected>${months[i]}</option>`);
        } else {
            $("#mesVentas").append(`<option value="${m}">${months[i]}</option>`);
        }
    }

    for (let i = 3; i > 0; i--) {
        let new_anio = Number(anio) - i;
        $("#anioVentas").append(`<option value="${new_anio}">${new_anio}</option>`);
    }
    $("#anioVentas").append(`<option value="${anio}" selected>${anio}</option>`);

    for (let i = 1; i < 4; i++) {
        let new_anio = Number(anio) + i;
        $("#anioVentas").append(`<option value="${new_anio}">${new_anio}</option>`);
    }

    obtenerVentas(mes, anio);

    $("#mesVentas").change(() => {
        obtenerVentas($("#mesVentas").val(), $("#anioVentas").val());
    });
    $("#anioVentas").change(() => {
        obtenerVentas($("#mesVentas").val(), $("#anioVentas").val());
    });
});

function obtenerVentas(mes, anio) {
    preloader.show();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/ventas/obtenerVentas.php",
        data: { mes, anio },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        dataTableDestroy();
                        $("#ventasBody").html(html);
                        dataTableCreateDes();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        let html, codigo, stock;
                        result.forEach((data, index) => {
                            codigo = data.codigo;
                            stock = data.stockReal;
                            if (data.Flagtipo == "Servicio") {
                                codigo = String(codigo) + String(data.ID);
                                stock = "N/A";
                            }
                            html += `<tr>
                                <td>VTA-${data.ID}</td>
                                <td class="capitalize">${data.nombreCompleto}</td>
                                <td>${data.cantidad}</td>
                                <td>${FormatDate(data.Fecha + " 00:00")}</td>
                                <td>$${CantidadConCommas(data.price)}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-blue buttom button-sinText mx-1" title="Ver Detalle" onclick="verDetalleVenta(${
                                            data.ID
                                        }, ${data.cambioVenta})">
                                            <span class="text-sm mb-0"><i class="material-icons"> shopping_cart </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#ventasBody").html(html);
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

function irNuevaVenta() {
    preloader.show();
    $("#contenido").load("templates/ventas/nuevaVenta.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            // documentReadyVacantes();
        }
    });
}

function verDetalleVenta(ID, cambioVenta) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/ventas/obtenerVenta.php",
        data: { ID, cambioVenta },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "",
                nombreCliente,
                cambio,
                efectivo,
                price,
                Fecha,
                devuelto;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        preloader.hide();
                    } else {
                        result.forEach((data, index) => {
                            let random = genRandom();
                            nombreCliente = data.nombreCliente;
                            Fecha = obtenerFechaLarga(data.Fecha + " 00:00:00");
                            cambio = data.cambio;
                            devuelto = data.devuelto;
                            if (Number(cambio) <= 0) {
                                efectivo = data.price;
                            } else {
                                efectivo = data.efectivo;
                            }
                            price = data.price;
                            html += `
                            <div id="${random}_product" class="productt">
                                <div class="product" style="grid-template-columns: 0.75fr 100px 0.75fr 100px;">
                                    <div>
                                        <span class="capitalize" id="${random}_FlagProducto">${data.FlagProducto}</span>
                                        <p class="capitalize">${data.tipo}</p>
                                    </div>
                                    <div class="quantity">
                                        <div class="div_editaVentaProuct1">
                                            <label style="color: #009071;" id="${random}_real">${data.cantidad}</label>
                                        </div>
                                        <div class="div_editaVentaProuct" style="display: none;">
                                            <button id="${random}_remove" onclick="removeACuentaEdita(this.id)">
                                                <span class="text-sm mb-0"> <i class="material-icons" style="border: 2px solid #009071; color: #009071; border-top-left-radius: 10px; border-bottom-left-radius: 10px;"> remove </i></span>
                                            </button>
                                            <label style="color: #009071;" id="${random}_label">${data.cantidad}</label>
                                            <button id="${random}_add" onclick="addACuentaEdita(this.id)">
                                                <span class="text-sm mb-0"> <i class="material-icons" style="border: 2px solid #009071;color: #009071;border-top-right-radius: 10px;border-bottom-right-radius: 10px;"> add </i></span>
                                            </button>
                                        </div>
                                    </div>
                                    <label class="price small my-auto" id="${random}_totals">$${CantidadConCommas(data.precioVenta)} c/u</label>
                                    <label class="price small my-auto edit" id="${random}_total">$${data.total}</label>
                                </div>
                                <div id="${random}_comentarios" style="display: none;">
                                             ${
                                                 data.tipo == "Servicio"
                                                     ? `
                                                        <div class="checkbox-wrapper-46" style="margin: 22px 0px 12px 8px; display:none;">
                                                            <input type="checkbox" id="cbx-46_${random}" class="inp-cbx"/>
                                                            <label for="cbx-46_${random}" class="cbx">
                                                                <span style="transform: scale(1.2);">
                                                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                                    </svg>
                                                                </span>
                                                                <span style="font-size: 16px;">¿Devolver al Stock?</span>
                                                            </label>
                                                        </div>
                                                    `
                                                     : `
                                                        <div class="checkbox-wrapper-46" style="margin: 22px 0px 12px 8px;">
                                                            <input type="checkbox" id="cbx-46_${random}" class="inp-cbx"/>
                                                            <label for="cbx-46_${random}" class="cbx">
                                                                <span style="transform: scale(1.2);">
                                                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                                    </svg>
                                                                </span>
                                                                <span style="font-size: 16px;">¿Devolver al Stock?</span>
                                                            </label>
                                                        </div>
                                                    `
                                             }

                                    <div class="coolinput" style="width: 100%;">
                                        <label for="comentariosAdicionales_${random}" class="text">Comentarios Adicionales</label>
                                        <textarea
                                            class="capitalize input"
                                            style="font-family: 'ITC Avant Garde Gothic', sans-serif; height: 105px; padding-top: 11px"
                                            id="comentariosAdicionales_${random}"
                                            name="¿Tienes algún comentario, pregunta o sugerencia?"
                                            cols="30"
                                            rows="5"
                                        ></textarea>
                                    </div>
                                </div>
                                <input type="hidden" id="${random}_costo" value="${Number(data.precioVenta).toFixed(2)}">
                                <input type="hidden" id="${random}_FKProducto" value="${data.FKProducto}">
                                <input type="hidden" id="${random}_Flagtipo" value="${data.tipo}">
                                ${
                                    cambioVenta == 1 && Number(data.newStock) > 0
                                        ? `
                                            <div>
                                                <span class="capitalize" style="color: #FF0037;"> <strong>${data.newStock}</strong> cancelación(es) por el siguiente motivo: <strong> ${data.comentarios} </strong></span>
                                            </div>
                                        `
                                        : ``
                                }
                                <hr>
                            </div>`;
                        });
                        $("#labelModal").html(`Detalle Venta`);

                        $("#body_modal").html(`<br>
                            <div>
                                <div style="display: flex;flex-direction: row;">
                                    <h4 class="card-title me-3" style="font-weight: 400;">Cliente:</h4>
                                    <h4 class="card-title subtitle">${nombreCliente}</h4>
                                </div>
                                <div style="display: flex;flex-direction: row;">
                                    <h4 class="card-title me-3" style="font-weight: 400;">Fecha:</h4>
                                    <h4 class="card-title subtitle">${Fecha}</h4>
                                </div>
                                <hr>
                                <h4 class="card-title mt-2">Carrito</h4>
                                <div class="row">
                                    <div class="col-md-12 mb-2">
                                        <div class="master-container">
                                            <div class="cart">
                                                <div class="products">
                                                    ${html}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 mb-2">
                                        <div class="checkout">
                                            <div class="details">
                                                <span>Subtotal:</span>
                                                <span id="totalSubtotal">$${CantidadConCommas(price)}</span>
                                            </div>
                                            <div class="details">
                                                <span>Descuentos de productos:</span>
                                                <span id="totalDescuentos">$0.00</span>
                                            </div>
                                            <hr>
                                            <div class="checkout--footer">
                                                <label class="price" style="margin-right: auto;font-size: 18px;">TOTAL DE VENTA</label>
                                                <label class="price"><sup>$</sup>${CantidadConCommas(price)}</label>
                                                <input type="hidden" id="priceTotal_text" value="${price}">
                                            </div>
                                            <hr>
                                            <div class="details">
                                                <span>Efectivo:</span>
                                                <span>$${CantidadConCommas(efectivo)}</span>
                                            </div>
                                            <div class="details">
                                                <span>Cabmio:</span>
                                                <span id="totalDescuentos">$${CantidadConCommas(cambio)}</span>
                                            </div>
                                             <hr>
                                            ${
                                                cambioVenta == 1
                                                    ? `<div class="checkout--footer">
                                                    <label class="price" style="margin-right: auto;font-size: 18px;">TOTAL DEVUELTO</label>
                                                    <label class="price" id="priceTotal_text_EDIT"><sup>$</sup>${CantidadConCommas(devuelto)}</label>
                                                    <input type="hidden" id="priceTotal" value="0">
                                                    <hr>
                                                </div>`
                                                    : `<div class="checkout--footer div_editaVentaProuct" id="div_devolver" style="display: none;">
                                                    <label class="price" style="margin-right: auto;font-size: 18px;">TOTAL A DEVOLVER</label>
                                                    <label class="price" id="priceTotal_text_EDIT"><sup>$</sup>${CantidadConCommas(0)}</label>
                                                    <input type="hidden" id="priceTotal" value="0">
                                                    <hr>
                                                </div>`
                                            }
                                        </div>
                                    </div>
                                </div>
                                ${
                                    cambioVenta == 1
                                        ? ``
                                        : `    
                                    <div class="row mb-4 div_editaVentaProuct1">
                                        <div class="col-md-12 mb-2">
                                            <div class="buttom-red buttom" onclick="editarCarritoPost(${ID})" style="margin: auto;">
                                                <span class="text-sm mb-0">Editar <i class="material-icons"> remove_shopping_cart </i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row div_editaVentaProuct" style="display: none;">
                                        <div class="col-md-12 mb-2">
                                            <div class="buttom-blue buttom" onclick="cerrarCarritoPost(${ID})" style="margin: auto;">
                                                <span class="text-sm mb-0">Cerrar y Guardar <i class="material-icons"> save </i></span>
                                            </div>
                                        </div>
                                    </div>
                                `
                                }
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

function editarCarritoPost() {
    $(".div_editaVentaProuct1").css("display", "none");
    $(".div_editaVentaProuct").css("display", "flex");
}

function removeACuentaEdita(ID) {
    let random = String(ID).replace("_remove", "");
    let cantidadActual = Number(String($("#" + random + "_label").text()).replace("_label", "")).toFixed();
    if (cantidadActual == 0) {
    } else {
        let costoProducto = Number(String($("#" + random + "_costo").val()).replace("_costo", "")).toFixed(2);
        cantidadActual = Number(cantidadActual) - 1;
        costoProducto = Number(Number(costoProducto) * cantidadActual);
        $("#" + random + "_label").text(cantidadActual);
        $("#" + random + "_total").text("$" + Number(costoProducto).toFixed(2));
        obtenerTotalEdit();
    }
    let stockReal = Number(String($("#" + random + "_real").text()).replace("_stock", ""));

    if (stockReal == cantidadActual) {
        $("#" + random + "_comentarios").css("display", "none");
        $(`#comentariosAdicionales_${random}`).removeClass("obligatorio");
    } else {
        $("#" + random + "_comentarios").css("display", "block");
        $(`#comentariosAdicionales_${random}`).addClass("obligatorio");
    }
}

function addACuentaEdita(ID) {
    let random = String(ID).replace("_add", "");
    let stockReal = Number(String($("#" + random + "_real").text()).replace("_stock", ""));
    let cantidadActual = Number(String($("#" + random + "_label").text()).replace("_label", "")).toFixed();
    let Flagtipo = String($("#" + random + "_Flagtipo").val()).replace("_Flagtipo", "");
    if (cantidadActual == stockReal) {
        msj.show("Aviso", "No puedes agregar más productos de la cuenta original", [{ text1: "OK" }]);
        return false;
    }
    let costoProducto = Number(String($("#" + random + "_costo").val()).replace("_costo", "")).toFixed(2);
    cantidadActual = Number(cantidadActual) + 1;
    costoProducto = Number(Number(costoProducto) * cantidadActual);
    $("#" + random + "_label").text(cantidadActual);
    $("#" + random + "_total").text("$" + Number(costoProducto).toFixed(2));
    obtenerTotalEdit();

    if (stockReal == cantidadActual) {
        $("#" + random + "_comentarios").css("display", "none");
        $(`#comentariosAdicionales_${random}`).removeClass("obligatorio");
    } else {
        $("#" + random + "_comentarios").css("display", "block");
        $(`#comentariosAdicionales_${random}`).addClass("obligatorio");
    }
}

function obtenerTotalEdit() {
    let campos;
    campos = document.querySelectorAll(".products div div label.price.small.my-auto.edit");
    let price = 0;

    campos.forEach((campos) => {
        let price1 = 0;
        price1 = String(campos.innerText).replace("$", "");
        price = Number(price) + Number(price1);
    });

    $("#priceTotal").val(Number($("#priceTotal_text").val()) - price);
    $("#priceTotal_text_EDIT").html("<sup>$</sup>" + Number(Number($("#priceTotal_text").val()) - price).toFixed(2));
}

function cerrarCarritoPost(ID) {
    Swal.fire({
        title: "",
        text: "¿Estás seguro de querer guardar la edición de la venta?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#7066e0",
        cancelButtonColor: "#FF0037",
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            preloader.show();

            let price = $("#priceTotal").val();
            let efectivo = $("#priceTotal_text").val();

            $.ajax({
                method: "POST",
                dataType: "JSON",
                url: "./views/ventas/guardarHeaderVentaCambio.php",
                data: { price, efectivo, ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            if (result == "Sin Datos") {
                                preloader.hide();
                            } else {
                                result.forEach((data, index) => {
                                    let dataID = data.IDHeader;
                                    let campos;
                                    campos = document.querySelectorAll(".products div.productt");
                                    let random = 0;
                                    campos.forEach((campos) => {
                                        if (campos.id) {
                                            random = String(campos.id).replace("_product", "");
                                            let FlagProducto = $("#" + random + "_FlagProducto").text();
                                            let FKProducto = $("#" + random + "_FKProducto").val();
                                            let label = $("#" + random + "_label").text();
                                            let total = Number(String($("#" + random + "_total").text()).replace("$", ""));
                                            let stock = $("#" + random + "_real").text();
                                            let newStock = Number(stock) - Number(label);
                                            let devuelveStock = 0;
                                            if ($("#cbx-46_" + random).prop("checked") == true) {
                                                devuelveStock = 1;
                                            }
                                            let comentariosAdicionales = $("#comentariosAdicionales_" + random).val();

                                            $.ajax({
                                                method: "POST",
                                                dataType: "JSON",
                                                url: "./views/ventas/guardarDetalleVentaCambio.php",
                                                data: {
                                                    ID,
                                                    dataID,
                                                    FlagProducto,
                                                    FKProducto,
                                                    label,
                                                    total,
                                                    newStock,
                                                    devuelveStock,
                                                    comentariosAdicionales,
                                                },
                                            })
                                                .done(function (results) {
                                                    let success = results.success;
                                                    switch (success) {
                                                        case true:
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
                                        }
                                    });
                                    $("#modalTemplate").modal("hide");
                                    $("#btnClose").off("click");
                                    preloader.hide();
                                    msj.show("Aviso", "Guardado Correctamente", [{ text1: "OK" }]);
                                    obtenerVentas($("#mesVentas").val(), $("#anioVentas").val());
                                });
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
    });
}
