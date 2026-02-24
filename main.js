document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  window.addEventListener("scroll", () => {
    const trigger = window.innerHeight * 0.85;

    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;

      if (top < trigger) {
        el.classList.add("activo");
      }
    });
  });
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".tarjeta-auto img, .resumen-auto img")) {
    const visor = document.getElementById("visorImagen");
    const imgGrande = document.getElementById("imagenAmpliada");

    imgGrande.src = e.target.src;
    visor.classList.remove("oculto");
  }
});

document.querySelector(".cerrar-visor")?.addEventListener("click", () => {
  document.getElementById("visorImagen").classList.add("oculto");
});

document.getElementById("visorImagen")?.addEventListener("click", (e) => {
  if (e.target.id === "visorImagen") {
    e.target.classList.add("oculto");
  }
});