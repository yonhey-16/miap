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
    app.innerHTML = ""; // Limpiar el contenido anterior

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista"); // Usar la misma clase de lista
    seccion.classList.add("c-mios");  // Clase para "Mios" (hereda el estilo de lista)

    let misShows = ""; // Aquí se irá armando el HTML

    // Mostrar un máximo de 20 cuadros, no más
    const maxCuadros = 20;

    for (let i = 0; i < Math.min(misIds.length, maxCuadros); i++) {  // Limita a 20
        const id = misIds[i];
        misShows += `
            <div class="c-unshow c-mios-show show-${id}">
                <p>Cuadro ${i + 1}</p>  <!-- Mostrar el número de cuadro -->
            </div>`;
    }

    seccion.innerHTML = misShows;

    const contador = document.createElement("p");
    contador.textContent = `${misIds.length} / ${totalShows}`;  // Muestra la cantidad de "Mios" seleccionados
    app.appendChild(contador);
    app.appendChild(seccion);
}

// Asegúrate de que la función General() se llame cuando se cargue la página
document.addEventListener("DOMContentLoaded", General);
