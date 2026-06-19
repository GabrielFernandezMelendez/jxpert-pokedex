// Custom Hook — carga los pokémons favoritos y construye el Dream Team
// Principio aplicado: Separation of Concerns — solo carga datos y aplica el caso de uso
// No contiene lógica de presentación — z-index y tamaños se calculan en la página

import { useEffect, useState } from "react";
import type { Pokemon } from "../pokemon/domain/Pokemon";
import { ApiPokemonRepository } from "../pokemon/infrastructure/ApiPokemonRepository";
import { BuildDreamTeam } from "../pokemon/application/BuildDreamTeam";

const repository = new ApiPokemonRepository();
const buildDreamTeam = new BuildDreamTeam();

export const useDreamTeam = (favoriteIds: Set<number>) => {
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const loadTeam = async () => {
      setIsLoading(true);
      const ids = Array.from(favoriteIds);

      if (ids.length === 0) {
        setTeam([]);
        setIsLoading(false);
        return;
      }

      const pokemons = await Promise.all(ids.map((id) => repository.getById(id)));
      const dreamTeam = buildDreamTeam.execute(pokemons);
      setTeam(dreamTeam);
      setIsLoading(false);
    };
    loadTeam();
  }, [favoriteIds.size]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { team, isLoading };
};
