// Domain Value Object — define las regiones válidas del mundo Pokémon
// Principio aplicado: Interface Segregation — cada tipo tiene su propio fichero con solo lo que necesita
// Una sola fuente de verdad — el tipo se deriva del array automáticamente con as const

export const regions = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "paldea",
] as const;

export type Region = (typeof regions)[number];
