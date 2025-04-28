// Mostrar lista principal de shows
function mostrarLista(shows) {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpiar

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    // Campo de búsqueda
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar programa...";
    buscador.addEventListener("input", (evento) => buscarShows(evento, shows));

    // Botones de filtro por género
    const categorias = [
        "All", "Drama", "Comedy", "Action", "Romance", "Thriller", "Sci-Fi",
        "Fantasy", "Documentary", "Mystery", "Horror", "Reality", "Family", "News"
    ];
    const listaCategorias = categorias.map(categoria => 
        `<button class="filtro-boton" onclick="filtrarPorCategoria('${categoria}', shows)">${categoria}</button>`
    ).join('');

    const filtro = document.createElement("div");
    filtro.classList.add("filtro");
    filtro.innerHTML = listaCategorias;

    // Lista inicial
    seccion.innerHTML = generarLista(shows);

    // Agregar todo al DOM
    app.appendChild(buscador);
    app.appendChild(filtro);
    app.appendChild(seccion);
}

// Crear la lista de shows
function generarLista(shows) {
    return shows.map(show => `
        <div class="c-lista-show show-${show.id}" onclick="mostrarDetalle(${show.id})">
            <p>${show.name}</p>
            <img src="${show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}" width="auto" height="60" loading="lazy" alt="${show.name}">
            <p>${show.premiered || 'Año desconocido'}</p>
        </div>
    `).join('');
}

// Búsqueda de shows
function buscarShows(evento, shows) {
    const texto = evento.target.value.toLowerCase();
    const listaFiltrada = texto.length >= 3
        ? shows.filter(show => show.name.toLowerCase().includes(texto))
        : shows;

    document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
}

// Filtro por categoría
async function filtrarPorCategoria(categoria, shows) {
    if (categoria === "All") {
        mostrarLista(shows);
    } else {
        try {
            const respuesta = await fetch(`https://api.tvmaze.com/search/shows?q=${categoria}`);
            const datos = await respuesta.json();

            const showsFiltrados = datos.filter(show => 
                show.show.genres.includes(categoria)
            );

            mostrarLista(showsFiltrados.map(item => item.show));
        } catch (error) {
            console.error("Error al filtrar por categoría:", error);
            document.getElementById("app").innerHTML = `<p>Error al cargar la categoría "${categoria}".</p>`;
        }
    }
}

// Obtener shows al cargar
async function obtenerShows() {
    try {
        const respuesta = await fetch("https://api.tvmaze.com/shows");
        const datos = await respuesta.json();
        mostrarLista(datos);
    } catch (error) {
        console.error("Error al obtener programas:", error);
        document.getElementById("app").innerHTML = "<p>Error al cargar los programas.</p>";
    }
}

document.addEventListener("DOMContentLoaded", obtenerShows);
