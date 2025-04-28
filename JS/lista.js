const categorias = [
    "All", "Drama", "Comedy", "Action", "Romance", "Thriller", "Sci-Fi",
    "Fantasy", "Documentary", "Mystery", "Horror", "Reality", "Family", "News"
];

const peliculas = [
    { id: 1, nombre: "The Dark Knight", categoria: "Action", imagen: "url_de_imagen" },
    { id: 2, nombre: "Inception", categoria: "Sci-Fi", imagen: "url_de_imagen" },
    { id: 3, nombre: "The Conjuring", categoria: "Horror", imagen: "url_de_imagen" },
    { id: 4, nombre: "Titanic", categoria: "Romance", imagen: "url_de_imagen" },
    { id: 5, nombre: "Breaking Bad", categoria: "Drama", imagen: "url_de_imagen" },
    { id: 6, nombre: "Friends", categoria: "Comedy", imagen: "url_de_imagen" },
    { id: 7, nombre: "The Witcher", categoria: "Fantasy", imagen: "url_de_imagen" },
    { id: 8, nombre: "Sherlock", categoria: "Mystery", imagen: "url_de_imagen" }
];

let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

const mostrarFavoritos = () => {
    const contenedorFavoritos = document.getElementById('favoritos');
    contenedorFavoritos.innerHTML = ''; // Limpiar favoritos

    favoritos.forEach(fav => {
        const favoritoDiv = document.createElement('div');
        favoritoDiv.classList.add('c-favorito-show');
        favoritoDiv.innerHTML = `
            <img src="${fav.imagen}" alt="${fav.nombre}">
            <h3>${fav.nombre}</h3>
        `;
        contenedorFavoritos.appendChild(favoritoDiv);
    });
};

const mostrarLista = (pokemones) => {
    const lista = document.getElementById('app');
    lista.innerHTML = '';

    pokemones.forEach(pokemon => {
        const item = document.createElement('div');
        item.classList.add('c-lista-serie');
        item.innerHTML = `
            <img src="${pokemon.imagen}" alt="${pokemon.nombre}">
            <h3>${pokemon.nombre}</h3>
            <button class="agregar-favorito" data-id="${pokemon.id}">Agregar a Favoritos</button>
        `;
        lista.appendChild(item);

        // Evento para agregar a favoritos
        item.querySelector('.agregar-favorito').addEventListener('click', () => {
            agregarFavorito(pokemon);
        });
    });
};

const agregarFavorito = (pokemon) => {
    if (!favoritos.some(fav => fav.id === pokemon.id)) {
        favoritos.push(pokemon);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        mostrarFavoritos(); // Actualizar la vista de favoritos
    }
};

const aplicarFiltro = (categoria) => {
    let peliculasFiltradas;
    
    if (categoria === "All") {
        peliculasFiltradas = peliculas;
    } else {
        peliculasFiltradas = peliculas.filter(pelicula => pelicula.categoria === categoria);
    }

    mostrarLista(peliculasFiltradas);

    // Marcar el botón de la categoría activa
    document.querySelectorAll('.filtro button').forEach(button => {
        if (button.textContent === categoria) {
            button.classList.add('activo');
        } else {
            button.classList.remove('activo');
        }
    });
};

const buscarPelicula = (e) => {
    const query = e.target.value.toLowerCase();
    const peliculasFiltradas = peliculas.filter(pelicula =>
        pelicula.nombre.toLowerCase().includes(query)
    );
    mostrarLista(peliculasFiltradas);
};

// Inicializar la vista con todas las películas
document.addEventListener("DOMContentLoaded", () => {
    // Mostrar categorías
    const contenedorCategorias = document.querySelector('.filtro');
    categorias.forEach(categoria => {
        const botonCategoria = document.createElement('button');
        botonCategoria.textContent = categoria;
        botonCategoria.addEventListener('click', () => aplicarFiltro(categoria));
        contenedorCategorias.appendChild(botonCategoria);
    });

    // Agregar evento de búsqueda
    const buscador = document.querySelector('.c-buscador');
    buscador.addEventListener('input', buscarPelicula);

    // Mostrar todas las películas al inicio
    aplicarFiltro("All");
    mostrarFavoritos();
});
