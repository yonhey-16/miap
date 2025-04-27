function mostrarLista(shows) {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpia el contenido

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    // Crear el campo de búsqueda
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar programa...";
    buscador.addEventListener("input", (evento) => buscarShows(evento, shows));

    // Crear los botones de filtro por género (usando categorías de TV)
    const categorias = [
        "All", "Drama", "Comedy", "Action", "Romance", "Thriller", "Sci-Fi",
        "Fantasy", "Documentary", "Mystery", "Horror", "Reality", "Family", "News"
    ];

    let listaCategorias = categorias.map(categoria => 
        `<button class="filtro-boton" onclick="filtrarPorCategoria('${categoria}', shows)">${categoria}</button>`
    ).join('');

    const filtro = document.createElement("div");
    filtro.classList.add("filtro");
    filtro.innerHTML = listaCategorias;

    // Generar la lista inicial de shows
    seccion.innerHTML = generarLista(shows);

    // Agregar los elementos al DOM
    app.appendChild(buscador);
    app.appendChild(filtro);
    app.appendChild(seccion);
}

function generarLista(shows) {
    return shows.map(show => {
        const id = show.show.id;
        return `
        <div class="c-lista-show show-${id}" onclick="mostrarDetalle(${id})">
            <p>${show.show.name}</p>
            <img src="${show.show.image ? show.show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}" width="auto" height="60" loading="lazy" alt="${show.show.name}">
            <p>${show.show.premiered || 'Año desconocido'}</p>
        </div>`;
    }).join('');
}

function buscarShows(evento, shows) {
    const texto = evento.target.value.toLowerCase();
    const listaFiltrada = texto.length >= 3
        ? shows.filter(show => 
            show.show.name.toLowerCase().includes(texto)
        )
        : shows;

    document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
}

async function filtrarPorCategoria(categoria, shows) {
    if (categoria === "All") {
        mostrarLista(shows); // Mostrar todos los shows si se selecciona "All"
    } else {
        try {
            const respuesta = await fetch(`https://api.tvmaze.com/search/shows?q=${categoria}`);
            const datos = await respuesta.json();

            const showsFiltrados = datos.filter(show => 
                show.show.genres.includes(categoria)
            );

            mostrarLista(showsFiltrados); // Mostrar los shows filtrados por categoría
        } catch (error) {
            console.error("Error al filtrar por categoría:", error);
            document.getElementById("app").innerHTML = `<p>Error al cargar los programas de la categoría "${categoria}".</p>`;
        }
    }
}

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
