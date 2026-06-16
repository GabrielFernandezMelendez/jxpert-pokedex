// Domain Value Object — define las opciones de ordenación disponibles
// Principio aplicado: Interface Segregation — separado de Pokemon y Region porque se usa en contextos diferentes

export type SortOption =
  | "default"
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";
