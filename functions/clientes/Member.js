$(document).ready(function () {
    preloader.hide();

    let nameCredential = localStorage.getItem("nombre") + " " + localStorage.getItem("apellidoP") + " " + localStorage.getItem("apellidoM");
    let claveCredential = `BRUHPSCTE${localStorage.getItem("IDCte")}`;
    let emergenciaCredential = localStorage.getItem("telefono");
    let correo = localStorage.getItem("correo");

    $("#nameCredential").html(nameCredential);
    $("#nameCredential1").html(nameCredential);
    $("#claveCredential").html(claveCredential);
    $("#claveCredential1").html(claveCredential);
    $("#correoCrendential").html(correo);
    $("#nssCredential").html(correo);
    $("#emergenciaCredential").html(emergenciaCredential);
    $("#telefonoCrendential1").html(emergenciaCredential);

    $("#nameVete").html(localStorage.getItem("nameVete"));
    $("#nameVete0").html(localStorage.getItem("nameVete"));

    $("#telcredentialvete").html(localStorage.getItem("telcredentialvete"));
    $("#telcredentialvete0").html(localStorage.getItem("telcredentialvete"));

    $("#horario1credential").html(localStorage.getItem("horario1credential"));
    $("#horario1credential0").html(localStorage.getItem("horario1credential"));
    $("#horario2credential").html(localStorage.getItem("horario2credential"));
    $("#horario2credential0").html(localStorage.getItem("horario2credential"));
    $("#horario3credential").html(localStorage.getItem("horario3credential"));
    $("#horario3credential0").html(localStorage.getItem("horario3credential"));

    $("#Direccion1credential").html(localStorage.getItem("Direccion1credential"));
    $("#Direccion1credential0").html(localStorage.getItem("Direccion1credential"));

    $("#Direccion1credentia2").html(localStorage.getItem("Direccion1credentia2"));
    $("#Direccion1credentia20").html(localStorage.getItem("Direccion1credentia2"));

    new QRious({
        element: document.querySelector("#qrCredential"),
        value: claveCredential, // La URL o el texto
        size: 70,
        backgroundAlpha: 0, // 0 para fondo transparente
        foreground: "#000", // Color del QR
        level: "Q", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
    });

    new QRious({
        element: document.querySelector("#qrCredential1"),
        value: claveCredential, // La URL o el texto
        size: 70,
        backgroundAlpha: 0, // 0 para fondo transparente
        foreground: "#000", // Color del QR
        level: "Q", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
    });
});

$("#crearpdf").click(() => {
    $("#fotoCuts").attr("src") ? window.print() : window.print();
    // Swal.fire({ icon: "warning", title: "Opps..", text: "La credencial aún no tiene una foto." });
});

function backRoute() {
    $("#people_menu").trigger("click");
}

$("#fileInputs").on("change", function () {
    $("#image").attr("src", "");
    if (this.files && this.files[0]) {
        if (this.files[0].type.match(/^image\//)) {
            var selectedFile = this.files[0];
            var reader = new FileReader();
            var imgtag = document.getElementById("image");
            reader.onload = function (event) {
                imgtag.src = event.target.result;
            };
            reader.readAsDataURL(selectedFile);
            $("#modal").modal({
                backdrop: "static",
                keyboard: false,
            });
            $("#modal").modal("show");
        }
    }
});

var image = document.getElementById("image");
var data = document.querySelector("#data");
var cropBoxData = document.querySelector("#cropBoxData");
var button = document.getElementById("buttonCut");
var result = document.getElementById("result");
var minAspectRatio = 1.0;
var maxAspectRatio = 1.0;
var canvasData;
var cropper;

$("#modal").on("shown.bs.modal", function () {
    var cropper = new Cropper(image, {
        dragMode: "move",
        aspectRatio: 1 / 1.2, // 16:9 || 1.1
        autoCropArea: 0.65,
        restore: false,
        guides: false,
        center: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
    });

    button.onclick = function () {
        $("#result").html(cropper.getCroppedCanvas());
        cropper.destroy();
        $("#fileInputs").val("");
        $("#modal").modal("hide");
        $("#modal").data("bs.modal", null);
        var can = document.getElementsByTagName("canvas");
        var src = can[0].toDataURL("image/png");
        $("#fotoCuts").attr("src", src);
        $("#fotoCuts1").attr("src", src);
    };

    $(".close_modal").click(() => {
        cropper.destroy();
        $("#fileInputs").val("");
        $("#modal").modal("hide");
        $("#modal").data("bs.modal", null);
    });
});
