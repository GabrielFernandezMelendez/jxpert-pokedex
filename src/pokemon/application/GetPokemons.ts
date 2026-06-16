// Use Case — obtención de pokémons por región, es aqui donde se hace fetch cada vez que se cambie de region
// Principio aplicado: Single Responsibility — este fichero solo se encarga de obtener pokémons
// Principio aplicado: Dependency Inversion — depende del puerto, no del adaptador(podriamos cambiar de donde vienen los datos implementamos la interfaz para ello)
// Arquitectura Hexagonal — capa de aplicación que conecta el dominio con la infraestructura

import type { Pokemon } from "../domain/Pokemon";
import type { Region } from "../domain/Region";
import type { PokemonRepository } from "../domain/PokemonRepository";

// Mapa que traduce cada región a su offset y limit en la PokéAPI
// Patrón aplicado: reemplaza la cadena de if/else por un objeto de configuración
const regionConfig: Record<Region, { offset: number; limit: number }> = {
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

export class GetPokemons {
  private repository: PokemonRepository;

  constructor(repository: PokemonRepository) {
    this.repository = repository;
  }

  execute(region: Region): Promise<Pokemon[]> {
    const { offset, limit } = regionConfig[region];
    return this.repository.getByRegion(offset, limit);
  }
}
