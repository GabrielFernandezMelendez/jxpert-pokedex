import { describe, it, expect, vi } from "vitest";
import { GetPokemons } from "./GetPokemons";
import type { PokemonRepository } from "../domain/PokemonRepository";
import type { Pokemon } from "../domain/Pokemon";

// Mock del repositorio — creamos una implementación falsa del puerto
// Aquí se ve el valor de la arquitectura hexagonal: podemos testear sin llamar a la API real
// Principio aplicado: Dependency Inversion — el test depende del puerto, no del adaptador
const mockPokemons: Pokemon[] = [
  {
    id: 1,
    name: "bulbasaur",
    types: [{ type: { name: "grass" } }],
    stats: [],
    sprites: { other: { "official-artwork": { front_default: "" } } },
  },
];

const mockRepository: PokemonRepository = {
  getByRegion: vi.fn().mockResolvedValue(mockPokemons),
};

describe("GetPokemons", () => {
  // Caso de uso: la app carga pokémons al seleccionar una región
  it("returns pokémons from the repository", async () => {
    const getPokemons = new GetPokemons(mockRepository);
    const result = await getPokemons.execute("kanto");
    expect(result).toEqual(mockPokemons);
  });

  // Caso de uso: verificar que Kanto usa offset 0 y limit 151
  it("calls repository with correct offset and limit for kanto", async () => {
    const getPokemons = new GetPokemons(mockRepository);
    await getPokemons.execute("kanto");
    expect(mockRepository.getByRegion).toHaveBeenCalledWith(0, 151);
  });

  // Caso de uso: verificar que Johto usa offset 151 y limit 100
  it("calls repository with correct offset and limit for johto", async () => {
    const getPokemons = new GetPokemons(mockRepository);
    await getPokemons.execute("johto");
    expect(mockRepository.getByRegion).toHaveBeenCalledWith(151, 100);
  });

  // Caso de uso: verificar que cada región tiene su configuración correcta
  it("uses correct config for all regions", async () => {
    const expectedConfig: Record<string, { offset: number; limit: number }> = {
      kanto: { offset: 0, limit: 151 },
      johto: { offset: 151, limit: 100 },
      hoenn: { offset: 251, limit: 135 },
      sinnoh: { offset: 386, limit: 108 },
      unova: { offset: 494, limit: 155 },
      kalos: { offset: 649, limit: 72 },
      alola: { offset: 721, limit: 88 },
      galar: { offset: 809, limit: 96 },
      paldea: { offset: 905, limit: 120 },
    };

    const getPokemons = new GetPokemons(mockRepository);

    for (const [region, config] of Object.entries(expectedConfig)) {
      await getPokemons.execute(region as any);
      expect(mockRepository.getByRegion).toHaveBeenCalledWith(config.offset, config.limit);
    }
  });
});
