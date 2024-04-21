$(document).ready(() => {
    // preloader.hide();
    dataVenta();
});

function dataVenta() {
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
                        preloader.hide();
                    } else {
                        result.forEach((data, index) => {
                            html += `<option value="${data.ID}">${data.nombre} ${data.apellidoP} ${data.apellidoM}</option>`;
                        });
                    }
                    $.ajax({
                        method: "POST",
                        dataType: "JSON",
                        url: "./views/inventario/obtenerInventario.php",
                        data: {},
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
                                            html2 += `<option value="${data.ID}" data_Flagtipo = "${data.Flagtipo}" data_codigo = "${data.codigo}" data_descripcion = "${data.descripcion}" data_nombre = "${data.nombre}" data_precioVenta = "${data.precioVenta}" data_stockReal = "${data.stockReal}">
                                                ${data.codigo} - ${data.nombre}
                                            </option>`;
                                        });

                                        preloader.hide();
                                        $("#clientes").html(html);
                                        $("#productos").html(html2);

                                        $("#clientes").select2({});
                                        $("#productos").select2({});
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

function regresaVentas() {
    preloader.show();
    $("#contenido").load("templates/ventas/ventas.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            // documentReadyVacantes();
        }
    });
}

function confirmarAgregarProducto() {
    let IDproducto = $("#productos").val();
    if (IDproducto) {
        let Flagtipo = String($("#productos").find(":selected").attr("data_Flagtipo"));
        let codigo = String($("#productos").find(":selected").attr("data_codigo"));
        let descripcion = String($("#productos").find(":selected").attr("data_descripcion"));
        let nombre = String($("#productos").find(":selected").attr("data_nombre"));
        let precioVenta = String($("#productos").find(":selected").attr("data_precioVenta"));
        let stockReal = String($("#productos").find(":selected").attr("data_stockReal"));

        console.log(Flagtipo, codigo, descripcion, nombre, precioVenta, stockReal);
        Swal.fire({
            title: "",
            text: `¿Estás seguro de querer agregar ${capitalizeLetras(nombre)} a la venta?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#7066e0",
            cancelButtonColor: "#FF0037",
            confirmButtonText: "OK",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                $("#nuevaVentaBody").append(`
                    <tr>
                        <td>${codigo}</td>
                        <td>${nombre}</td>
                        <td>${Flagtipo}</td>
                        <td>${stockReal}</td>
                        <td>${0}</td>
                        <td>${precioVenta}</td>
                        <td>${0}</td>
                        <td><div class="buttom-green buttom" onclick="agregarProducto()">
                            <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: auto;"> add_circle </i></span>
                        </div></td>
                    </tr>
                `);
            }
        });
    }
}

function agregarProducto() {}
