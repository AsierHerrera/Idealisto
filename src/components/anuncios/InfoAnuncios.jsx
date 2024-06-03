import React from 'react';

const InfoAnuncios = ({ anuncios }) => {
  return (
    <>
      {anuncios.map((anuncio, index) => (
        <article className="task" key={index}>
          <h3>{anuncio.title}</h3>
          <p>Precio: {anuncio.price}</p>
          <p>Superficie: {anuncio.surface}</p>
          <p>Dormitorios: {anuncio.bedrooms}</p>
          <p>Cuartos de baño: {anuncio.restrooms}</p>
          <p>Resumen: {anuncio.features}</p>
          <p>Descripcion: {anuncio.description}</p>
          <p>Provincia: {anuncio.location_name}</p>
        </article>
      ))}
    </>
  );
}

export default InfoAnuncios;
