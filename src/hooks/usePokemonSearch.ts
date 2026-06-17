// Custom Hook — gestiona el filtrado de pokémons por nombre o tipo
// En la app: se ejecuta cada vez que el usuario escribe en el buscador
// Principio aplicado: Single Responsibility — solo se encarga de filtrar
// Principio aplicado: Separation of Concerns — la lógica de filtrado sale del componente

import { useEffect, useState } from "react";
import type { Pokemon } from "../pokemon/domain/Pokemon";
import { FilterPokemons } from "../pokemon/application/FilterPokemons";

const filterPokemons = new FilterPokemons();

export const usePokemonSearch = (pokemons: Pokemon[]) => {
  // Texto que el usuario escribe en el buscador
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Pokémons después de aplicar el filtro
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  // Estado de filtrado — true mientras se procesa
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  // Cuando llegan pokémons nuevos (cambio de región) actualiza la lista filtrada

  //el comentario de ESlint es para que no de error l carga de la posicion del array
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setIsFiltering(true);
    const results = filterPokemons.execute(pokemons, searchQuery);
    setFilteredPokemons(results);
    setIsFiltering(false);
  }, [pokemons[0]?.id, searchQuery]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { searchQuery, setSearchQuery, filteredPokemons, setFilteredPokemons, isFiltering };
};
