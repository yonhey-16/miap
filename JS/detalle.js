let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const toggleFavorito = (id, nombre) => {
    id = Number(id);
    const esFavorito = favoritos.some(show => Number(show.id) === id);

    if (esFavorito) {
        // Eliminar del listado de favoritos
        favoritos = favoritos.filter(s => Number(s.id) !== id);
        document.getElementById(`corazon-${id}`).textContent = '🤍';
    } else {
        // Añadir a favoritos
        favoritos.push({ 
            id, 
            nombre, 
            url: `https://api.tvmaze.com/shows/${id}` 
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

    if (favoritos.some(show => Number(show.id) === id)) {
        corazonIcono.textContent = '❤️';
    } else {
        corazonIcono.textContent = '🤍';
    }
};

async function mostrarDetalle(id) {
    id = Number(id);
    const res = await fetch('https://api.tvmaze.com/shows/' + id);
    const data = await res.json();

    const app = document.getElementById("app");
    const esFavorito = favoritos.some(show => Number(show.id) === id);

    const detalle = `
    <section class="c-detalle">
        <img src="${data.image ? data.image.medium : ''}" alt="${data.name}" height="120" width="auto">
        <p>${data.name}</p>
        <p>${data.id}</p>
        <p>${data.genres.join(', ')}</p>
        <p>${data.language}</p>
        <p>${data.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>

        <button id="favorito-btn-${id}" onclick="toggleFavorito(${id}, '${data.name}')">
            <span id="corazon-${id}" class="corazon">${esFavorito ? '❤️' : '🤍'}</span> Favorito
        </button>
    </section>
    `;

    app.innerHTML = detalle;
    actualizarIconoFavorito(id);
}

// Función para mostrar solo el nombre del show
function mostrarDetalle(nombre){
    const app = document.getElementById("app");
    app.innerHTML = nombre;
}
