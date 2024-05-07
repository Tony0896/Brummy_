$(document).ready(() => {
    preloader.hide();
    verPerfilMascota(localStorage.getItem("IDMascota"));
});

function regresaMascotas() {
    localStorage.removeItem("IDMascota");
    $("#contenido").load("templates/mascotas/mascotas.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            // documentReadyVacantes();
        }
    });
}

function verPerfilMascota(ID) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/mascotas/obtenerMascota.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            let tdSinData = `<span class='material-icons'> remove </span> &nbsp; <span class='material-icons'> remove </span>`;
            switch (success) {
                case true:
                    let nombreMascota, fechaMascota, relacionEspecie, sexoMascota, colorMascota, rasgosMascota, FK_dueno;
                    if (result == "Sin Datos") {
                        Swal.fire({ icon: "warning", title: "Sin datos.", text: "" });
                    } else {
                        result.forEach((data, index) => {
                            // console.table(data);
                            nombreMascota = data.nombre;
                            fechaMascota = data.fechaNacimiento;
                            relacionEspecie = `${data.especie} - ${data.raza}`;
                            sexoMascota = data.sexo;
                            colorMascota = data.color ? data.color : tdSinData;
                            rasgosMascota = data.rasgosParticulares ? data.rasgosParticulares : tdSinData;
                            FK_dueno = data.NombreCliente;
                        });
                        traerHistorialMascota(ID);
                        $("#nombreMascota").html(nombreMascota);
                        $("#fechaMascota").html(fechaMascota);
                        $("#relacionEspecie").html(relacionEspecie);
                        $("#sexoMascota").html(sexoMascota);
                        $("#colorMascota").html(colorMascota);
                        $("#rasgosMascota").html(rasgosMascota);
                        $("#FK_dueno").html(FK_dueno);

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

function cambioTablero(id) {
    let oldtext = "",
        newText = "";
    if ($("#" + id).prop("checked")) {
        oldtext = String($("#label_" + id).text());
        newText = "✔   " + oldtext;
        // $("#divHtml_" + id).css("display", "block");
    } else {
        oldtext = String($("#label_" + id).text());
        newText = oldtext.replace("✔   ", "");
        // $("#divHtml_" + id).css("display", "none");
    }
    $("#label_" + id).text(newText);
}

function eliminarMascota(ID) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/mascotas/eliminarMascota.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    preloader.show();
                    regresaMascotas();
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

function traerHistorialMascota(ID) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/mascotas/traerHistorialMascota.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                    } else {
                        result.forEach((data, index) => {
                            html += `
                            <li class="rb-item" ng-repeat="itembx">
                                <div class="timestamp">${volteaFecha(data.fecha, 1)} </div>
                                <div class="item-title">${data.motivo_movimiento}</div>
                            </li> `;
                        });
                        $("#historialMascotaSpace").html(html);
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
