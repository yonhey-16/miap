function mostrarMios(){
    const app = document.getElementById("app");

    app.innerHTML = ""
    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");
    seccion.classList.add("c-mios");

    let misPokes = "";

    for (let i = 1; i < totalPokes; i++) {
        if(misNumeros.includes(i)){
            misPokes += `
            <div class="c-unpoke c-mios-pokemon poke-${i}" onclick="mostrarDetalle('${i}')">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" width="auto" height="45" loading="lazy" alt="${i}">
                <p>${i}</p>
            </div>`;
        }else{
            misPokes += `
            <div class="c-unpoke">
                <p>${i}</p>
            </div>
            `
        }
        
    }
    seccion.innerHTML = misPokes;

    let contador = document.createElement("p");
    contador.textContent = `${misNumeros.length} / ${totalPokes}`;
    app.appendChild(contador);
    app.appendChild(seccion);
}