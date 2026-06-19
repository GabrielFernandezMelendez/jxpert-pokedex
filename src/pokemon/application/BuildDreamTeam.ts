import type { Pokemon } from "../domain/Pokemon";

const MAX_TEAM_SIZE = 6;

export class BuildDreamTeam {
  execute(pokemons: Pokemon[]): Pokemon[] {
    const team = pokemons.slice(-MAX_TEAM_SIZE);

    // Calcular la media de height (en lugar de mediana)
    const totalHeight = team.reduce((sum, p) => sum + p.height, 0);
    const meanHeight = totalHeight / team.length;

    // Grupo grandes: height >= media, ordenados por weight ascendente
    const bigGroup = team.filter((p) => p.height >= meanHeight).sort((a, b) => a.weight - b.weight);

    // Grupo pequeños: height < media, ordenados por weight ascendente (cambio)
    const smallGroup = team
      .filter((p) => p.height < meanHeight)
      .sort((a, b) => a.weight - b.weight); // antes era b.weight - a.weight

    return [...bigGroup, ...smallGroup];
  }
}
