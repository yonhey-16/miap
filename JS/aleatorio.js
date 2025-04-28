let misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

function mostrarAleatorio() {
    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpiar contenido

    let showsAleatorios = '<section class="c-aleatorio c-lista">';

    for (let i = 0; i < 4; i++) {
        let num = Math.floor(Math.random() * totalShows) + 1;

        if (!misNumeros.includes(num)) {
            misNumeros.push(num);
            localStorage.setItem("misNumeros", JSON.stringify(misNumeros));
        }

        showsAleatorios += `
        <div class="c-lista-show c-un_aleatorio">
            <p>#${num}</p>
            <img src="https://static.tvmaze.com/uploads/images/medium_portrait/${num}.jpg" width="80" height="110" loading="lazy" alt="Serie ${num}">
        </div>`;
    }

    showsAleatorios += "</section>";
    app.innerHTML = showsAleatorios;
}
