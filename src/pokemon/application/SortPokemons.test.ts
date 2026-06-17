import { describe, it, expect } from "vitest";
import { SortPokemons } from "./SortPokemons";
import type { Pokemon } from "../domain/Pokemon";

// Datos de prueba — pokémons con stats diferentes para verificar la ordenación
const mockPokemons: Pokemon[] = [
  {
    id: 1,
    name: "bulbasaur",
    types: [{ type: { name: "grass" } }],
    stats: [
      { stat: { name: "hp" }, base_stat: 45 },
      { stat: { name: "attack" }, base_stat: 49 },
      { stat: { name: "defense" }, base_stat: 49 },
      { stat: { name: "special-attack" }, base_stat: 65 },
      { stat: { name: "special-defense" }, base_stat: 65 },
      { stat: { name: "speed" }, base_stat: 45 },
    ],
    sprites: { other: { "official-artwork": { front_default: "" } } },
  },
  {
    id: 4,
    name: "charmander",
    types: [{ type: { name: "fire" } }],
    stats: [
      { stat: { name: "hp" }, base_stat: 39 },
      { stat: { name: "attack" }, base_stat: 52 },
      { stat: { name: "defense" }, base_stat: 43 },
      { stat: { name: "special-attack" }, base_stat: 60 },
      { stat: { name: "special-defense" }, base_stat: 50 },
      { stat: { name: "speed" }, base_stat: 65 },
    ],
    sprites: { other: { "official-artwork": { front_default: "" } } },
  },
  {
    id: 25,
    name: "pikachu",
    types: [{ type: { name: "electric" } }],
    stats: [
      { stat: { name: "hp" }, base_stat: 35 },
      { stat: { name: "attack" }, base_stat: 55 },
      { stat: { name: "defense" }, base_stat: 40 },
      { stat: { name: "special-attack" }, base_stat: 50 },
      { stat: { name: "special-defense" }, base_stat: 50 },
      { stat: { name: "speed" }, base_stat: 90 },
    ],
    sprites: { other: { "official-artwork": { front_default: "" } } },
  },
];

const sort = new SortPokemons();

describe("SortPokemons", () => {
  // Caso de uso: el usuario selecciona "Hp" y los pokémons se reordenan
  it("sorts by hp descending", () => {
    const result = sort.execute(mockPokemons, "hp");
    expect(result[0].name).toBe("bulbasaur"); // hp: 45
    expect(result[1].name).toBe("charmander"); // hp: 39
    expect(result[2].name).toBe("pikachu"); // hp: 35
  });

  // Caso de uso: el usuario selecciona "Default" y vuelve al orden original
  it("sorts by default (id ascending)", () => {
    const result = sort.execute(mockPokemons, "default");
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(4);
    expect(result[2].id).toBe(25);
  });

  // Caso de uso: el usuario selecciona "Spd"
  it("sorts by speed descending", () => {
    const result = sort.execute(mockPokemons, "speed");
    expect(result[0].name).toBe("pikachu"); // speed: 90
    expect(result[1].name).toBe("charmander"); // speed: 65
    expect(result[2].name).toBe("bulbasaur"); // speed: 45
  });

  // Caso de uso: garantizar que ordenar no muta los datos originales
  it("does not modify the original array", () => {
    const original = [...mockPokemons];
    sort.execute(mockPokemons, "hp");
    expect(mockPokemons[0].id).toBe(original[0].id);
    expect(mockPokemons[1].id).toBe(original[1].id);
    expect(mockPokemons[2].id).toBe(original[2].id);
  });

  // Caso de uso: datos incompletos de la API no rompen la app
  it("handles pokemon with missing stat using fallback 0", () => {
    const incompletePokemons: Pokemon[] = [
      {
        id: 1,
        name: "missingno",
        types: [{ type: { name: "normal" } }],
        stats: [],
        sprites: { other: { "official-artwork": { front_default: "" } } },
      },
      ...mockPokemons,
    ];
    const result = sort.execute(incompletePokemons, "hp");
    expect(result[result.length - 1].name).toBe("missingno"); // hp: 0 por fallback
  });
});
