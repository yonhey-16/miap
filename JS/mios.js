let shows = [];
let misIds = [1, 2, 3];  // Ejemplo de IDs de shows que el usuario ha seleccionado
let totalShows = 0; // Lo vamos a actualizar después

async function conexionLista() {
    const res = await fetch('https://api.tvmaze.com/shows');
    const data = await res.json();
    return data; // Devuelve el array completo de shows
}

async function General() {
    const infoShows = await conexionLista();
    shows = infoShows; // Guardamos la lista de shows
    totalShows = shows.length; // Actualizamos el total de shows
    mostrarLista(shows); // Llamamos a tu función mostrarLista()
}

async function mostrarMios() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");
    seccion.classList.add("c-mios");

    let misShows = ""; // Aquí se irá armando el HTML

    for (let i = 0; i < totalShows; i++) {  // Usamos totalShows como el límite superior
        const show = shows[i];  // Obtenemos el show por el índice

        if (misIds.includes(show.id)) {
            // Si tengo ese show, lo mostramos
            misShows += `
            <div class="c-unshow c-mios-show show-${show.id}" onclick="mostrarDetalle('${show.id}')">
                <img src="${show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}" width="auto" height="70" loading="lazy" alt="${show.name}">
                <p>${show.name}</p>
            </div>`;
        }
    }

    seccion.innerHTML = misShows;

    const contador = document.createElement("p");
    contador.textContent = `${misIds.length} / ${totalShows}`;
    app.appendChild(contador);
    app.appendChild(seccion);
}

// Asegúrate de que la función General() se llame cuando se cargue la página
document.addEventListener("DOMContentLoaded", General);
