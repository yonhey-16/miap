function mostrarLista(series) {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpia el contenido

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    // Crear el campo de búsqueda
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar Serie...";
    buscador.addEventListener("input", (evento) => buscarSerie(evento, series));

    // Crear los botones de filtro por género (ejemplo)
    const generos = [
        "All", "Drama", "Comedy", "Action", "Sci-Fi", "Fantasy", "Crime", "Horror", "Thriller"
    ];

    let listaGeneros = generos.map(genero => 
        `<button class="filtro-boton" onclick="filtrarPorGenero('${genero}', series)">${genero}</button>`
    ).join('');

    const filtro = document.createElement("div");
    filtro.classList.add("filtro");
    filtro.innerHTML = listaGeneros;

    // Generar la lista inicial de Series
    seccion.innerHTML = generarLista(series);

    // Agregar los elementos al DOM
    app.appendChild(buscador);
    app.appendChild(filtro);
    app.appendChild(seccion);
}

function generarLista(series) {
    return series.map(serie => {
        return `
        <div class="c-lista-serie serie-${serie.id}" onclick="mostrarDetalle('${serie.id}')">
            <p>${serie.name}</p>
            <img src="${serie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}" width="auto" height="150" loading="lazy" alt="${serie.name}">
            <p>${serie.genres.join(', ')}</p>
        </div>`;
    }).join('');
}

function buscarSerie(evento, series) {
    const texto = evento.target.value.toLowerCase();
    const listaFiltrada = texto.length >= 3 || !isNaN(texto)
        ? series.filter(serie => 
            serie.name.toLowerCase().includes(texto) || serie.id.toString().includes(texto)
        )
        : series;

    document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
}

async function filtrarPorGenero(unGenero, series) {
    if (unGenero === "All") {
        mostrarLista(series); // Mostrar todas las series si se selecciona "All"
    } else {
        try {
            const respuesta = await fetch(`https://api.tvmaze.com/shows`);
            const datos = await respuesta.json();

            const seriesFiltradas = datos.filter(s => s.genres.includes(unGenero));

            mostrarLista(seriesFiltradas); // Mostrar las series filtradas por género
        } catch (error) {
            console.error("Error al filtrar por género:", error);
            document.getElementById("app").innerHTML = `<p>Error al cargar series de género "${unGenero}".</p>`;
        }
    }
}
