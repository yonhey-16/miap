let pokemones = [];
let totalPokes = 1026; /* debe agregarse uno más ya que el índice comienza en 0 */

async function conexionLista() {
    const res = await fetch('https://api.tvmaze.com/shows');  // Corregí el endpoint
    const data = await res.json();
    return data;  // Ajustado para que devuelva la lista completa
}

async function General() {
    const infoPokes = await conexionLista();
    mostrarLista(infoPokes);
}
