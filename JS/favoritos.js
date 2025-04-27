function mostrarFavoritos() {
    const app = document.getElementById("app");
    app.innerHTML = "<h2>Mis Series Favoritas</h2>";

    const contenedor = document.createElement("section");
    contenedor.classList.add("c-lista");
    contenedor.innerHTML = generarLista(favoritos);

    app.appendChild(contenedor);
}
