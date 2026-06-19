// Port — define el contrato de cómo se obtienen Pokémons sin saber de dónde vienen
// Principio aplicado: Dependency Inversion (SOLID - D) — la app depende de esta interfaz, no de la implementación concreta
// Arquitectura Hexagonal — este es el "enchufe" que conecta el dominio con el mundo exterior

import type { Pokemon } from "./Pokemon";

export interface PokemonRepository {
  getByRegion(offset: number, limit: number): Promise<Pokemon[]>;
  getById(id: number): Promise<Pokemon>;
}
