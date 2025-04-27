function mostrarMios() {
    const app = document.getElementById("app");

    app.innerHTML = "";
    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");
    seccion.classList.add("c-mios");

    let misSeries = "";

    // Itera sobre los favoritos
    for (let i = 0; i < favoritos.length; i++) {
        const serie = favoritos[i];

        // Aquí estamos mostrando las series favoritas, con imagen y nombre
        misSeries += `
            <div class="c-unpoke c-mios-pokemon serie-${serie.id}" onclick="mostrarDetalle('${serie.id}')">
                <img src="${serie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'}" width="auto" height="45" loading="lazy" alt="${serie.name}">
                <p>${serie.name}</p>
            </div>
        `;
    }

    // Si no hay series favoritas, mostramos un mensaje
    if (misSeries === "") {
        misSeries = `
            <div class="c-unpoke">
                <p>No tienes series favoritas aún.</p>
            </div>
        `;
    }

    seccion.innerHTML = misSeries;

    // Contador de series favoritas
    let contador = document.createElement("p");
    contador.textContent = `${favoritos.length} / ${totalSeries}`; // totalSeries debería ser la cantidad total de series disponibles.
    app.appendChild(contador);
    app.appendChild(seccion);
}
