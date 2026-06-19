// Página de favoritos — muestra el "Dream Team" del usuario
// Los pokémons favoritos se cargan desde localStorage y se resuelven contra la PokéAPI

import { useEffect, useState } from "react";
import { HEADER, FOOTER } from "../constants/ui";
import { Header } from "../components/organisms/Header";
import { Footer } from "../components/organisms/Footer";
import { useFavorites } from "../hooks/useFavorites";
import { LocalStorageFavoriteRepository } from "../pokemon/infrastructure/LocalStorageFavoriteRepository";
import type { Pokemon } from "../pokemon/domain/Pokemon";

const favoriteRepository = new LocalStorageFavoriteRepository();

export const FavoritesPage = () => {
  const { favoriteIds } = useFavorites(favoriteRepository);
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const loadFavorites = async () => {
      setIsLoading(true);
      const ids = Array.from(favoriteIds);
      if (ids.length === 0) {
        setFavoritePokemons([]);
        setIsLoading(false);
        return;
      }
      const pokemons: Pokemon[] = await Promise.all(
        ids.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())),
      );
      // Ordena por height descendente — los más grandes se renderizan primero (detrás)
      setFavoritePokemons(pokemons.sort((a, b) => b.height - a.height));
      setIsLoading(false);
    };
    loadFavorites();
  }, [favoriteIds.size]);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Calcula el tamaño visual basándose en el height real del pokémon
  const getSize = (pokemon: Pokemon): number => {
    if (favoritePokemons.length === 0) return 150;
    const maxHeight = Math.max(...favoritePokemons.map((p) => p.height));
    const minSize = 80;
    const maxSize = 200;
    return minSize + (pokemon.height / maxHeight) * (maxSize - minSize);
  };

  return (
    <div className="layout">
      <Header logoSrc={HEADER.logoSrc} title={HEADER.title}>
        <span className="header__dream-team">
          <span className="header__sparkle header__sparkle--top">✦</span>
          <span className="header__sparkle header__sparkle--mid">✦</span>
          <span className="header__sparkle header__sparkle--bottom">✦</span>
          Dream team
        </span>
      </Header>

      <main className="container">
        <div className="favorites">
          {isLoading && <p className="noresults">Loading your team...</p>}

          {!isLoading && favoritePokemons.length === 0 && (
            <p className="noresults">No favorites yet. Go catch some!</p>
          )}

          {!isLoading && favoritePokemons.length > 0 && (
            <div className="favorites__card">
              <h2 className="favorites__title">Dream team</h2>

              <div className="favorites__showcase">
                {favoritePokemons.map((pokemon, index) => (
                  <img
                    key={pokemon.id}
                    className="favorites__pokemon"
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    style={{
                      width: `${getSize(pokemon)}px`,
                      height: `${getSize(pokemon)}px`,
                      zIndex: favoritePokemons.length - index,
                    }}
                  />
                ))}
              </div>

              <div className="favorites__icons">
                {favoritePokemons.map((pokemon) => (
                  <img
                    key={`icon-${pokemon.id}`}
                    className="favorites__icon"
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer copyrightText={FOOTER.copyrightText} />
    </div>
  );
};
