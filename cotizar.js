document.addEventListener("DOMContentLoaded", () => {

    const autoData = localStorage.getItem("autoSeleccionado");
    

    if (!autoData) {
        window.location.href = "index.html";
        return;
    }

    const auto = JSON.parse(autoData);

 
    const contenedorResumen = document.getElementById("resumenAuto");
    contenedorResumen.innerHTML = `
        <img src="${auto.imagen}" alt="${auto.modelo}">
        <h2>${auto.marca} ${auto.modelo}</h2>
        <p class="anio-detalle">${auto.año} - ${auto.tipo}</p>
        <p class="precio-grande">$${auto.precio.toLocaleString()}</p>
        <hr>
        <p>Estás cotizando este vehículo. Ajusta el enganche y plazo para ver tu mensualidad.</p>
    `;

 
    const selectEnganche = document.getElementById("enganche");
    const selectPlazo = document.getElementById("plazo");
    const textoMensualidad = document.getElementById("mensualidad");

    function calcularMensualidad() {
        const precio = auto.precio;
        const porcentajeEnganche = parseInt(selectEnganche.value) / 100;
        const meses = parseInt(selectPlazo.value);
        

        const montoEnganche = precio * porcentajeEnganche;
        const restoAPagar = precio - montoEnganche;
        const interesFijo = 1.15; // 
        
        const mensualidad = (restoAPagar * interesFijo) / meses;

        textoMensualidad.innerText = `$${mensualidad.toLocaleString('es-MX', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    selectEnganche.addEventListener("change", calcularMensualidad);
    selectPlazo.addEventListener("change", calcularMensualidad);


    calcularMensualidad();


    document.getElementById("formCotizacion").addEventListener("submit", (e) => {
        e.preventDefault();
        alert(`¡Gracias! Hemos enviado la cotización del ${auto.marca} ${auto.modelo} a tu correo.`);

        window.location.href = "index.html";
    });
});