import React, { useState, useEffect } from 'react';
import DataBase from "../../DataBase/DataBase.json";
import Paginacion from './Paginacion';
import InfoAnuncios from './InfoAnuncios';

function AnunciosContainer() {
  const anunciosPorPagina = 10;
  const [paginaActual, setPaginaActual] = useState(1);
  const [anuncios, setAnuncios] = useState([]);
  const [mostrarPaginacion, setMostrarPaginacion] = useState(true);

  useEffect(() => {
    const cargarDatos = () => {
      const indiceInicial = (paginaActual - 1) * anunciosPorPagina;
      const indiceFinal = paginaActual * anunciosPorPagina;
      const anunciosPaginaActual = DataBase.slice(indiceInicial, indiceFinal);
      setAnuncios(anunciosPaginaActual);
    };

    cargarDatos();
  }, [paginaActual]);

  const irAPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  const numeroTotalPaginas = Math.ceil(DataBase.length / anunciosPorPagina);

  return (
    <>
      <InfoAnuncios anuncios={anuncios} setMostrarPaginacion={setMostrarPaginacion} />
      {mostrarPaginacion && (
        <Paginacion paginaActual={paginaActual} numeroTotalPaginas={numeroTotalPaginas} irAPagina={irAPagina} />
      )}
    </>
  );
}

export default AnunciosContainer;
