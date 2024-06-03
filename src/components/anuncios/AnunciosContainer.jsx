import React, { useState } from 'react';
import DataBase from "../../../DataBase/DataBase.json";
import Paginacion from './Paginacion';
import InfoAnuncios from './InfoAnuncios';

function AnunciosContainer() {
  const anunciosPorPagina = 10;
  const [paginaActual, setPaginaActual] = useState(1);

  const indiceInicial = (paginaActual - 1) * anunciosPorPagina;
  const indiceFinal = paginaActual * anunciosPorPagina;

  const anunciosPaginaActual = DataBase.slice(indiceInicial, indiceFinal);

  const irAPagina = (pagina) => {
    if (pagina >= 1 && pagina <= numeroTotalPaginas) {
      setPaginaActual(pagina);
    }
  };

  const numeroTotalPaginas = Math.ceil(DataBase.length / anunciosPorPagina);

  return (
    <>
      <InfoAnuncios anuncios={anunciosPaginaActual} />
      <Paginacion paginaActual={paginaActual} numeroTotalPaginas={numeroTotalPaginas} irAPagina={irAPagina} />
    </>
  );
}

export default AnunciosContainer;
