import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root/Root.jsx";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import AnunciosContainer from "./pages/anuncios/AnunciosContainer";
import TarjetasAnuncios from "./components/InfoAnuncios.jsx";
import FormularioAnfitriones from "./pages/form/FormularioAnfitriones.jsx";
import { loadAnuncios, loadAnuncioById, loadFavoritos, loadAnuncioByuserId } from './utils/loaders.js';
import PaginaAlojamiento from "./pages/anuncios/PaginaAlojamiento.jsx";
import AnunciosUsuario from "./pages/anuncios/AnunciosUsuario.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />, // Usar FavoritosComponent en la ruta del Home
        loader: loadFavoritos,
      },
      {
        path: "/anuncios",
        element: <AnunciosContainer />,            
        loader: loadAnuncios,
      },
      {
        path: "/anuncios/:id",
        element: <PaginaAlojamiento />,
        loader: loadAnuncioById,
      },
      {
        path: "/anuncios/publicaciones/:userId",
        element: <AnunciosUsuario />,
        loader: loadAnuncioByuserId,

      },
      {
        path: "/registro",
        element: <FormularioAnfitriones />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default router;
