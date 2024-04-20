$(document).ready(() => {
    preloader.hide();
    obtenerInventario();
});

function obtenerInventario() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/inventario/obtenerInventario.php",
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
                        $("#productosBody").html(html);
                        dataTableCreate();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        let html;
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td>${data.codigo}</td>
                                <td>${data.nombre}</td>
                                <td>${data.Flagtipo}</td>
                                <td>${data.precioVenta}</td>
                                <td>${data.stockReal}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-blue buttom button-sinText mx-1" title="Ver Producto" onclick="verMascota(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> pets </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#productosBody").html(html);
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

function nuevoProducto() {
    $("#labelModal").html(`Crear Nuevo Producto o Servicio`);

    $("#body_modal").html(`<br>
        <div id="formInventario">
            <div class="coolinput div_producto div_servicio">
                <label for="tipoProducto" class="text">Tipo</label>
                <select class="input obligatorio" name="Tipo" id="tipoProducto" style="background-color: rgb(255, 255, 255);width:100%;" onchange="asignaObligatorios(this.value)">
                    <option value="">Selecciona una opción</option>
                    <option value="Producto">Producto</option>
                    <option value="Servicio">Servicio</option>
                </select>
            </div>

            <div class="coolinput div_producto div_servicio">
                <label for="nombre" class="text">Nombre</label>
                <input name="Nombre" type="text" class="capitalize input producto servicio obligatorio" id="nombre" autocomplete="off" maxlength"20"/>
            </div>

            <div class="coolinput div_producto">
                <label for="codigo" class="text">Código</label>
                <input name="Código" type="text" class="capitalize input producto" id="codigo" autocomplete="off" maxlength"20"/>
            </div>

            <div class="coolinput div_producto div_servicio">
                <label for="descripcion" class="text">Descripción</label>
                <input name="Descripción" type="text" class="capitalize input producto servicio obligatorio" id="descripcion" autocomplete="off" maxlength"20"/>
            </div>

            <div class="coolinput div_producto">
                <label for="precioCompra" class="text">Precio Compra</label>
                <input name="Precio Compra" type="text" class="capitalize input producto" id="precioCompra" autocomplete="off" maxlength"20"/>
            </div>

            <div class="coolinput div_producto div_servicio">
                <label for="precioVenta" class="text">Precio Venta</label>
                <input name="Precio Venta" type="text" class="capitalize input producto servicio obligatorio" id="precioVenta" autocomplete="off" maxlength"20"/>
            </div>

            <div class="coolinput div_producto">
                <label for="stockMinimo" class="text">Stock mínimo</label>
                <input name="Stock mínimo" type="text" class="capitalize input producto" id="stockMinimo" autocomplete="off" maxlength"20"/>
            </div>
            
            <div class="coolinput div_producto">
                <label for="stockReal" class="text">Stock Real</label>
                <input name="Stock Real" type="text" class="capitalize input producto" id="stockReal" autocomplete="off" maxlength"20"/>
            </div>
            
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarProducto();">
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

function asignaObligatorios(value) {
    $(".capitalize").removeClass("obligatorio");
    $(".coolinput").css("display", "none");
    if (value == "Producto") {
        $(".producto").addClass("obligatorio");
        $(".div_producto").css("display", "flex");
    } else if (value == "Servicio") {
        $(".servicio").addClass("obligatorio");
        $(".div_servicio").css("display", "flex");
    }
}

function guardarProducto() {
    let values = get_datos_completos("formInventario");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let tipoProducto = String($("#tipoProducto").val()).trim();
        let nombre = String($("#nombre").val()).trim();
        let codigo = String($("#codigo").val()).trim();
        let descripcion = String($("#descripcion").val()).trim();
        let precioCompra = String($("#precioCompra").val()).trim();
        let precioVenta = String($("#precioVenta").val()).trim();
        let stockMinimo = String($("#stockMinimo").val()).trim();
        let stockReal = String($("#stockReal").val()).trim();
        tipoProducto.replaceAll("'", '"');
        nombre.replaceAll("'", '"');
        codigo.replaceAll("'", '"');
        descripcion.replaceAll("'", '"');
        precioCompra.replaceAll("'", '"');
        precioVenta.replaceAll("'", '"');
        stockMinimo.replaceAll("'", '"');
        stockReal.replaceAll("'", '"');
        preloader.show();
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/inventario/guardarProducto.php",
            data: { tipoProducto, nombre, codigo, descripcion, precioCompra, precioVenta, stockMinimo, stockReal },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerInventario();
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
