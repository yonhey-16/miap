const API_URL = "https://api.tvmaze.com/";
let seriesGlobal = [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// Mostrar Splash Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash').style.display = 'none';
    }, 1500);
});

// Obtener series
const obtenerSeries = async () => {
    try {
        const response = await fetch(`${API_URL}shows`);
        const data = await response.json();
        seriesGlobal = data;
        mostrarLista(seriesGlobal);
    } catch (error) {
        console.error("Error al cargar series:", error);
    }
};

// Mostrar lista de series
const mostrarLista = (series) => {
    const app = document.getElementById('app');
    app.innerHTML = '';

    series.forEach(serie => {
        const div = document.createElement('div');
        div.className = 'c-lista-serie';
        div.innerHTML = `
            <img src="${serie.image ? serie.image.medium : 'default.jpg'}" alt="${serie.name}">
            <h3>${serie.name}</h3>
            <button onclick="agregarFavorito(${serie.id})">Favorito</button>
        `;
        app.appendChild(div);
    });
};

// Agregar a favoritos
const agregarFavorito = (id) => {
    const serie = seriesGlobal.find(s => s.id === id);
    if (!favoritos.some(fav => fav.id === id)) {
        favoritos.push(serie);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        alert(`${serie.name} agregado a favoritos`);
    } else {
        alert(`${serie.name} ya está en favoritos`);
    }
};

// Mostrar favoritos
const mostrarFavoritos = () => {
    ocultarTodo();
    const fav = document.getElementById('favoritos');
    fav.classList.remove('hidden');
    fav.innerHTML = '';

    if (favoritos.length === 0) {
        fav.innerHTML = '<h3>No tienes favoritos aún.</h3>';
        return;
    }

    favoritos.forEach(f => {
        const div = document.createElement('div');
        div.className = 'c-unshow';
        div.innerHTML = `
            <img src="${f.image ? f.image.medium : 'default.jpg'}" alt="${f.name}">
            <h3>${f.name}</h3>
            <button onclick="eliminarFavorito(${f.id})">Eliminar</button>
        `;
        fav.appendChild(div);
    });
};

// Eliminar favorito
const eliminarFavorito = (id) => {
    favoritos = favoritos.filter(f => f.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    mostrarFavoritos();
};

// Filtro por categoría
const aplicarFiltro = (categoria) => {
    if (categoria === 'All') {
        mostrarLista(seriesGlobal);
    } else {
        const filtradas = seriesGlobal.filter(serie => serie.genres.includes(categoria));
        mostrarLista(filtradas);
    }
};

// Buscar series
const buscarSerie = (e) => {
    const texto = e.target.value.toLowerCase();
    const resultado = seriesGlobal.filter(serie => serie.name.toLowerCase().includes(texto));
    mostrarLista(resultado);
};

// Mostrar home
const mostrarHome = () => {
    ocultarTodo();
    document.getElementById('app').classList.remove('hidden');
    mostrarLista(seriesGlobal);
};

// Mostrar sección búsqueda
const mostrarBusqueda = () => {
    ocultarTodo();
    document.getElementById('app').classList.remove('hidden');
};

// Mostrar info
const mostrarInformacion = () => {
    ocultarTodo();
    document.getElementById('info').classList.remove('hidden');
};

// Ocultar todo
const ocultarTodo = () => {
    document.getElementById('app').classList.add('hidden');
    document.getElementById('favoritos').classList.add('hidden');
    document.getElementById('info').classList.add('hidden');
};

// Crear filtros dinámicamente
const crearFiltros = () => {
    const categorias = ["All", "Drama", "Comedy", "Action", "Romance", "Thriller"];
    const contenedor = document.getElementById('filtroCategorias');

    categorias.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.onclick = () => aplicarFiltro(cat);
        contenedor.appendChild(btn);
    });
};

// Inicializar todo
document.addEventListener('DOMContentLoaded', () => {
    obtenerSeries();
    crearFiltros();
    document.getElementById('inputBuscar').addEventListener('input', buscarSerie);
});
