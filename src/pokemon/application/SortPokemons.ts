// Use Case — ordena pokémons por una estadística concreta del array de sortoption
// Principio aplicado: Single Responsibility — solo se encarga de ordenar
// Patrón aplicado: Strategy — una sola función que ordena por cualquier stat sin necesidad de un if por cada una
// Esto reemplaza los 7 bloques if/else que había en App.tsx por una única lógica genérica (gracias a los design patterns)

import type { Pokemon } from "../domain/Pokemon";
import type { SortOption } from "../domain/SortOption";

export class SortPokemons {
  execute(pokemons: Pokemon[], sortBy: SortOption): Pokemon[] {
    const sorted = [...pokemons];

    if (sortBy === "default") {
      return sorted.sort((a, b) => a.id - b.id);
    }

    return sorted.sort((a, b) => {
      const aStat = a.stats.find((stat) => stat.stat.name === sortBy)?.base_stat ?? 0;
      const bStat = b.stats.find((stat) => stat.stat.name === sortBy)?.base_stat ?? 0;
      return bStat - aStat;
    });
  }
}
