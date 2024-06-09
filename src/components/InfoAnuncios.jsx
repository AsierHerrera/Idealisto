import React, { useState, useEffect } from 'react';
import PaginaAlojamiento from "../pages/anuncios/PaginaAlojamiento";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const InfoAnuncios = ({ anuncios, setMostrarPaginacion, favoritos, toggleFavorito }) => {
  const [alojamientoSeleccionado, setAlojamientoSeleccionado] = useState(null);
  const navigate = useNavigate();

  const cerrarPaginaAlojamiento = () => {
    setAlojamientoSeleccionado(null);
    setMostrarPaginacion(true); // Mostrar paginación
  };

  useEffect(() => {
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
            <Link to={`/anuncios/${anuncio.id}`}> 
              <button>Más información</button>
            </Link>
            <button onClick={() => toggleFavorito(anuncio.id)}>
              {favoritos.includes(anuncio.id) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
            </button>
          </article>
        ))
      ) : (
        <PaginaAlojamiento onClose={cerrarPaginaAlojamiento} />
      )}
    </>
  );
};

export default InfoAnuncios;
