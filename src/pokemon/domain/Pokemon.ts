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
  height: number;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
};
