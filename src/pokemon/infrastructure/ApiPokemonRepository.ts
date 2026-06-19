// Adapter — implementación concreta del puerto PokemonRepository
// Principio aplicado: Dependency Inversion — implementa la interfaz del dominio
// Patrón Adapter — traduce la respuesta de la PokéAPI al tipo Pokemon del dominio

import type { Pokemon } from "../domain/Pokemon";
import type { PokemonRepository } from "../domain/PokemonRepository";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export class ApiPokemonRepository implements PokemonRepository {
  async getByRegion(offset: number, limit: number): Promise<Pokemon[]> {
    const { results }: { results: { url: string }[] } = await fetch(
      `${API_URL}?offset=${offset}&limit=${limit}`,
    ).then((res) => res.json());

    const pokemons: Pokemon[] = await Promise.all(
      results.map(async ({ url }) => await fetch(url).then((res) => res.json())),
    );

    return pokemons;
  }

  async getById(id: number): Promise<Pokemon> {
    const pokemon: Pokemon = await fetch(`${API_URL}/${id}`).then((res) => res.json());
    return pokemon;
  }
}
