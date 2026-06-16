// Domain Value Object — define las regiones válidas del mundo Pokémon
// Principio aplicado: Interface Segregation — cada tipo tiene su propio fichero con solo lo que necesita

export type Region =
  | "kanto"
  | "johto"
  | "hoenn"
  | "sinnoh"
  | "unova"
  | "kalos"
  | "alola"
  | "galar"
  | "paldea";
