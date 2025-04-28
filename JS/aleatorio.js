let misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

const totalShows = 250; // Puedes ajustar según cuántos shows quieres permitir

// Función para mostrar 4 shows aleatorios
async function mostrarAleatorio() {
    const app = document.getElementById("app");

    let showsAleatorios = '<section class="c-aleatorio c-lista">';

    // Mostrar 4 shows aleatorios
    for (let i = 0; i < 4; i++) {
        let num = Math.floor(Math.random() * totalShows) + 1;

        // Asegurarse de que no se repita un show
        if (!misNumeros.includes(num)) {
            misNumeros.push(num);
            localStorage.setItem("misNumeros", JSON.stringify(misNumeros));
        } else {
            i--; // Si ya está en misNumeros, intenta con otro número
            continue;
        }

        try {
            // Hacer la solicitud para obtener los detalles del show
            const res = await fetch(`https://api.tvmaze.com/shows/${num}`);
            const show = await res.json();

            // Agregar el show a la lista
            showsAleatorios += `
            <div class="c-lista-serie c-un_aleatorio">
                <p>#${show.id}</p>
                <img src="${show.image?.medium || 'https://via.placeholder.com/150'}" width="100" height="140" alt="${show.name}">
                <h3>${show.name}</h3>
            </div>`;
        } catch (error) {
            console.error(`Error cargando show ${num}:`, error);
        }
    }

    showsAleatorios += "</section>";
    app.innerHTML = showsAleatorios;
}
