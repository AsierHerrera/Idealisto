import React, { useState, useEffect, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import InfoAnuncios from '../../components/InfoAnuncios';
import styles from "./Home.module.css"
import UserContext from "../../context/userContext";
const FavoritosComponent = () => {
  const { user, setUser } = useContext(UserContext);
    const data = useLoaderData(); // Obtener datos de favoritos del loader
  const [favoritos, setFavoritos] = useState(() => {
    const favoritosGuardados = localStorage.getItem('favoritos');
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
  });
  const [anunciosFavoritos, setAnunciosFavoritos] = useState(data);

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    const nuevosAnunciosFavoritos = data.filter(anuncio => favoritos.includes(anuncio.id));
    setAnunciosFavoritos(nuevosAnunciosFavoritos);
  }, [favoritos, data]);

  const toggleFavorito = (anuncioId) => {
    setFavoritos(prevFavoritos => {
      if (prevFavoritos.includes(anuncioId)) {
        return prevFavoritos.filter(id => id !== anuncioId);
      } else {
        return [...prevFavoritos, anuncioId];
      }
    });
  };

  return (
<div>
  <h1 className={styles.titulo}>Hola {user?.Name}</h1>

  <div>
    <h2>Welcome to Idealisto</h2>
  </div>
  <div>
    <p>
      ¡Hola y bienvenido a Idealisto! Aquí podrás gestionar tus anuncios de propiedades de forma sencilla y eficiente. En nuestra plataforma, ofrecemos varias funcionalidades clave para mejorar tu experiencia:
    </p>
    <ul>
      <li>
        <strong>Favoritos:</strong> En esta página de inicio, encontrarás todos los anuncios que hayas añadido a tus favoritos. Así, podrás acceder rápidamente a las propiedades que más te interesan.
      </li>
      <li>
        <strong>Buscar Pisos:</strong> En la sección de "Buscar pisos", podrás explorar una amplia variedad de anuncios publicados por otros usuarios. Utiliza los filtros y herramientas de búsqueda para encontrar la propiedad que mejor se adapte a tus necesidades.
      </li>
      <li>
        <strong>Registrar tu Piso:</strong> ¿Tienes una propiedad que deseas alquilar o vender? Dirígete a la página de "Registra tu piso" y completa el formulario. Podrás añadir todos los detalles necesarios para que tu anuncio destaque.
      </li>
      <li>
        <strong>Tus Publicaciones:</strong> En "Consulta tus publicaciones", podrás ver todos los anuncios que has publicado. Gestiona y edita tus propiedades para mantener la información actualizada y atractiva para posibles interesados.
      </li>
    </ul>
    <p>
      Esperamos que disfrutes de la experiencia y encuentres exactamente lo que buscas. ¡Gracias por elegir Idealisto!
    </p>
  </div>
  <div>
    {anunciosFavoritos.length > 0 ? (
      <InfoAnuncios
        anuncios={anunciosFavoritos}
        setMostrarPaginacion={() => {}} // No es necesario paginación aquí
        favoritos={favoritos}
        toggleFavorito={toggleFavorito}
      />
    ) : (
      <p>No hay anuncios favoritos</p>
    )}
  </div>
</div>

  );
};

export default FavoritosComponent;
