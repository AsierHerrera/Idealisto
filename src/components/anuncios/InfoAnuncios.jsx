import React, { useState, useEffect } from 'react';
import PaginaAlojamiento from "../PaginaAlojamiento/PaginaAlojamiento";

const InfoAnuncios = ({ anuncios, togglePaginacion }) => {
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState(null);

  const abrirPaginaAlojamiento = (anuncio) => {
    console.log("Anuncio seleccionado:", anuncio);
    setAlojamientoSeleccionado(anuncio);
    togglePaginacion(false); // Ocultar la paginación al abrir la página del alojamiento
  };

  const cerrarPaginaAlojamiento = () => {
    setAlojamientoSeleccionado(null);
    togglePaginacion(true); // Mostrar la paginación al cerrar la página del alojamiento
  };

  useEffect(() => {
    console.log("Estado después de setAlojamientoSeleccionado:", alojamientoSeleccionado);
  }, [alojamientoSeleccionado]);

  return (
    <>
      {alojamientoSeleccionado === null ? (
        anuncios.map((anuncio, index) => (
          <article className="anuncio" key={index}>
            <h3>{anuncio.title}</h3>
            <p>Precio: {anuncio.price}</p>
            <p>Superficie: {anuncio.surface}</p>
            <p>Dormitorios: {anuncio.bedrooms}</p>
            <p>Cuartos de baño: {anuncio.restrooms}</p>
            <p>Resumen: {anuncio.features}</p>
            <p>Descripcion: {anuncio.description}</p>
            <p>Provincia: {anuncio.location_name}</p>
            <button onClick={() => abrirPaginaAlojamiento(anuncio)}>Más información</button>
          </article>
        ))
      ) : (
        <PaginaAlojamiento anuncio={alojamientoSeleccionado} onClose={cerrarPaginaAlojamiento} />
      )}
    </>
  );
};

export default InfoAnuncios;
