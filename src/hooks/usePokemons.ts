// Custom Hook — gestiona la carga de pokémons por región
// En la app: se ejecuta cada vez que el usuario cambia de región en el dropdown
// Principio aplicado: Single Responsibility — solo se encarga de obtener pokémons
// Principio aplicado: Separation of Concerns — la lógica de fetch sale del componente

import { useEffect, useState } from "react";
import type { Pokemon } from "../pokemon/domain/Pokemon";
import type { Region } from "../pokemon/domain/Region";
import { ApiPokemonRepository } from "../pokemon/infrastructure/ApiPokemonRepository";
import { GetPokemons } from "../pokemon/application/GetPokemons";

// Instancias fuera del hook para no recrearlas en cada render
const repository = new ApiPokemonRepository();
const getPokemons = new GetPokemons(repository);

export const usePokemons = (region: Region) => {
  // Estado de los pokémons cargados desde la API
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  // Estado de carga — true mientras se esperan los datos
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Se ejecuta cada vez que region cambia
  useEffect(() => {
    const loadPokemons = async () => {
      setIsLoading(true);
      const result = await getPokemons.execute(region);
      setPokemons(result);
      setIsLoading(false);
    };
    loadPokemons();
  }, [region]);

  // Devuelve los datos que el componente necesita consumir
  return { pokemons, isLoading };
};
