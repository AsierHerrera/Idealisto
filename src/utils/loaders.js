// loaders.js
import DataBase from '../../DataBase/DataBase.json';

export const loadAnuncios = async () => {
  console.log("load anuncios")
  return DataBase; // Asume que tus anuncios están en una clave llamada "anuncios"
};

export const loadAnuncioById = async ({ params }) => {
  const anuncio = DataBase.find(anuncio => anuncio.id === parseInt(params.id));
  console.log("EL anuncio es:", anuncio)
  if (!anuncio) {
    console.error("no hay anuncio")
    throw new Response('Not Found', { status: 404 });
  }
  return anuncio;
};

export const loadAnuncioByuserId = async ({ params }) => {
  console.log("User id de params", params.userId)
  const anuncios = DataBase.filter(anuncio => anuncio.User_id === parseInt(params.userId));
  console.log("Los anuncios son EN LOADER:", anuncios);
  if (anuncios.length === 0) {
    return [];
  }
  return anuncios;
};

export const loadFavoritos = async () => {
  const favoritos = localStorage.getItem('favoritos');
  
  if (!favoritos) {
    return [];
  }

  const favoritosIds = JSON.parse(favoritos);

  const favoritosAnuncios = DataBase.filter(anuncio => favoritosIds.includes(anuncio.id));


  return favoritosAnuncios;
};


