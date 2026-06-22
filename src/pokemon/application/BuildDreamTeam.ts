// Regla de negocio: máximo 6, grandes ordenados por weight ascendente, pequeños después
// Principio aplicado: Single Responsibility — solo construye el equipo
// Principio aplicado: Open-Closed — funciona con cualquier combinación de pokémons

import type { Pokemon } from "../domain/Pokemon";

const MAX_TEAM_SIZE = 6;

export class BuildDreamTeam {
  execute(pokemons: Pokemon[]): Pokemon[] {
    const team = pokemons.slice(-MAX_TEAM_SIZE);

    if (team.length === 0) return [];

    const totalHeight = team.reduce((sum, p) => sum + p.height, 0);
    const meanHeight = totalHeight / team.length;

    const bigGroup = team.filter((p) => p.height >= meanHeight).sort((a, b) => a.weight - b.weight);

    const smallGroup = team
      .filter((p) => p.height < meanHeight)
      .sort((a, b) => b.weight - a.weight);

    return [...bigGroup, ...smallGroup];
  }
}
