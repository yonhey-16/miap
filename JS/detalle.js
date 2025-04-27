let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const toggleFavorito = (id, nombre) => {
    id = Number(id);
    const esFavorito = favoritos.some(serie => Number(serie.id) === id);

    if (esFavorito) {
        favoritos = favoritos.filter(s => Number(s.id) !== id);
        document.getElementById(`corazon-${id}`).textContent = '🤍';
    } else {
        favoritos.push({ 
            id, 
            nombre, 
            url: `https://api.tvmaze.com${id}` 
        });
        document.getElementById(`corazon-${id}`).textContent = '❤️';
    }

    // Guardar favoritos en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
};

const actualizarIconoFavorito = (id) => {
    id = Number(id);
    const corazonIcono = document.getElementById(`corazon-${id}`);
    if (!corazonIcono) return;

    if (favoritos.some(serie => Number(serie.id) === id)) {
        corazonIcono.textContent = '❤️';
    } else {
        corazonIcono.textContent = '🤍';
    }
};

async function mostrarDetalle(id) {
    id = Number(id);
    const res = await fetch(`https://api.tvmaze.com${id}`);
    const data = await res.json();

    const app = document.getElementById("app");
    const esFavorito = favoritos.some(serie => Number(serie.id) === id);

    const detalle = `
    <section class="c-detalle">
        <img src="${data.image?.original || 'https://via.placeholder.com/210x295?text=No+Image'}" alt="${data.name}" height="250" style="border-radius: 10px;">
        <h2>${data.name}</h2>
        <p><strong>Género:</strong> ${data.genres.join(", ")}</p>
        <p><strong>Idioma:</strong> ${data.language}</p>
        <p><strong>Rating:</strong> ${data.rating?.average || 'N/A'}</p>
        <p><strong>Resumen:</strong> ${data.summary || 'Sin descripción disponible.'}</p>

        <button id="favorito-btn-${id}" onclick="toggleFavorito(${id}, '${data.name.replace(/'/g, "\\'")}')">
            <span id="corazon-${id}" class="corazon">${esFavorito ? '❤️' : '🤍'}</span> Favorito
        </button>
    </section>
    `;

    app.innerHTML = detalle;
    actualizarIconoFavorito(id);
}
