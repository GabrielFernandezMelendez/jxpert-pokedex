// Custom Hook — carga los pokémons favoritos y construye el Dream Team
// En la app: se usa en FavoritesPage para obtener los 6 pokémons del equipo
// Principio aplicado: Separation of Concerns — la página no hace fetch ni lógica de negocio

import { useEffect, useState } from "react";
import type { Pokemon } from "../pokemon/domain/Pokemon";
import { ApiPokemonRepository } from "../pokemon/infrastructure/ApiPokemonRepository";
import { BuildDreamTeam } from "../pokemon/application/BuildDreamTeam";

const repository = new ApiPokemonRepository();
const buildDreamTeam = new BuildDreamTeam();

// Extendemos el tipo Pokemon con un campo zIndex
type PokemonWithZIndex = Pokemon & { zIndex: number };

export const useDreamTeam = (favoriteIds: Set<number>) => {
  const [team, setTeam] = useState<PokemonWithZIndex[]>([]);
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

      if (dreamTeam.length === 0) {
        setTeam([]);
        setIsLoading(false);
        return;
      }

      // 1. Calcular media de altura para separar grandes y pequeños
      const totalHeight = dreamTeam.reduce((sum, p) => sum + p.height, 0);
      const meanHeight = totalHeight / dreamTeam.length;

      // 2. Separar grupos (manteniendo el orden de left-to-right)
      const bigGroup = dreamTeam.filter((p) => p.height >= meanHeight);
      const smallGroup = dreamTeam.filter((p) => p.height < meanHeight);

      // 3. Asignar zIndex según profundidad deseada
      const zIndexMap = new Map<number, number>();

      // Grupo grande: orden de profundidad deseado (índices en bigGroup)
      // Queremos: Lapras (pos 2) más profundo, Snorlax (pos 3), Dragonite (pos 1), Aerodactyl (pos 0)
      const bigDepthOrder = [2, 3, 1, 0];
      bigDepthOrder.forEach((posInBig, depthIndex) => {
        const pokemon = bigGroup[posInBig];
        if (pokemon) {
          // Base 10 para grandes, más profundo → menor zIndex
          const zIndex = 10 + depthIndex; // depthIndex 0 → 10, 3 → 13
          zIndexMap.set(pokemon.id, zIndex);
        }
      });

      // Grupo pequeño: Flareon (pos 1) más profundo, Pikachu (pos 0) más superficial
      const smallDepthOrder = [1, 0];
      smallDepthOrder.forEach((posInSmall, depthIndex) => {
        const pokemon = smallGroup[posInSmall];
        if (pokemon) {
          // Base 100 para pequeños, asegurando que siempre estén por encima de los grandes
          const zIndex = 100 + depthIndex;
          zIndexMap.set(pokemon.id, zIndex);
        }
      });

      // 4. Construir el array final con zIndex
      const teamWithZIndex = dreamTeam.map((pokemon) => ({
        ...pokemon,
        zIndex: zIndexMap.get(pokemon.id) ?? 0,
      }));

      setTeam(teamWithZIndex);
      setIsLoading(false);
    };

    loadTeam();
  }, [favoriteIds.size]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { team, isLoading };
};
