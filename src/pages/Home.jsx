import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import InfoAnuncios from '../components/InfoAnuncios';

const FavoritosComponent = () => {
  const data = useLoaderData(); // Obtener datos de favoritos del loader
  const [favoritos, setFavoritos] = useState(() => {
    const favoritosGuardados = localStorage.getItem('favoritos');
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
  });
  const [anunciosFavoritos, setAnunciosFavoritos] = useState(data);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    const nuevosAnunciosFavoritos = data.filter(anuncio => favoritos.includes(anuncio.id));
    setAnunciosFavoritos(nuevosAnunciosFavoritos);
  }, [favoritos, data]);

  const toggleFavorito = (anuncioId) => {
    setFavoritos(prevFavoritos => {
      if (prevFavoritos.includes(anuncioId)) {
        return prevFavoritos.filter(id => id !== anuncioId);
      } else {
        return [...prevFavoritos, anuncioId];
      }
    });
  };

  return (
    <div>
      <div>
        <h2>Welcome to Idealisto</h2>
      </div>
      <div>
        {anunciosFavoritos.length > 0 ? (
          <InfoAnuncios
            anuncios={anunciosFavoritos}
            setMostrarPaginacion={() => {}} // No es necesario paginación aquí
            favoritos={favoritos}
            toggleFavorito={toggleFavorito}
          />
        ) : (
          <p>No hay anuncios favoritos</p>
        )}
      </div>
    </div>
  );
};

export default FavoritosComponent;
