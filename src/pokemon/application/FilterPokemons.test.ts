import { describe, it, expect } from "vitest";
import { FilterPokemons } from "./FilterPokemons";
import type { Pokemon } from "../domain/Pokemon";

// Datos de prueba — pokémons simulados con solo los campos necesarios para filtrar
const mockPokemons: Pokemon[] = [
  {
    id: 1,
    name: "bulbasaur",
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    stats: [],
    sprites: { other: { "official-artwork": { front_default: "" } } },
  },
  {
    id: 4,
    name: "charmander",
    types: [{ type: { name: "fire" } }],
    stats: [],
    sprites: { other: { "official-artwork": { front_default: "" } } },
  },
  {
    id: 25,
    name: "pikachu",
    types: [{ type: { name: "electric" } }],
    stats: [],
    sprites: { other: { "official-artwork": { front_default: "" } } },
  },
  {
    id: 5,
    name: "charmeleon",
    types: [{ type: { name: "fire" } }],
    stats: [],
    sprites: { other: { "official-artwork": { front_default: "" } } },
  },
];

const filter = new FilterPokemons();

describe("FilterPokemons", () => {
  // Caso de uso: el usuario escribe "pikachu" y solo ve ese pokémon
  it("filters pokémons by name", () => {
    const result = filter.execute(mockPokemons, "pikachu");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("pikachu");
  });

  // Caso de uso: el usuario escribe "fire" y ve todos los de tipo fuego
  it("filters pokémons by type", () => {
    const result = filter.execute(mockPokemons, "fire");
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.types.some((t) => t.type.name === "fire"))).toBe(true);
  });

  // Caso de uso: el usuario escribe "PIKACHU" y funciona igual
  it("search is case insensitive", () => {
    const result = filter.execute(mockPokemons, "PIKACHU");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("pikachu");
  });

  // Caso de uso: el usuario borra el texto del buscador y ve todos
  it("empty query returns all pokémons", () => {
    const result = filter.execute(mockPokemons, "");
    expect(result).toHaveLength(mockPokemons.length);
  });

  // Caso de uso: el usuario busca algo que no existe
  it("nonexistent query returns empty array", () => {
    const result = filter.execute(mockPokemons, "pokemonquenoexiste");
    expect(result).toHaveLength(0);
  });

  // Caso de uso: el usuario escribe "char" y ve charmander y charmeleon
  it("filters by partial name match", () => {
    const result = filter.execute(mockPokemons, "char");
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.name.includes("char"))).toBe(true);
  });
});
