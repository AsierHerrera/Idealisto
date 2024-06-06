import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Paginacion from '../../components/Paginacion';
import InfoAnuncios from '../../components/InfoAnuncios';

function AnunciosContainer() {
  const anunciosPorPagina = 10;
  const [paginaActual, setPaginaActual] = useState(1);
  const data = useLoaderData();
  const [mostrarPaginacion, setMostrarPaginacion] = useState(true);
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

  // Cargar datos para la página actual
  const indiceInicial = (paginaActual - 1) * anunciosPorPagina;
  const indiceFinal = paginaActual * anunciosPorPagina;
  const anunciosPaginaActual = data.slice(indiceInicial, indiceFinal);

  const irAPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const numeroTotalPaginas = Math.ceil(data.length / anunciosPorPagina);

  return (
    <>
      <InfoAnuncios
        anuncios={anunciosPaginaActual}
        setMostrarPaginacion={setMostrarPaginacion}
        favoritos={favoritos}
        toggleFavorito={toggleFavorito}
      />
      {mostrarPaginacion && (
        <Paginacion paginaActual={paginaActual} numeroTotalPaginas={numeroTotalPaginas} irAPagina={irAPagina} />
      )}
    </>
  );
}

export default AnunciosContainer;
