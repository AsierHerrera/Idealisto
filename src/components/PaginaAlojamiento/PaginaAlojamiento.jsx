import React from 'react';

const PaginaAlojamiento = ({ anuncio, onClose }) => {
  console.log("ANUNCIO EN PAGINA ALOJAMIUENTOS", anuncio.price)
  if (!anuncio) {
    return null; // Maneja el caso en que anuncio es undefined o null
  }

  return (
    <div className="pagina-alojamiento">
      <article className="anuncio">
        <h3>{anuncio.title}</h3>
        <p>Precio: {anuncio.price}</p>
        <p>Superficie: {anuncio.surface}</p>
        <p>Dormitorios: {anuncio.bedrooms}</p>
        <p>Cuartos de baño: {anuncio.restrooms}</p>
        <p>Resumen: {anuncio.features}</p>
        <p>Descripcion: {anuncio.description}</p>
        <p>Provincia: {anuncio.location_name}</p>
      </article>
      <button onClick={onClose}>Volver</button>

    </div>
  );
};

export default PaginaAlojamiento;
