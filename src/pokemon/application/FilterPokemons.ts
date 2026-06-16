// Use Case — filtra pokémons por nombre o por tipo
// Principio aplicado: Single Responsibility — solo se encarga de filtrar
// Principio aplicado: Open-Closed — si se añade un nuevo criterio de filtrado se extiende sin modificar lo existente

import type { Pokemon } from "../domain/Pokemon";

export class FilterPokemons {
  execute(pokemons: Pokemon[], query: string): Pokemon[] {
    const normalizedQuery = query.toLowerCase();

    return pokemons.filter(
      (pokemon) =>
        pokemon.name.includes(normalizedQuery) ||
        !!pokemon.types.find((type) => type.type.name.startsWith(normalizedQuery)),
    );
  }
}
