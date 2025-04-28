let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function mostrarMios() {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpiar contenido

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista", "c-mios");

    let misShows = "";

    for (let i = 1; i <= totalShows; i++) {
        const showFavorito = favoritos.find(fav => fav.id === i);

        if (showFavorito) {
            misShows += `
            <div class="c-unshow c-mios-show show-${i}" onclick="mostrarDetalle(${i})">
                <img src="${showFavorito.image?.medium || 'https://via.placeholder.com/150'}" width="auto" height="100" loading="lazy" alt="${showFavorito.name}">
                <p>${showFavorito.name}</p>
            </div>`;
        } else {
            misShows += `
            <div class="c-unshow">
                <p>${i}</p>
            </div>`;
        }
    }

    seccion.innerHTML = misShows;

    let contador = document.createElement("p");
    contador.textContent = `${favoritos.length} / ${totalShows} series favoritas`;
    app.appendChild(contador);
    app.appendChild(seccion);
}
