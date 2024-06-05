import {createBrowserRouter,redirect} from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import DataBase from "../DataBase/DataBase.json"
import AnunciosContainer from "./pages/anuncios/AnunciosContainer";
import InfoAnuncios from "./pages/anuncios/InfoAnuncios";
import FormularioAnfitriones from "./pages/FormularioAnfitriones"
import { loadAnuncios, loadAnuncioById } from './utils/loaders.js';



const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
            path: "/",
            element: <h2>Welcome to Idealisto</h2>
        },
        {
            path: "/anuncios",
            element: <AnunciosContainer />,
            loader: loadAnuncios
        },
        {
            path: "/anuncios/:id",
            element: <InfoAnuncios />,
            loader: loadAnuncioById
        },
        {
          path: "/registro",
          element: <FormularioAnfitriones />,

      },
      ]
    },
    {
        path: "/Login",
        element: <Login />
    }
    
  ]);

export default router;