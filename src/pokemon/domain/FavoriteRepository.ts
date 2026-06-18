// Port — define el contrato de cómo se persisten los favoritos sin saber de dónde vienen
// Principio aplicado: Dependency Inversion — la app depende de esta interfaz, no del almacenamiento concreto
// Arquitectura Hexagonal — puerto que conecta la lógica de favoritos con la infraestructura
export interface FavoriteRepository {
  getAll(): Promise<Set<number>>;
  toggle(id: number): Promise<void>;
}
