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

    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("email");
    const inputTelefono = document.getElementById("telefono");

    let mensualidadCalculada = 0;

    function calcularMensualidad() {
        const precio = auto.precio;
        const porcentajeEnganche = parseInt(selectEnganche.value) / 100;
        const meses = parseInt(selectPlazo.value);

        const montoEnganche = precio * porcentajeEnganche;
        const restoAPagar = precio - montoEnganche;
        const interesFijo = 1.15;

        const mensualidad = (restoAPagar * interesFijo) / meses;

        mensualidadCalculada = mensualidad;

        textoMensualidad.innerText =
            `$${mensualidad.toLocaleString('es-MX', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
    }

    selectEnganche.addEventListener("change", calcularMensualidad);
    selectPlazo.addEventListener("change", calcularMensualidad);

    calcularMensualidad();

    document.getElementById("formCotizacion").addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!inputNombre.value || !inputEmail.value || !inputTelefono.value) {
            alert("Completa todos los campos");
            return;
        }

        const datos = {
            auto_id: auto.id,
            nombre_cliente: inputNombre.value,
            email: inputEmail.value,
            telefono: inputTelefono.value,
            enganche: parseInt(selectEnganche.value),
            plazo_meses: parseInt(selectPlazo.value),
            pago_mensual: mensualidadCalculada
        };

        try {
            const modal = document.getElementById("modalExito");
            const mensaje = document.getElementById("mensajeExito");
            const btnVolver = document.getElementById("btnVolver");
            const res = await fetch("http://localhost:3000/api/cotizaciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            });

            if (!res.ok) throw new Error("Error al guardar");

            mensaje.textContent =
                `Tu cotización del ${auto.marca} ${auto.modelo} fue guardada correctamente.`;

            modal.classList.remove("oculto");

            btnVolver.onclick = () => {
                window.location.href = "index.html";
            };

        } catch (error) {
            console.error(error);
            alert("No se pudo guardar la cotización");
        }
    });
});