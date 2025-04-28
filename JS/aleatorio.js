let misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

async function mostrarAleatorio() {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpiar contenido

    let showsAleatorios = '<section class="c-aleatorio c-lista">';

    for (let i = 0; i < 4; i++) {
        let num = Math.floor(Math.random() * totalShows) + 1;

        if (!misNumeros.includes(num)) {
            misNumeros.push(num);
            localStorage.setItem("misNumeros", JSON.stringify(misNumeros));
        }

        try {
            const res = await fetch(`https://api.tvmaze.com/shows/${num}`);
            if (!res.ok) {
                throw new Error('No se encontró el show');
            }
            const show = await res.json();

            const imagen = show.image?.medium || 'https://via.placeholder.com/150';
            const nombre = show.name || 'Sin nombre';

            showsAleatorios += `
            <div class="c-lista-show c-un_aleatorio">
                <p>#${num}</p>
                <img src="${imagen}" width="80" height="110" loading="lazy" alt="${nombre}">
                <h3>${nombre}</h3>
            </div>`;

        } catch (error) {
            console.log(`Error cargando show ${num}:`, error);
            showsAleatorios += `
            <div class="c-lista-show c-un_aleatorio">
                <p>#${num}</p>
                <img src="https://via.placeholder.com/80x110" width="80" height="110" loading="lazy" alt="No disponible">
                <h3>No disponible</h3>
            </div>`;
        }
    }

    showsAleatorios += "</section>";
    app.innerHTML = showsAleatorios;
}
