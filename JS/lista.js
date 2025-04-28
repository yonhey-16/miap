// Función para mostrar la lista de categorías disponibles
async function mostrarCategorias() {
    try {
        const respuesta = await fetch("https://api.tvmaze.com/shows");
        const datos = await respuesta.json();

        // Obtener las categorías únicas
        const categorias = obtenerCategoriasUnicas(datos);

        // Mostrar las categorías en el filtro
        mostrarCategoriasEnFiltro(categorias);

        // Mostrar todos los shows al principio
        mostrarListaDeShows(datos);
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        document.getElementById("app").innerHTML = "<p>Error al cargar las categorías.</p>";
    }
}

// Función para obtener categorías únicas de los shows
function obtenerCategoriasUnicas(shows) {
    const categorias = new Set();
    shows.forEach(show => {
        if (show.genres) {
            show.genres.forEach(genre => {
                categorias.add(genre); // Añadir cada género único
            });
        }
    });
    return Array.from(categorias); // Convertir el Set en un array
}

// Función para mostrar las categorías en el filtro
function mostrarCategoriasEnFiltro(categorias) {
    const filtro = document.getElementById("filtro");
    filtro.innerHTML = ""; // Limpiar los filtros existentes

    // Agregar un botón para cada categoría
    categorias.forEach(categoria => {
        const boton = document.createElement("button");
        boton.classList.add("filtro-boton");
        boton.innerText = categoria;
        boton.onclick = () => filtrarPorCategoria(categoria); // Llamar a la función para filtrar por categoría
        filtro.appendChild(boton);
    });
}

// Función para filtrar los shows por categoría
async function filtrarPorCategoria(categoria) {
    try {
        const respuesta = await fetch("https://api.tvmaze.com/shows");
        const datos = await respuesta.json();

        // Filtrar los shows por la categoría seleccionada
        const showsFiltrados = datos.filter(show => 
            show.genres && show.genres.includes(categoria)
        );

        mostrarListaDeShows(showsFiltrados); // Mostrar los shows filtrados
    } catch (error) {
        console.error("Error al filtrar los programas:", error);
        document.getElementById("app").innerHTML = "<p>Error al cargar los programas de la categoría.</p>";
    }
}

// Función para mostrar la lista de shows
function mostrarListaDeShows(shows) {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpiar el contenido

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    // Generar la lista de shows
    seccion.innerHTML = generarLista(shows);

    // Agregar los elementos al DOM
    app.appendChild(seccion);
}

// Generar la lista de programas de TV
function generarLista(shows) {
    return shows.map(show => {
        const id = show.id;
        return `
        <div class="c-lista-serie" onclick="mostrarDetalle(${id})">
            <img src="${show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image'}" alt="${show.name}" loading="lazy">
            <h3>${show.name}</h3>
            <p>${show.premiered ? new Date(show.premiered).getFullYear() : 'Año desconocido'}</p>
        </div>`;
    }).join('');
}

// Función para mostrar el detalle de un show
async function mostrarDetalle(id) {
    try {
        const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await res.json();

        const app = document.getElementById("app");
        app.innerHTML = `
            <section class="c-detalle">
                <img src="${data.image ? data.image.medium : ''}" alt="${data.name}" height="120" width="auto">
                <p>${data.name}</p>
                <p>${data.id}</p>
                <p>${data.genres.join(', ')}</p>
                <p>${data.language}</p>
                <p>${data.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>
            </section>
        `;
    } catch (error) {
        console.error("Error al mostrar el detalle:", error);
        document.getElementById("app").innerHTML = "<p>Error al cargar los detalles del programa.</p>";
    }
}

// Inicializar la página con las categorías
document.addEventListener("DOMContentLoaded", mostrarCategorias);
