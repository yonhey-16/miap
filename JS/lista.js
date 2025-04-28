// Función principal para mostrar la lista de programas
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

    // Crear botones de categorías con la funcionalidad de filtrar
    let listaCategorias = categorias.map(categoria => 
        `<button class="filtro-boton" id="btn-${categoria}" onclick="filtrarPorCategoria('${categoria}', shows)">${categoria}</button>`
    ).join('');

    const filtro = document.createElement("div");
    filtro.classList.add("filtro");
    filtro.innerHTML = listaCategorias;

    // Agregar filtro al DOM
    app.appendChild(buscador);
    app.appendChild(filtro);

    // Mostrar la lista inicial de shows
    seccion.innerHTML = generarLista(shows);
    app.appendChild(seccion);
}

// Función para realizar la búsqueda de programas
function buscarShows(evento, shows) {
    const texto = evento.target.value.toLowerCase();
    const listaFiltrada = texto.length >= 3
        ? shows.filter(show => 
            show.name.toLowerCase().includes(texto)
        )
        : shows;

    document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
}

// Función para filtrar los shows por categoría
async function filtrarPorCategoria(categoria, shows) {
    // Cambiar la clase del botón seleccionado
    const botonesCategoria = document.querySelectorAll('.filtro-boton');
    botonesCategoria.forEach(btn => {
        btn.classList.remove('activo');  // Eliminar clase activa de todos los botones
    });

    const btnSeleccionado = document.getElementById(`btn-${categoria}`);
    if (btnSeleccionado) {
        btnSeleccionado.classList.add('activo');  // Añadir clase activa al botón seleccionado
    }

    let showsFiltrados;

    if (categoria === "All") {
        // Mostrar todos los shows si se selecciona "All"
        showsFiltrados = shows;
    } else {
        // Filtrar los programas que tienen la categoría seleccionada
        showsFiltrados = shows.filter(show =>
            show.genres.includes(categoria)
        );
    }

    mostrarLista(showsFiltrados);  // Mostrar los shows filtrados por categoría
}
