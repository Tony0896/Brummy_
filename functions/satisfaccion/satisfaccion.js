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
            $("#mesEncuesta").append(`<option value="${m}" selected>${months[i]}</option>`);
        } else {
            $("#mesEncuesta").append(`<option value="${m}">${months[i]}</option>`);
        }
    }

    for (let i = 3; i > 0; i--) {
        let new_anio = Number(anio) - i;
        $("#anioEncuesta").append(`<option value="${new_anio}">${new_anio}</option>`);
    }
    $("#anioEncuesta").append(`<option value="${anio}" selected>${anio}</option>`);

    for (let i = 1; i < 4; i++) {
        let new_anio = Number(anio) + i;
        $("#anioEncuesta").append(`<option value="${new_anio}">${new_anio}</option>`);
    }

    $("#mesEncuesta").change(() => {
        obtenerDataSatisfaccion($("#mesEncuesta").val(), $("#anioEncuesta").val());
    });
    $("#anioEncuesta").change(() => {
        obtenerDataSatisfaccion($("#mesEncuesta").val(), $("#anioEncuesta").val());
    });

    obtenerDataSatisfaccion(mes, anio);
});

function obtenerDataInitialSatisfaccion(mes, anio) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/encuestas/obtenerEncuestas.php",
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
                        $("#preguntasBody").html(html);
                        dataTableCreate();
                    } else {
                        dataTableDestroy();
                        $("#preguntasBody").html(html);
                        result.forEach((data, index) => {
                            $("#preguntasBody").append(`
                                <tr>
                                    <td>${Number(index + 1)}</td>
                                    <td>${data.Pregunta}</td>
                                    <td id="td_${data.ID}"></td>
                                    <td><canvas id="bar-chart_${data.ID}" width="200" height="150"></canvas></td>
                                </tr>
                            `);
                            let IDPregunta = data.ID;
                            $.ajax({
                                method: "POST",
                                dataType: "JSON",
                                url: "./views/satisfaccion/obtenerDataPreguntas.php",
                                data: { mes, anio, IDPregunta },
                            })
                                .done(function (results) {
                                    let success = results.success;
                                    let result = results.result;
                                    switch (success) {
                                        case true:
                                            if (result == "Sin Datos") {
                                                dataTableDestroy();
                                                dataTableCreate();
                                            } else {
                                                dataTableDestroy();
                                                let html = "";
                                                let dataValues = [];
                                                let dataLabel = [];
                                                result.forEach((data, index) => {
                                                    html += `
                                                        <div>${data.respuesta1}<span class="material-icons" style="vertical-align: middle;color: #212529;"> remove </span>${data.opcion1}</div>
                                                        <div>${data.respuesta2}<span class="material-icons" style="vertical-align: middle;color: #212529;"> remove </span>${data.opcion2}</div>
                                                        <div>${data.respuesta3}<span class="material-icons" style="vertical-align: middle;color: #212529;"> remove </span>${data.opcion3}</div>
                                                        <div>${data.respuesta4}<span class="material-icons" style="vertical-align: middle;color: #212529;"> remove </span>${data.opcion4}</div>
                                                        <div>${data.respuesta5}<span class="material-icons" style="vertical-align: middle;color: #212529;"> remove </span>${data.opcion5}</div>
                                                    `;
                                                    dataValues = [
                                                        Number(data.respuesta1),
                                                        Number(data.respuesta2),
                                                        Number(data.respuesta3),
                                                        Number(data.respuesta4),
                                                        Number(data.respuesta5),
                                                    ];
                                                    // dataValues = [6, 5, 4, 5, 4];
                                                    dataLabel = [data.opcion1, data.opcion2, data.opcion3, data.opcion4, data.opcion5];
                                                });
                                                $(`#td_${data.ID}`).html(`
                                                    <div style="font-weight: bold;">
                                                        ${html}
                                                    </div>
                                                `);
                                                new Chart(document.getElementById("bar-chart_" + data.ID), {
                                                    type: "doughnut",
                                                    data: {
                                                        datasets: [
                                                            {
                                                                data: dataValues,
                                                                backgroundColor: ["#ffcd56", "#ff6384", "#36a2eb", "#009071", "#a87dff"],
                                                            },
                                                        ],

                                                        // These labels appear in the legend and in the tooltips when hovering different arcs
                                                        labels: dataLabel,
                                                    },
                                                    options: {
                                                        legend: { display: false },
                                                        title: {
                                                            display: true,
                                                            text: "",
                                                        },
                                                    },
                                                });

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
                        });
                    }
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
}

function obtenerDataSatisfaccion(mes, anio) {
    if (mes && anio) {
        preloader.show();
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/satisfaccion/obtenerDataSatisfaccion.php",
            data: { mes, anio },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                let estrellas_5 = 0,
                    estrellas_4 = 0,
                    estrellas_3 = 0,
                    estrellas_2 = 0,
                    estrellas_1 = 0;
                switch (success) {
                    case true:
                        if (result == "Sin Datos") {
                        } else {
                            dataTableDestroy();
                            result.forEach((data, index) => {
                                $("#encuestasContestadas").html(data.encuestasContestadas);
                                $("#encuestasGeneradas").html(data.encuestasGeneradas);
                                $("#encuestasPorContestar").html(data.encuestasPorContestar);
                                $("#5_estrellas").html(data.estrellas_5);
                                $("#4_estrellas").html(data.estrellas_4);
                                $("#3_estrellas").html(data.estrellas_3);
                                $("#2_estrellas").html(data.estrellas_2);
                                $("#1_estrellas").html(data.estrellas_1);
                                estrellas_5 = data.estrellas_5;
                                estrellas_4 = data.estrellas_4;
                                estrellas_3 = data.estrellas_3;
                                estrellas_2 = data.estrellas_2;
                                estrellas_1 = data.estrellas_1;
                            });
                            dataTableCreate();
                            obtenerDataInitialSatisfaccion(mes, anio);
                            if (estrellas_5 == 0 && estrellas_4 == 0 && estrellas_3 == 0 && estrellas_2 == 0 && estrellas_1 == 0) {
                                $("#bar-chart_gg").css("display", "none");
                            } else {
                                $("#bar-chart_gg").css("display", "block");
                            }
                            new Chart(document.getElementById("bar-chart_gg"), {
                                type: "bar",
                                data: {
                                    labels: ["1 estrellas", "2 estrellas", "3 estrellas", "4 estrellas", "5 estrellas"],
                                    datasets: [
                                        {
                                            label: "Calificaciones",
                                            backgroundColor: ["#009071", "#009071", "#009071", "#009071", "#009071"],
                                            data: [estrellas_1, estrellas_2, estrellas_3, estrellas_4, estrellas_5],
                                        },
                                    ],
                                },
                                options: {
                                    legend: { display: false },
                                    title: {
                                        display: true,
                                        text: "",
                                    },
                                },
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
}
