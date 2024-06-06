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
