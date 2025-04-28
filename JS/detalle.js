let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const toggleFavorito = (id, nombre, imagen) => {
    id = Number(id);
    const esFavorito = favoritos.some(item => Number(item.id) === id);

    if (esFavorito) {
        favoritos = favoritos.filter(p => Number(p.id) !== id);
        document.getElementById(`corazon-${id}`).textContent = '🤍';
    } else {
        favoritos.push({ 
            id, 
            nombre, 
            image: imagen
        });
        document.getElementById(`corazon-${id}`).textContent = '❤️';
    }

    // Guardar en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
};

const actualizarIconoFavorito = (id) => {
    id = Number(id);
    const corazonIcono = document.getElementById(`corazon-${id}`);
    if (!corazonIcono) return;

    if (favoritos.some(item => Number(item.id) === id)) {
        corazonIcono.textContent = '❤️';
    } else {
        corazonIcono.textContent = '🤍';
    }
};

async function mostrarDetalle(id) {
    id = Number(id);
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id);
    const data = await res.json();

    let tipos = data.types.map(tipo => `<span>${tipo.type.name}</span>`).join(', ');
    const imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    const esFavorito = favoritos.some(item => Number(item.id) === id);

    const app = document.getElementById("app");
    app.innerHTML = `
        <section class="c-detalle">
            <img src="${imagen}" alt="${data.name}" height="160">
            <h2>${data.name}</h2>
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Tipos:</strong> ${tipos}</p>
            <p><strong>Altura:</strong> ${(data.height / 10).toFixed(1)} m</p>
            <p><strong>Peso:</strong> ${(data.weight / 10).toFixed(1)} kg</p>
            <p><strong>HP:</strong> ${data.stats[0].base_stat}</p>
            <p><strong>Velocidad:</strong> ${data.stats[5].base_stat}</p>
            <p><strong>Ataque:</strong> ${data.stats[1].base_stat} - <strong>Defensa:</strong> ${data.stats[2].base_stat}</p>
            <p><strong>Ataque Especial:</strong> ${data.stats[3].base_stat} - <strong>Defensa Especial:</strong> ${data.stats[4].base_stat}</p>
            <button id="favorito-btn-${id}" onclick="toggleFavorito(${id}, '${data.name}', '${imagen}')">
                <span id="corazon-${id}" class="corazon">${esFavorito ? '❤️' : '🤍'}</span> Favorito
            </button>
        </section>
    `;

    actualizarIconoFavorito(id);
}
