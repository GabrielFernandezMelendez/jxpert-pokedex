import { describe, it, expect } from "vitest";
import { BuildDreamTeam } from "./BuildDreamTeam";
import type { Pokemon } from "../domain/Pokemon";

const createMockPokemon = (id: number, name: string, height: number, weight: number): Pokemon => ({
  id,
  name,
  height,
  weight,
  types: [{ type: { name: "normal" } }],
  stats: [],
  sprites: { front_default: "", other: { "official-artwork": { front_default: "" } } },
});

const buildDreamTeam = new BuildDreamTeam();

describe("BuildDreamTeam", () => {
  it("returns all pokemons when less than 6", () => {
    const pokemons = [
      createMockPokemon(25, "pikachu", 4, 60),
      createMockPokemon(1, "bulbasaur", 7, 69),
    ];
    const result = buildDreamTeam.execute(pokemons);
    expect(result).toHaveLength(2);
  });

  it("returns exactly 6 when given 6", () => {
    const pokemons = Array.from({ length: 6 }, (_, i) =>
      createMockPokemon(i + 1, `pokemon-${i}`, (i + 1) * 5, (i + 1) * 100),
    );
    const result = buildDreamTeam.execute(pokemons);
    expect(result).toHaveLength(6);
  });

  it("limits to last 6 when more than 6 favorites", () => {
    const pokemons = Array.from({ length: 10 }, (_, i) =>
      createMockPokemon(i + 1, `pokemon-${i}`, (i + 1) * 3, (i + 1) * 50),
    );
    const result = buildDreamTeam.execute(pokemons);
    expect(result).toHaveLength(6);
    const resultIds = result.map((p) => p.id);
    expect(resultIds).not.toContain(1);
    expect(resultIds).not.toContain(4);
  });

  it("places big pokemons first sorted by weight ascending", () => {
    const pokemons = [
      createMockPokemon(143, "snorlax", 21, 4600),
      createMockPokemon(142, "aerodactyl", 18, 590),
      createMockPokemon(149, "dragonite", 22, 2100),
      createMockPokemon(131, "lapras", 25, 2200),
      createMockPokemon(25, "pikachu", 4, 60),
      createMockPokemon(136, "flareon", 9, 250),
    ];
    const result = buildDreamTeam.execute(pokemons);
    // Big group first by weight ascending
    expect(result[0].name).toBe("aerodactyl");
    expect(result[1].name).toBe("dragonite");
    expect(result[2].name).toBe("lapras");
    expect(result[3].name).toBe("snorlax");
  });

  it("places small pokemons last (highest z-index = frontmost)", () => {
    const pokemons = [
      createMockPokemon(143, "snorlax", 21, 4600),
      createMockPokemon(142, "aerodactyl", 18, 590),
      createMockPokemon(149, "dragonite", 22, 2100),
      createMockPokemon(131, "lapras", 25, 2200),
      createMockPokemon(25, "pikachu", 4, 60),
      createMockPokemon(136, "flareon", 9, 250),
    ];
    const result = buildDreamTeam.execute(pokemons);
    // Small group last — pikachu last = highest z-index
    const lastTwo = result.slice(-2).map((p) => p.name);
    expect(lastTwo).toContain("pikachu");
    expect(lastTwo).toContain("flareon");
  });

  it("returns empty array when no pokemons", () => {
    const result = buildDreamTeam.execute([]);
    expect(result).toHaveLength(0);
  });
});
