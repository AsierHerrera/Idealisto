import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import InfoAnuncios from '../../components/InfoAnuncios';

const AnunciosUsuario = () => {
  const anunciosUsuario = useLoaderData(); // Obtener datos del loader
  console.log("Loa anuncios son EN COMPONENTE:",anunciosUsuario)
  const [favoritos, setFavoritos] = useState(() => {
    const favoritosGuardados = localStorage.getItem('favoritos');
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

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
        {anunciosUsuario.length > 0 ? (
          <InfoAnuncios
            anuncios={anunciosUsuario}
            setMostrarPaginacion={() => {}} // No es necesario paginación aquí
            favoritos={favoritos}
            toggleFavorito={toggleFavorito}
          />
        ) : (
          <p>Aún no hay anuncios publicados</p>
        )}
      </div>
    </div>
  );
};

export default AnunciosUsuario;
