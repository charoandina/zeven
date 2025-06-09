/* HEADER */

function goToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/* FORM */

$(document).ready(function () {
  let form = document.getElementById("contact-form");
  let responseContainer = document.getElementById("form-response");

  if (!form) {
    console.error("El formulario no se encontró en el DOM.");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(form);
    formData.append("action", "enviar_formulario");

    $.ajax({
      url: "procesar_formulario.php",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
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