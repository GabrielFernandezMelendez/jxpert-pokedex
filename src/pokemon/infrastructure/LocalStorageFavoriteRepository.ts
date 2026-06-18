// Adapter — implementación concreta del puerto FavoriteRepository
// Principio aplicado: Dependency Inversion — implementa la interfaz del dominio
// Single Responsibility — solo persiste favoritos en localStorage
// Arquitectura Hexagonal — adaptador que conecta con el almacenamiento local del navegador

import type { FavoriteRepository } from "../domain/FavoriteRepository";

export class LocalStorageFavoriteRepository implements FavoriteRepository {
  private static STORAGE_KEY = "favoritePokemonIds";

  async getAll(): Promise<Set<number>> {
    const raw = localStorage.getItem(LocalStorageFavoriteRepository.STORAGE_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  }

  async toggle(id: number): Promise<void> {
    const ids = await this.getAll();
    if (ids.has(id)) ids.delete(id);
    else ids.add(id);
    localStorage.setItem(LocalStorageFavoriteRepository.STORAGE_KEY, JSON.stringify([...ids]));
  }
}
