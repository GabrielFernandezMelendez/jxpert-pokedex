// Página de favoritos — muestra el "Dream Team" del usuario
// Solo presentación — la lógica de carga y negocio vive en los hooks y casos de uso
// getSize, getOffset, getZIndex y getHorizontalOffset son lógica de presentación

import { HEADER, FOOTER } from "../constants/ui";
import { Header } from "../components/organisms/Header";
import { Footer } from "../components/organisms/Footer";
import { useFavorites } from "../hooks/useFavorites";
import { useDreamTeam } from "../hooks/useDreamTeam";
import { LocalStorageFavoriteRepository } from "../pokemon/infrastructure/LocalStorageFavoriteRepository";
import type { Pokemon } from "../pokemon/domain/Pokemon";

const favoriteRepository = new LocalStorageFavoriteRepository();

export const FavoritesPage = () => {
  const { favoriteIds } = useFavorites(favoriteRepository);
  const { team, isLoading } = useDreamTeam(favoriteIds);

  const getSize = (pokemon: Pokemon): number => {
    if (team.length === 0) return 150;
    const maxHeight = Math.max(...team.map((p) => p.height));
    const minSize = 40;
    const maxSize = 250;
    return minSize + (pokemon.height / maxHeight) * (maxSize - minSize);
  };

  const getOffset = (pokemon: Pokemon): number => {
    if (team.length === 0) return 0;
    const maxHeight = Math.max(...team.map((p) => p.height));
    const ratio = pokemon.height / maxHeight;
    return (1 - ratio) * 60 - 26;
  };

  const getZIndex = (pokemon: Pokemon): number => {
    const sortedByHeight = [...team].sort((a, b) => b.height - a.height);
    return sortedByHeight.findIndex((p) => p.id === pokemon.id) + 1;
  };

  // Desplaza los pokémons pequeños a la derecha para centrarlos con los grandes
  const getHorizontalOffset = (pokemon: Pokemon): number => {
    if (team.length === 0) return 0;
    const maxHeight = Math.max(...team.map((p) => p.height));
    const minHeight = Math.min(...team.map((p) => p.height));
    const ratio = pokemon.height / maxHeight;
    if (pokemon.height === minHeight) return -112; // Pikachu — más a la derecha que Flareon
    if (ratio < 0.5) return -130; // Flareon
    return -80; // grandes
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

          {!isLoading && team.length === 0 && (
            <p className="noresults">No favorites yet. Go catch some!</p>
          )}

          {!isLoading && team.length > 0 && (
            <div className="favorites__card">
              <h2 className="favorites__title">Dream team</h2>

              <div className="favorites__showcase">
                {team.map((pokemon) => (
                  <img
                    key={pokemon.id}
                    className="favorites__pokemon"
                    src={pokemon.sprites.other["official-artwork"].front_default}
                    alt={pokemon.name}
                    style={{
                      width: `${getSize(pokemon)}px`,
                      height: `${getSize(pokemon)}px`,
                      zIndex: getZIndex(pokemon),
                      transform: `translateX(${getHorizontalOffset(pokemon)}px) translateY(${getOffset(pokemon)}px)`,
                    }}
                  />
                ))}
              </div>

              <div className="favorites__icons">
                {team.map((pokemon) => (
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
