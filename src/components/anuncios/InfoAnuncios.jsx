import React, { useState, useEffect } from 'react';
import PaginaAlojamiento from "../PaginaAlojamiento/PaginaAlojamiento";

const InfoAnuncios = ({ anuncios, setMostrarPaginacion }) => {
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState(null);

  const abrirPaginaAlojamiento = (anuncio) => {
    console.log("Anuncio seleccionado:", anuncio);
    setAlojamientoSeleccionado(anuncio);
    setMostrarPaginacion(false); // Ocultar paginación
  };

  const cerrarPaginaAlojamiento = () => {
    setAlojamientoSeleccionado(null);
    setMostrarPaginacion(true); // Mostrar paginación
  };

  useEffect(() => {
    console.log("Estado después de setAlojamientoSeleccionado:", alojamientoSeleccionado);
  }, [alojamientoSeleccionado]);

  const truncarDescripcion = (descripcion, limite) => {
    if (descripcion && descripcion.length > limite) {
      return descripcion.substring(0, limite) + '...';
    }
    return descripcion || '';
  };

  return (
    <>
      {alojamientoSeleccionado === null ? (
        anuncios.map((anuncio, index) => (
          <article className="anuncio" key={index}>
            <h3>{anuncio.title}</h3>
            <p>Precio: {anuncio.price}€</p>
            <p>Superficie: {anuncio.surface} m²</p>
            <p>Dormitorios: {anuncio.bedrooms}</p>
            <p>Descripcion: {truncarDescripcion(anuncio.description, 100)}</p>
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
