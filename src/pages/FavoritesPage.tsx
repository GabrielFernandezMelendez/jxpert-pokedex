// Página de favoritos — muestra el "Dream Team" del usuario
// Solo presentación — la lógica de carga y negocio vive en los hooks y casos de uso
// getSize y getOffset son lógica de presentación — calculan tamaño y posición visual, no reglas de negocio

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

  // Tamaño visual proporcional al height real — los pequeños son notablemente más pequeños
  const getSize = (pokemon: Pokemon): number => {
    if (team.length === 0) return 150;
    const maxHeight = Math.max(...team.map((p) => p.height));
    const minSize = 55;
    const maxSize = 250;
    return minSize + (pokemon.height / maxHeight) * (maxSize - minSize);
  };

  // Los pokémons pequeños se desplazan hacia abajo para posicionarse en el frente
  const getOffset = (pokemon: Pokemon): number => {
    if (team.length === 0) return 0;
    const maxHeight = Math.max(...team.map((p) => p.height));
    const ratio = pokemon.height / maxHeight;
    return (1 - ratio) * 60;
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
                {team.map((pokemon, index) => {
                  const isSmall = pokemon.zIndex >= 100; // según tu lógica
                  const isFirstSmall =
                    isSmall && team.slice(0, index).some((p) => p.zIndex >= 100) === false; // es el primer pequeño
                  let className = "favorites__pokemon";
                  if (isSmall) className += " favorites__pokemon--small";
                  if (isFirstSmall) className += " favorites__pokemon--small-first";

                  return (
                    <img
                      key={pokemon.id}
                      className={className}
                      src={pokemon.sprites.other["official-artwork"].front_default}
                      alt={pokemon.name}
                      style={{
                        width: `${getSize(pokemon)}px`,
                        height: `${getSize(pokemon)}px`,
                        transform: `translateY(${getOffset(pokemon)}px)`,
                        position: "relative",
                        zIndex: pokemon.zIndex,
                      }}
                    />
                  );
                })}
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
