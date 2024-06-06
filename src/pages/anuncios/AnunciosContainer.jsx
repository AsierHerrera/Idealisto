import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Paginacion from '../../components/Paginacion';
import InfoAnuncios from '../../components/InfoAnuncios';

function AnunciosContainer() {
  const anunciosPorPagina = 10;
  const [paginaActual, setPaginaActual] = useState(1);
  const data = useLoaderData();
  const [mostrarPaginacion, setMostrarPaginacion] = useState(true);

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
      <InfoAnuncios anuncios={anunciosPaginaActual} setMostrarPaginacion={setMostrarPaginacion} />
      {mostrarPaginacion && (
        <Paginacion paginaActual={paginaActual} numeroTotalPaginas={numeroTotalPaginas} irAPagina={irAPagina} />
      )}
    </>
  );
}

export default AnunciosContainer;
