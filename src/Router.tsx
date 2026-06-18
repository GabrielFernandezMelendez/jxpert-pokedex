import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PokedexPage } from "./pages/PokedexPage";
import { FavoritesPage } from "./pages/FavoritesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokedexPage />,
  },
  {
    path: "/favorites",
    element: <FavoritesPage />,
  },
  // Opcional: ruta 404 si quieres
  {
    path: "*",
    element: <div className="notfound">Page not found</div>,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
