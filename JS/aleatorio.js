let misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];
let totalShows = 0; // Lo actualizaremos después con la cantidad de shows disponibles.

async function obtenerShows() {
    const res = await fetch('https://api.tvmaze.com/shows');
    const data = await res.json();
    totalShows = data.length; // Guardamos el total de shows disponibles
}

async function mostrarAleatorio() {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpiar el contenido actual

    let showsAleatorios = '<section class="c-aleatorio c-lista">';

    for (let i = 0; i < 4; i++) {
        let num = Math.floor(Math.random() * totalShows) + 1;

        if (!misNumeros.includes(num)) {
            misNumeros.push(num);
            localStorage.setItem("misNumeros", JSON.stringify(misNumeros));
        }

        const res = await fetch(`https://api.tvmaze.com/shows/${num}`);
        const show = await res.json();

        showsAleatorios += `
        <div class="c-lista-serie c-un_aleatorio">
            <p>#${show.id}</p>
            <img src="${show.image?.medium || 'https://via.placeholder.com/150'}" width="100" height="140" alt="${show.name}">
            <h3>${show.name}</h3>
        </div>`;
    }

    showsAleatorios += "</section>";
    app.innerHTML = showsAleatorios;
}

document.addEventListener("DOMContentLoaded", obtenerShows);
