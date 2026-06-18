// Custom Hook — estado y lógica de favoritos
// Principio aplicado: Separation of Concerns — la UI nunca toca localStorage ni conoce su existencia
// Principio aplicado: Dependency Inversion — depende del puerto FavoriteRepository, no de la implementación concreta
// Arquitectura Hexagonal — capa de aplicación que conecta el dominio con la infraestructura

import { useState, useEffect, useCallback } from "react";
import type { FavoriteRepository } from "../pokemon/domain/FavoriteRepository";

export const useFavorites = (repository: FavoriteRepository) => {
  // Estado interno como array para garantizar la reactividad de React
  const [favoriteIdsArray, setFavoriteIdsArray] = useState<number[]>([]);

  // Carga inicial desde el almacenamiento
  useEffect(() => {
    repository.getAll().then((set) => {
      setFavoriteIdsArray(Array.from(set));
    });
  }, [repository]);

  // Derivamos un Set para las comprobaciones (has) en tiempo constante
  const favoriteIds = new Set(favoriteIdsArray);

  // Alterna el estado de favorito de forma optimista
  const toggleFavorite = useCallback(
    async (id: number) => {
      setFavoriteIdsArray((prev) => {
        const set = new Set(prev);
        if (set.has(id)) {
          set.delete(id);
        } else {
          set.add(id);
        }
        return Array.from(set);
      });
      await repository.toggle(id);
    },
    [repository],
  );

  return { favoriteIds, toggleFavorite };
};
