/* HEADER */

function goToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/* HAMBURGER MENU */

function toggleMenu() {
  const navMenu = document.getElementById('nav-menu');
  const header = document.querySelector('header');

  navMenu.classList.toggle('open');

  if (navMenu.classList.contains('open')) {
    header.classList.add('menu-open');
  } else {
    header.classList.remove('menu-open');
  }
}

/* MOBILE PROJECTS */

document.addEventListener("DOMContentLoaded", () => {
  const arrows = document.querySelectorAll(".arrow-toggle");

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const targetId = arrow.getAttribute("data-target");
      const targetInfo = document.getElementById(targetId);
      const isHidden = targetInfo.classList.contains("hidden");

      // Ocultar todos los info
      document.querySelectorAll(".mobile-project-info").forEach((info) => {
        info.classList.add("hidden");
      });

      // Resetear todas las flechas
      arrows.forEach((a) => a.classList.remove("rotate"));

      // Mostrar si estaba oculto
      if (isHidden) {
        targetInfo.classList.remove("hidden");
        arrow.classList.add("rotate");
      }
    });
  });
});


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

