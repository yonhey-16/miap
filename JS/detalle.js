function toggleFavorito(id, nombre, imagen) {
    const esFavorito = favoritos.some(show => show.id === id);

    if (esFavorito) {
        // Eliminar del listado de favoritos
        favoritos = favoritos.filter(show => show.id !== id);
    } else {
        // Añadir a favoritos
        favoritos.push({ id, name: nombre, image: imagen });
    }

    // Guardar favoritos en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

async function mostrarDetalle(id) {
    const app = document.getElementById("app");
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const show = await res.json();

    const esFavorito = favoritos.some(fav => fav.id === id);

    const detalle = `
    <section class="c-detalle">
        <img src="${show.image?.medium || 'https://via.placeholder.com/150'}" alt="${show.name}" height="120" width="auto">
        <h2>${show.name}</h2>
        <p>ID: ${show.id}</p>
        <p>Géneros: ${show.genres.join(', ')}</p>
        <p>${show.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>
        <button onclick="toggleFavorito(${show.id}, '${show.name}', ${JSON.stringify(show.image)})">
            ${esFavorito ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
        </button>
    </section>
    `;

    app.innerHTML = detalle;
}
