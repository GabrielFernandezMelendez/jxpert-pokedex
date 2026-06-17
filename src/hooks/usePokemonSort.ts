// Custom Hook — gestiona la ordenación de pokémons por estadística
// En la app: se ejecuta cuando el usuario selecciona una opción del menú de sort
// Principio aplicado: Single Responsibility — solo se encarga de ordenar
// Patrón Strategy — delega al caso de uso SortPokemons que ordena por cualquier stat

import { useEffect, useState } from "react";
import type { Pokemon } from "../pokemon/domain/Pokemon";
import type { SortOption } from "../pokemon/domain/SortOption";
import { SortPokemons } from "../pokemon/application/SortPokemons";

const sortPokemons = new SortPokemons();

export const usePokemonSort = (
  filteredPokemons: Pokemon[],
  setFilteredPokemons: (pokemons: Pokemon[]) => void,
) => {
  // Opción de ordenación seleccionada por el usuario
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Cada vez que cambia sortBy o llegan pokémons nuevos, reordena la lista
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const sorted = sortPokemons.execute(filteredPokemons, sortBy);
    setFilteredPokemons(sorted);
  }, [filteredPokemons[0]?.id, sortBy]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { sortBy, setSortBy };
};
