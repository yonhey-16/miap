let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

// Función para alternar favoritos
const toggleFavorito = (id, nombre) => {
    id = Number(id);
    const esFavorito = favoritos.some(show => show.id === id);

    if (esFavorito) {
        favoritos = favoritos.filter(s => s.id !== id);
        document.getElementById(`corazon-${id}`).textContent = '🤍';
    } else {
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

// Función para actualizar el icono de favorito
const actualizarIconoFavorito = (id) => {
    id = Number(id);
    const corazonIcono = document.getElementById(`corazon-${id}`);
    if (!corazonIcono) return;

    if (favoritos.some(show => show.id === id)) {
        corazonIcono.textContent = '❤️';
    } else {
        corazonIcono.textContent = '🤍';
    }
};

// Función para mostrar los detalles del show
async function mostrarDetalle(id) {
    id = Number(id);
    const res = await fetch('https://api.tvmaze.com/shows/' + id);
    const data = await res.json();

    const app = document.getElementById("app");
    const esFavorito = favoritos.some(show => show.id === id);

    const detalle = `
    <section class="c-detalle">
        <img src="${data.image ? data.image.medium : ''}" alt="${data.name}" height="120" width="auto">
        <h2>${data.name}</h2>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Géneros:</strong> ${data.genres.join(', ')}</p>
        <p><strong>Idioma:</strong> ${data.language}</p>
        <p><strong>Resumen:</strong> ${data.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>

        <button id="favorito-btn-${id}" onclick="toggleFavorito(${id}, '${data.name}')">
            <span id="corazon-${id}" class="corazon">${esFavorito ? '❤️' : '🤍'}</span> Favorito
        </button>
    </section>
    `;

    app.innerHTML = detalle;
    actualizarIconoFavorito(id);
}

// Función para mostrar la lista de shows
function mostrarLista(shows) {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpiar contenido

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    shows.forEach(show => {
        const id = show.id;
        const esFavorito = favoritos.some(fav => fav.id === id);

        const showItem = `
        <div class="c-lista-serie" onclick="mostrarDetalle(${id})">
            <img src="${show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}" alt="${show.name}" loading="lazy">
            <h3>${show.name}</h3>
            <p>${show.premiered ? new Date(show.premiered).getFullYear() : 'Año desconocido'}</p>
            <button id="favorito-btn-${id}" onclick="toggleFavorito(${id}, '${show.name}')">
                <span id="corazon-${id}" class="corazon">${esFavorito ? '❤️' : '🤍'}</span> Favorito
            </button>
        </div>
        `;
        seccion.innerHTML += showItem;
    });

    app.appendChild(seccion);
}

// Función para obtener todos los shows disponibles
async function obtenerShows() {
    try {
        const respuesta = await fetch("https://api.tvmaze.com/shows");
        const datos = await respuesta.json();
        mostrarLista(datos);
    } catch (error) {
        console.error("Error al obtener los programas:", error);
        document.getElementById("app").innerHTML = "<p>Error al cargar los programas.</p>";
    }
}

// Inicializar la lista de shows al cargar la página
document.addEventListener("DOMContentLoaded", obtenerShows);
