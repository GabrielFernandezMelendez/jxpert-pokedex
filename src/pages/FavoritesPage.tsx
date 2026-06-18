// Página de favoritos — muestra el "Dream Team" del usuario
// Los pokémons favoritos se cargan desde localStorage y se resuelven contra la PokéAPI

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  // Carga los datos completos de cada pokémon favorito desde la API
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
      const pokemons = await Promise.all(
        ids.map((id) => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())),
      );
      setFavoritePokemons(pokemons);
      setIsLoading(false);
    };
    loadFavorites();
  }, [favoriteIds.size]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className="layout">
      <Header logoSrc={HEADER.logoSrc} title={HEADER.title}>
        <Link to="/" className="header__favorites-btn">
          ← Pokédex
        </Link>
      </Header>

      <main className="container">
        <div className="favorites">
          <Link to="/" className="favorites__back">
            &larr; Back to Pokédex
          </Link>
          <h2 className="favorites__title">Dream team</h2>

          {isLoading && <p className="noresults">Loading your team...</p>}

          {!isLoading && favoritePokemons.length === 0 && (
            <p className="noresults">No favorites yet. Go catch some!</p>
          )}

          {!isLoading && favoritePokemons.length > 0 && (
            <>
              <div className="favorites__showcase">
                {favoritePokemons.map((pokemon) => (
                  <img
                    key={pokemon.id}
                    className="favorites__pokemon"
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
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
            </>
          )}
        </div>
      </main>

      <Footer copyrightText={FOOTER.copyrightText} />
    </div>
  );
};
