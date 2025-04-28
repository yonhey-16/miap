// Función para mostrar las series favoritas
function mostrarFavoritos() {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpia el contenido

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {
        app.innerHTML = "<p>No tienes series favoritas todavía.</p>";
        return;
    }

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    seccion.innerHTML = favoritos.map(favorito => `
        <div class="c-favorito-show">
            <img src="${favorito.image ? favorito.image : 'https://via.placeholder.com/210x295?text=No+Image'}" alt="${favorito.name}" loading="lazy">
            <h3>${favorito.name}</h3>
            <button onclick="quitarFavorito(${favorito.id})">Quitar</button>
        </div>
    `).join('');

    app.appendChild(seccion);
}

// Función para quitar una serie de favoritos
function quitarFavorito(id) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(fav => fav.id !== id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarFavoritos();
}

// Inicializar favoritos al cargar la página
document.addEventListener("DOMContentLoaded", mostrarFavoritos);
