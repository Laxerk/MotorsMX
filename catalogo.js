const contenedor = document.getElementById("contenedorAutos");
const inputBusqueda = document.getElementById("busqueda");
const filtroTipo = document.getElementById("filtroTipo");
const filtroPrecio = document.getElementById("filtroPrecio");

function mostrarAutos(listaAutos) {
    contenedor.innerHTML = "";

    listaAutos.forEach(auto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-auto");

        tarjeta.innerHTML = `
            <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}">
            <h2>${auto.marca} ${auto.modelo}</h2>
            <p class="anio">${auto.año}</p>
            <p class="tipo">${auto.tipo}</p>
            <p class="precio">$${auto.precio.toLocaleString()}</p>
            <button class="btn-cotizar">Cotizar</button>
        `;

        tarjeta.querySelector(".btn-cotizar").addEventListener("click", () => {
            localStorage.setItem("autoSeleccionado", JSON.stringify(auto));
            window.location.href = "paginapacotizar.html";
        });

        contenedor.appendChild(tarjeta);
    });
}

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

inputBusqueda.addEventListener("input", filtrarAutos);
filtroTipo.addEventListener("change", filtrarAutos);
filtroPrecio.addEventListener("change", filtrarAutos);

mostrarAutos(autos);
