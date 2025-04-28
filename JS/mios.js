let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function mostrarMios() {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpiar el contenido actual

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista", "c-mios");

    let misShows = "";

    favoritos.forEach(favorito => {
        misShows += `
        <div class="c-lista-serie c-mios-show" onclick="mostrarDetalle(${favorito.id})">
            <p>#${favorito.id}</p>
            <img src="${favorito.image?.medium || 'https://via.placeholder.com/150'}" width="100" height="140" alt="${favorito.name}">
            <h3>${favorito.name}</h3>
        </div>`;
    });

    seccion.innerHTML = misShows;

    let contador = document.createElement("p");
    contador.textContent = `${favoritos.length} / ${totalShows} series favoritas`;
    app.appendChild(contador);
    app.appendChild(seccion);
}
