// App.tsx — punto de entrada de la aplicación
// Solo gestiona las rutas — no tiene lógica de negocio ni UI propia
// Principio aplicado: Single Responsibility — solo decide qué página mostrar

import { Routes, Route } from "react-router-dom";
import { PokedexPage } from "./pages/PokedexPage";
import { FavoritesPage } from "./pages/FavoritesPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PokedexPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
};
