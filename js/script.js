/* HEADER */

function goToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/* FORM */

$(document).ready(function () {
  var form = $("#contact-form");
  var responseContainer = $("#form-response");

  if (form.length === 0) {
    console.error("El formulario no se encontró en el DOM.");
    return;
  }

  form.on("submit", function (event) {
    event.preventDefault();

    var formData = form.serialize();

    $.ajax({
      url: "procesar_formulario.php",
      type: "POST",
      data: formData,
      success: function (response) {
        responseContainer
          .html(response)
          .css("opacity", 1)
          .show();

        setTimeout(function () {
          responseContainer.fadeOut(500, function () {
            $(this).html("").show().css("opacity", 1); // Reset para próximas veces
          });
        }, 6000);
      },
      error: function () {
        responseContainer
          .html("Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.")
          .css("opacity", 1)
          .show();

        setTimeout(function () {
          responseContainer.fadeOut(500, function () {
            $(this).html("").show().css("opacity", 1);
          });
        }, 6000);
      },
    });
  });
});