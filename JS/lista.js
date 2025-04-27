function mostrarLista(pokemones) {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpia el contenido

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    // Crear el campo de búsqueda
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar Pokémon...";
    buscador.addEventListener("input", (evento) => buscarPoke(evento, pokemones));

    // Crear los botones de filtro por tipo
    const tipos = [
        "All", "normal", "fighting", "flying", "poison", "ground", "rock",
        "bug", "ghost", "steel", "fire", "water", "grass", "electric",
        "psychic", "ice", "dragon", "dark", "fairy", "stellar", "shadow", "unknown"
    ];

    let listaTipos = tipos.map(tipo => 
        `<button class="filtro-boton" onclick="filtrarPorTipo('${tipo}', pokemones)">${tipo}</button>`
    ).join('');

    const filtro = document.createElement("div");
    filtro.classList.add("filtro");
    filtro.innerHTML = listaTipos;

    // Generar la lista inicial de Pokémon
    seccion.innerHTML = generarLista(pokemones);

    // Agregar los elementos al DOM
    app.appendChild(buscador);
    app.appendChild(filtro);
    app.appendChild(seccion);
}

function generarLista(pokemones) {
    return pokemones.map(pokemon => {
        let id = pokemon.url.split("/")[6];
        return `
        <div class="c-lista-pokemon poke-${id}" onclick="mostrarDetalle('${id}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${pokemon.name}">
            <p>${pokemon.name}</p>
        </div>`;
    }).join('');
}

function buscarPoke(evento, pokemones) {
    const texto = evento.target.value.toLowerCase();
    const listaFiltrada = texto.length >= 3 || !isNaN(texto)
        ? pokemones.filter(pokemon => 
            pokemon.name.toLowerCase().includes(texto) || pokemon.url.includes("/" + texto)
        )
        : pokemones;

    document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
}

async function filtrarPorTipo(untipo, pokemones) {
    if (untipo === "All") {
        mostrarLista(pokemones); // Mostrar todos los Pokémon si se selecciona "All"
    } else {
        try {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/type/${untipo}`);
            const datos = await respuesta.json();

            const pokemonesFiltrados = datos.pokemon.map(p => p.pokemon);

            mostrarLista(pokemonesFiltrados); // Mostrar los Pokémon filtrados por tipo
        } catch (error) {
            console.error("Error al filtrar por tipo:", error);
            document.getElementById("app").innerHTML = `<p>Error al cargar Pokémon de tipo "${untipo}".</p>`;
        }
    }
}