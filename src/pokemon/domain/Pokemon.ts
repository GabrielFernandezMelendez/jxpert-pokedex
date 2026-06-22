export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: { name: string };
  }[];
  stats: {
    stat: { name: string };
    base_stat: number;
  }[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
};
