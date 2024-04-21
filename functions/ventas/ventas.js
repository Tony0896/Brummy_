$(document).ready(() => {
    preloader.hide();
    obtenerVentas();
});

function obtenerVentas() {
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
                        // dataTableDestroy();
                        // $("#productosBody").html(html);
                        // dataTableCreate();
                        preloader.hide();
                    } else {
                        preloader.hide(); //! Quitar
                        // dataTableDestroy();
                        // let html, codigo, stock;
                        // result.forEach((data, index) => {
                        //     codigo = data.codigo;
                        //     stock = data.stockReal;
                        //     if (data.Flagtipo == "Servicio") {
                        //         codigo = String(codigo) + String(data.ID);
                        //         stock = "N/A";
                        //     }
                        //     html += `<tr>
                        //         <td>${index + 1}</td>
                        //         <td>${codigo}</td>
                        //         <td>${data.nombre}</td>
                        //         <td>${data.Flagtipo}</td>
                        //         <td>${data.precioVenta}</td>
                        //         <td>${stock}</td>
                        //         <td>
                        //             <div style="display: flex; flex-direction: row;">
                        //                 <div class="buttom-blue buttom button-sinText mx-1" title="Ver Producto" onclick="verProducto(${data.ID})">
                        //                     <span class="text-sm mb-0"><i class="material-icons"> inventory_2 </i></span>
                        //                 </div>
                        //             </div>
                        //         </td>
                        //     </tr>`;
                        // });
                        // $("#productosBody").html(html);
                        // dataTableCreate();
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
