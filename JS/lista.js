// Cambiar el nombre de la función para mostrar la lista
function mostrarLista() {
    obtenerShows();  // Llama a la función para obtener los shows de la API
}

// Función para obtener todos los shows disponibles
async function obtenerShows() {
    try {
        const respuesta = await fetch("https://api.tvmaze.com/shows");
        const datos = await respuesta.json();
        mostrarListaDeShows(datos); // Llama a una función para mostrar la lista
    } catch (error) {
        console.error("Error al obtener los programas:", error);
        document.getElementById("app").innerHTML = "<p>Error al cargar los programas.</p>";
    }
}

// Función para mostrar la lista de shows
function mostrarListaDeShows(shows) {
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

    // Crear los botones de filtro por género
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
