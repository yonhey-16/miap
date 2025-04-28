async function mostrarMios() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");
    seccion.classList.add("c-mios");

    let misShows = ""; // Aquí se irá armando el HTML

    for (let i = 1; i < totalShows; i++) {
        if (misIds.includes(i)) {
            // Si tengo ese show, hago fetch de los datos
            const response = await fetch(`https://api.tvmaze.com/shows/${i}`);
            if (response.ok) {
                const show = await response.json();
                misShows += `
                <div class="c-unshow c-mios-show show-${i}" onclick="mostrarDetalle('${i}')">
                    <img src="${show.image?.medium || ''}" width="auto" height="70" loading="lazy" alt="${show.name}">
                    <p>${show.name}</p>
                </div>`;
            } else {
                misShows += `
                <div class="c-unshow">
                    <p>Show ${i}</p>
                </div>`;
            }
        } else {
            // Si no lo tengo, solo muestro el número
            misShows += `
            <div class="c-unshow">
                <p>${i}</p>
            </div>`;
        }
    }

    seccion.innerHTML = misShows;

    const contador = document.createElement("p");
    contador.textContent = `${misIds.length} / ${totalShows}`;
    app.appendChild(contador);
    app.appendChild(seccion);
}
