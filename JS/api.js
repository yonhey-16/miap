let shows = [];
let totalShows = 1000; // Lo vamos a actualizar después

async function conexionLista() {
    const res = await fetch('https://api.tvmaze.com/shows');
    const data = await res.json();
    return data; // Devuelve el array completo de shows
}

async function General() {
    const infoShows = await conexionLista();
    shows = infoShows; // Guardamos la lista
    totalShows = shows.length;
    mostrarLista(shows); // Llamamos a tu función mostrarLista()
}
