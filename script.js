// Animación de aparición al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  if (cards.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 },
    );

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(card);
    });
  }

  // Desplazamiento suave para el botón principal
  const btnPrincipal = document.querySelector(".btn-principal");
  if (btnPrincipal) {
    btnPrincipal.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelector("#carpetas")
        .scrollIntoView({ behavior: "smooth" });
    });
  }
});

// FUNCIONES PARA LA VENTANA MODAL DEL PDF
function abrirModalPdf(rutaPdf) {
  const modal = document.getElementById("modalPdf");
  const iframe = document.getElementById("iframePdf");

  if (modal && iframe) {
    iframe.src = rutaPdf;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function cerrarModalPdf() {
  const modal = document.getElementById("modalPdf");
  const iframe = document.getElementById("iframePdf");

  if (modal && iframe) {
    modal.style.display = "none";
    iframe.src = "";
    document.body.style.overflow = "auto";
  }
}
