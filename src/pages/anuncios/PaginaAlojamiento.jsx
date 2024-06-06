import React from 'react';
import Mapa from '../../components/Mapa'; // Asegúrate de ajustar la ruta si es necesario
import {Link, useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PaginaAlojamiento = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const cerrarPagina = () => {
    navigate(`/anuncios`)
  };

  console.log("la data es: ", data)
  if (!data) {
    return null; // Maneja el caso en que anuncio es undefined o null
  }

  return (
    <div className="pagina-alojamiento">
      <article className="anuncio">
        <h3>{data.title}</h3>
        <p>Precio: {data.price}€</p>
        <p>Superficie: {data.surface} m²</p>
        <p>Dormitorios: {data.bedrooms}</p>
        <p>Cuartos de baño: {data.restrooms}</p>
        <p>Resumen: {data.features}</p>
        <p>Descripcion: {data.description}</p>
        <p>Provincia: {data.location_name}</p>
        <div>Miralo en el mapa: <Mapa latitud={data.coordinates.latitude} longitud={data.coordinates.longitude} /></div>

      </article>
      <button onClick={cerrarPagina} >Volver</button>

    </div>
  );
};

export default PaginaAlojamiento;
