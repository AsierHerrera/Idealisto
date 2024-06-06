import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AnunciosContainer from "./pages/anuncios/AnunciosContainer";
import InfoAnuncios from "./components/InfoAnuncios.jsx";
import FormularioAnfitriones from "./pages/FormularioAnfitriones";
import { loadAnuncios, loadAnuncioById, loadFavoritos } from './utils/loaders.js';
import PaginaAlojamiento from "./pages/anuncios/PaginaAlojamiento.jsx";

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
