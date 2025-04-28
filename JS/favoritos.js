
function mostrarFavoritos() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    const contenedor = document.createElement("section");
    contenedor.classList.add("c-lista");
    contenedor.innerHTML = generarLista(favoritos);

    app.appendChild(contenedor);

}