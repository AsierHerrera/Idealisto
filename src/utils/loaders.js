// loaders.js
import DataBase from '../../DataBase/DataBase.json';

export const loadAnuncios = async () => {
  return DataBase; // Asume que tus anuncios están en una clave llamada "anuncios"
};

export const loadAnuncioById = async ({ params }) => {
  const anuncio = DataBase.find(anuncio => anuncio.id === parseInt(params.id));
  if (!anuncio) {
    throw new Response('Not Found', { status: 404 });
  }
  return anuncio;
};
