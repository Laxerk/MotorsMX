const contenedor = document.getElementById("contenedorAutos");
const inputBusqueda = document.getElementById("busqueda");
const filtroTipo = document.getElementById("filtroTipo");
const filtroPrecio = document.getElementById("filtroPrecio");

// 🔥 AQUÍ guardaremos los autos que vienen del backend
let autos = [];

// =========================
// MOSTRAR AUTOS
// =========================
function mostrarAutos(listaAutos) {
    contenedor.innerHTML = "";

    if (listaAutos.length === 0) {
        contenedor.innerHTML = `
            <div class="mensaje-vacio">
                <h3>No encontramos resultados </h3>
                <p>Intenta ajustar los filtros o buscar otra marca.</p>
            </div>
        `;
        return;
    }

    listaAutos.forEach(auto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-auto");

        tarjeta.innerHTML = `
            <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}">
            <h2>${auto.marca} ${auto.modelo}</h2>
            <p class="anio">${auto.año}</p>
            <p class="tipo">${auto.tipo}</p>
            <p class="precio">$${Number(auto.precio).toLocaleString()}</p>
            <button class="btn-cotizar">Cotizar</button>
        `;

        tarjeta.querySelector(".btn-cotizar").addEventListener("click", () => {
            localStorage.setItem("autoSeleccionado", JSON.stringify(auto));
            window.location.href = "paginapacotizar.html";
        });

        contenedor.appendChild(tarjeta);
    });
}

// =========================
// FILTRAR AUTOS
// =========================
function filtrarAutos() {
    const texto = inputBusqueda.value.toLowerCase();
    const tipo = filtroTipo.value;
    const precioMax = parseInt(filtroPrecio.value);

    const autosFiltrados = autos.filter(auto => {
        const coincideTexto =
            auto.marca.toLowerCase().includes(texto) ||
            auto.modelo.toLowerCase().includes(texto);

        const coincideTipo = tipo === "" || auto.tipo === tipo;
        const coincidePrecio = isNaN(precioMax) || auto.precio <= precioMax;

        return coincideTexto && coincideTipo && coincidePrecio;
    });

    mostrarAutos(autosFiltrados);
}

// =========================
// 🔥 CARGAR AUTOS DESDE BACKEND
// =========================
async function cargarAutos() {
    try {
        const response = await fetch("http://localhost:3000/autos");
        autos = await response.json();

        console.log("Autos cargados:", autos);

        mostrarAutos(autos); // 👈 mostrar todos al inicio
    } catch (error) {
        console.error("Error al cargar autos:", error);
    }
}

// =========================
// EVENTOS
// =========================
inputBusqueda.addEventListener("input", filtrarAutos);
filtroTipo.addEventListener("change", filtrarAutos);
filtroPrecio.addEventListener("change", filtrarAutos);

// 🔥 CARGAR AL INICIAR LA PÁGINA
document.addEventListener("DOMContentLoaded", cargarAutos);