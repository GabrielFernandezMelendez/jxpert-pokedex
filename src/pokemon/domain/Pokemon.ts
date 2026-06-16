// Domain Entity — define qué es un Pokémon independientemente de dónde vengan los datos
// Single Responsibility — este fichero solo define la estructura del dato

export type PokemonType = {
  type: {
    name: string;
  };
};

export type PokemonStat = {
  stat: {
    name: string;
  };
  base_stat: number;
};

export type Pokemon = {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
};
