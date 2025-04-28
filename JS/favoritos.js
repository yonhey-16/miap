// Función para eliminar un favorito
const eliminarFavorito = (id) => {
    favoritos = favoritos.filter(fav => fav.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    mostrarFavoritos(); // Actualizamos la visualización
};
