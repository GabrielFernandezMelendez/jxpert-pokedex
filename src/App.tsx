import { useEffect, useState, type CSSProperties } from "react";
import bug from "./assets/bug.svg";
import dark from "./assets/dark.svg";
import dragon from "./assets/dragon.svg";
import electric from "./assets/electric.svg";
import fairy from "./assets/fairy.svg";
import fighting from "./assets/fighting.svg";
import fire from "./assets/fire.svg";
import flying from "./assets/flying.svg";
import ghost from "./assets/ghost.svg";
import grass from "./assets/grass.svg";
import ground from "./assets/ground.svg";
import ice from "./assets/ice.svg";
import normal from "./assets/normal.svg";
import poison from "./assets/poison.svg";
import psychic from "./assets/psychic.svg";
import rock from "./assets/rock.svg";
import steel from "./assets/steel.svg";
import water from "./assets/water.svg";
import pokeball from "./assets/pokeball.svg";
import type { Pokemon } from "./pokemon/domain/Pokemon";
import type { Region } from "./pokemon/domain/Region";
import type { SortOption } from "./pokemon/domain/SortOption";

/**
 *  Iconos de los tipos de Pokémon
 */
const typeIcons: Record<string, string> = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};

const regions: Region[] = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "paldea",
];
export const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [region, setRegion] = useState<Region>("kanto");
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState<boolean>(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  useEffect(() => {
    /**
     *  Carga de datos de Pokémons y gestión de estado de cargando.
     */
    const getData = async () => {
      setIsLoading(true);
      setIsFiltering(true);

      let regStart, regEnd;
      if (region === "kanto") {
        regStart = 0;
        regEnd = 151;
      } else if (region === "johto") {
        regStart = 151;
        regEnd = 100;
      } else if (region === "hoenn") {
        regStart = 251;
        regEnd = 135;
      } else if (region === "sinnoh") {
        regStart = 386;
        regEnd = 108;
      } else if (region === "unova") {
        regStart = 494;
        regEnd = 155;
      } else if (region === "kalos") {
        regStart = 649;
        regEnd = 72;
      } else if (region === "alola") {
        regStart = 721;
        regEnd = 88;
      } else if (region === "galar") {
        regStart = 809;
        regEnd = 96;
      } else if (region === "paldea") {
        regStart = 905;
        regEnd = 120;
      } else {
        regStart = 0;
        regEnd = 151;
      }
      const { results }: { results: { url: string }[] } = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${regStart}&limit=${regEnd}`,
      ).then((res) => res.json());
      const result = await Promise.all(
        results.map(async ({ url }) => await fetch(url).then((res) => res.json())),
      );
      setPokemons(result);
      setFilteredPokemons(result);
      setIsLoading(false);
    };
    getData();
  }, [region]);
  /**
   * Filters results based on input query term.
   */
  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter(
        (pokemon) =>
          pokemon.name.includes(searchQuery.toLowerCase()) ||
          !!pokemon.types.find((type) => type.type.name.startsWith(searchQuery.toLowerCase())),
      ),
    );
    setIsFiltering(false);
  }, [pokemons[0]?.id, searchQuery]);
  /**
   * Sorts results based on selected sorting criteria.
   */
  useEffect(() => {
    if (sortBy !== "default") {
      if (sortBy === "hp") {
        setFilteredPokemons((prev) =>
          [...prev].sort((a, b) => {
            //cambiamos para que devuelva el valor directamente y no hagamos un doble acceso a la propiedad , devuelve cero en caso de error o fallback
            const aStat = a.stats.find((stat) => stat.stat.name === "hp")?.base_stat ?? 0;
            const bStat = b.stats.find((stat) => stat.stat.name === "hp")?.base_stat ?? 0;
            return bStat - aStat;
          }),
        );
      }
      if (sortBy === "attack") {
        setFilteredPokemons((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find((stat) => stat.stat.name === "attack")?.base_stat ?? 0;
            const bStat = b.stats.find((stat) => stat.stat.name === "attack")?.base_stat ?? 0;
            return bStat - aStat;
          }),
        );
      }
      if (sortBy === "defense") {
        setFilteredPokemons((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find((stat) => stat.stat.name === "defense")?.base_stat ?? 0;
            const bStat = b.stats.find((stat) => stat.stat.name === "defense")?.base_stat ?? 0;
            return bStat - aStat;
          }),
        );
      }
      if (sortBy === "special-attack") {
        setFilteredPokemons((prev) =>
          [...prev].sort((a, b) => {
            const aStat =
              a.stats.find((stat) => stat.stat.name === "special-attack")?.base_stat ?? 0;
            const bStat =
              b.stats.find((stat) => stat.stat.name === "special-attack")?.base_stat ?? 0;
            return bStat - aStat;
          }),
        );
      }
      if (sortBy === "special-defense") {
        setFilteredPokemons((prev) =>
          [...prev].sort((a, b) => {
            const aStat =
              a.stats.find((stat) => stat.stat.name === "special-defense")?.base_stat ?? 0;
            const bStat =
              b.stats.find((stat) => stat.stat.name === "special-defense")?.base_stat ?? 0;
            return bStat - aStat;
          }),
        );
      }
      if (sortBy === "speed") {
        setFilteredPokemons((prev) =>
          [...prev].sort((a, b) => {
            const aStat = a.stats.find((stat) => stat.stat.name === "speed")?.base_stat ?? 0;
            const bStat = b.stats.find((stat) => stat.stat.name === "speed")?.base_stat ?? 0;
            return bStat - aStat;
          }),
        );
      }
    }
    if (sortBy === "default") {
      setFilteredPokemons((prev) =>
        [...prev].sort((a, b) => {
          return a.id - b.id;
        }),
      );
    }
  }, [filteredPokemons[0]?.id, sortBy]);

  return (
    <div className="layout">
      <header className="header">
        <img src={pokeball} alt="" className="header__logo" />
        <p className="header__title">Pokédex</p>
      </header>

      {/* Searcher */}
      <main className="container">
        <section className="search">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="search__icon">
            <path
              d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L15 15"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search a Pokémon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Shows regions */}
          <div className="dropdown">
            <button
              role="combobox"
              aria-haspopup="listbox"
              aria-controls="reg-list"
              aria-label="Select reg"
              aria-expanded={isRegionDropdownOpen}
              className={`dropdown__button ${isRegionDropdownOpen ? "active" : ""}`}
              onClick={() =>
                setIsRegionDropdownOpen((prev) => {
                  if (isSortMenuOpen) {
                    setIsSortMenuOpen(false);
                  }
                  return !prev;
                })
              }
            >
              {region}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33337 5.99999L8.00004 3.33333L10.6667 5.99999"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6667 10L8.00004 12.6667L5.33337 10"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ol
              role="listbox"
              id="reg-list"
              hidden={!isRegionDropdownOpen}
              className={`dropdown__list ${!isRegionDropdownOpen ? "hide" : ""}`}
            >
              {regions.map((key) => (
                <li
                  key={key}
                  role="radio"
                  aria-checked={region === key}
                  tabIndex={0}
                  className={region === key ? "active" : ""}
                  onClick={() => {
                    setRegion(key);
                    setIsRegionDropdownOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setRegion(key);
                      setIsRegionDropdownOpen(false);
                    }
                  }}
                >
                  {key}
                </li>
              ))}
            </ol>
          </div>

          <button
            role="combobox"
            aria-haspopup="listbox"
            aria-controls="sort-list"
            aria-label="Sort by"
            aria-expanded={isSortMenuOpen}
            className="sort__button"
            onClick={() =>
              setIsSortMenuOpen((prev) => {
                if (isRegionDropdownOpen) setIsRegionDropdownOpen(false);
                return !prev;
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isSortMenuOpen ? "var(--color-accent)" : "var(--color-neutral-700)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l9 0" />
              <path d="M4 12l7 0" />
              <path d="M4 18l7 0" />
              <path d="M15 15l3 3l3 -3" />
              <path d="M18 6l0 12" />
            </svg>
          </button>

          {/* Muestra el menú de ordenación */}
          {isSortMenuOpen && (
            <article className="sort__wrapper">
              <h3 className="sort__title">Sort by</h3>
              <div className="sort__items" role="listbox" id="sort-list">
                <span
                  role="radio"
                  aria-label="Default"
                  tabIndex={0}
                  className={`sort__pill ${sortBy === "default" ? "active" : ""}`}
                  aria-checked={sortBy === "default"}
                  onClick={() => {
                    setSortBy("default");
                    setIsSortMenuOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("default");
                      setIsSortMenuOpen(false);
                    }
                  }}
                >
                  {" "}
                  Default
                </span>
                <span
                  role="radio"
                  aria-label="Health points"
                  tabIndex={0}
                  className={`sort__pill ${sortBy === "hp" ? "active" : ""}`}
                  aria-checked={sortBy === "hp"}
                  onClick={() => {
                    setSortBy("hp");
                    setIsSortMenuOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("hp");
                      setIsSortMenuOpen(false);
                    }
                  }}
                >
                  {" "}
                  Hp
                </span>
                <span
                  role="radio"
                  aria-label="Attack"
                  tabIndex={0}
                  className={`sort__pill ${sortBy === "attack" ? "active" : ""}`}
                  aria-checked={sortBy === "attack"}
                  onClick={() => {
                    setSortBy("attack");
                    setIsSortMenuOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("attack");
                      setIsSortMenuOpen(false);
                    }
                  }}
                >
                  {" "}
                  At
                </span>
                <span
                  role="radio"
                  aria-label="Defense"
                  tabIndex={0}
                  className={`sort__pill ${sortBy === "defense" ? "active" : ""}`}
                  aria-checked={sortBy === "defense"}
                  onClick={() => {
                    setSortBy("defense");
                    setIsSortMenuOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("defense");
                      setIsSortMenuOpen(false);
                    }
                  }}
                >
                  Df
                </span>
                <span
                  role="radio"
                  aria-label="Special attack"
                  tabIndex={0}
                  className={`sort__pill ${sortBy === "special-attack" ? "active" : ""}`}
                  aria-checked={sortBy === "special-attack"}
                  onClick={() => {
                    setSortBy("special-attack");
                    setIsSortMenuOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("special-attack");
                      setIsSortMenuOpen(false);
                    }
                  }}
                >
                  SpA
                </span>
                <span
                  role="radio"
                  aria-label="Special defense"
                  tabIndex={0}
                  className={`sort__pill ${sortBy === "special-defense" ? "active" : ""}`}
                  aria-checked={sortBy === "special-defense"}
                  onClick={() => {
                    setSortBy("special-defense");
                    setIsSortMenuOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("special-defense");
                      setIsSortMenuOpen(false);
                    }
                  }}
                >
                  SpD
                </span>
                <span
                  role="radio"
                  aria-label="Speed"
                  tabIndex={0}
                  className={`sort__pill ${sortBy === "speed" ? "active" : ""}`}
                  aria-checked={sortBy === "speed"}
                  onClick={() => {
                    setSortBy("speed");
                    setIsSortMenuOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("speed");
                      setIsSortMenuOpen(false);
                    }
                  }}
                >
                  {" "}
                  Spd
                </span>
              </div>
            </article>
          )}
        </section>

        {/* Muestra cartas cargando */}
        <section>
          {(isLoading || isFiltering) && (
            <div className="grid" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => {
                return (
                  <article key={`placeholder-card-${index}`} className="card card-placeholder">
                    <svg viewBox="0 0 24 24">
                      <path d="M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M12,4C7.92,4 4.55,7.05 4.06,11H8.13C8.57,9.27 10.14,8 12,8C13.86,8 15.43,9.27 15.87,11H19.94C19.45,7.05 16.08,4 12,4M12,20C16.08,20 19.45,16.95 19.94,13H15.87C15.43,14.73 13.86,16 12,16C10.14,16 8.57,14.73 8.13,13H4.06C4.55,16.95 7.92,20 12,20M12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14C13.1,14 14,13.1 14,12C14,10.9 13.1,10 12,10Z" />
                    </svg>
                  </article>
                );
              })}
            </div>
          )}
          {/* Prints cards */}
          {!isFiltering && !isLoading && filteredPokemons.length > 0 && (
            <ul className="grid">
              {filteredPokemons.map((pokemon) => {
                const customStyles = {
                  "--color-type": `var(--color-${pokemon.types[0].type.name}`, //da el color de la card en funcion del primer tipo del pokemon
                } as CSSProperties;

                return (
                  <li key={`pokemon-card-${pokemon.id}`}>
                    <article className="card" style={customStyles}>
                      <header className="card__head">
                        <div className="card__tag">
                          <p>#{pokemon.id.toString().padStart(3, "0")}</p>
                        </div>
                        <div className="card__tag">
                          <img
                            src={typeIcons[pokemon.types[0].type.name]}
                            className="card__type"
                            alt={`${pokemon.types[0].type.name} primary type`}
                          />
                          {pokemon.types[1] && (
                            <img
                              src={typeIcons[pokemon.types[1].type.name]}
                              className="card__type"
                              alt={`${pokemon.types[1].type.name} secondary type`}
                            />
                          )}
                        </div>
                      </header>
                      <img
                        className="card__avatar"
                        src={pokemon.sprites.other["official-artwork"].front_default}
                        loading="lazy"
                        alt={`${pokemon.name} artwork`}
                      />
                      <section className="card__content">
                        <h3 className="card__title">{pokemon.name}</h3>
                        <ul aria-description="Stats resume">
                          <li className="card__stat" aria-label="Health points">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                Hp
                              </p>
                              <p>{pokemon.stats[0].base_stat}</p>
                            </div>
                            <progress value={pokemon.stats[0].base_stat} max="255"></progress>
                          </li>
                          <li className="card__stat" aria-label="Attack">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                At
                              </p>
                              <p>{pokemon.stats[1].base_stat}</p>
                            </div>
                            <progress value={pokemon.stats[1].base_stat} max="255"></progress>
                          </li>
                          <li className="card__stat" aria-label="Defense">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                Df
                              </p>
                              <p>{pokemon.stats[2].base_stat}</p>
                            </div>
                            <progress value={pokemon.stats[2].base_stat} max="255"></progress>
                          </li>
                          <li className="card__stat" aria-label="Special attack">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                SpA
                              </p>
                              <p>{pokemon.stats[3].base_stat}</p>
                            </div>
                            <progress value={pokemon.stats[3].base_stat} max="255"></progress>
                          </li>
                          <li className="card__stat" aria-label="Special defense">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                SpD
                              </p>
                              <p>{pokemon.stats[4].base_stat}</p>
                            </div>
                            <progress value={pokemon.stats[4].base_stat} max="255"></progress>
                          </li>
                          <li className="card__stat" aria-label="Speed">
                            <div className="stat__value">
                              <p className="stat__name" aria-hidden="true">
                                Spd
                              </p>
                              <p>{pokemon.stats[5].base_stat}</p>
                            </div>
                            <progress value={pokemon.stats[5].base_stat} max="255"></progress>
                          </li>
                        </ul>
                      </section>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        {!isLoading && filteredPokemons.length === 0 && (
          //tuve que cambiar las comillas por que Eslint  no permite comiilas en JSX, classname se usa por que class es palabra reservada y este fichero no es html ,curioso
          <p className="noresults">No results for &ldquo;{searchQuery}&rdquo;</p>
        )}
      </main>

      <footer className="footer">
        <p>
          ©{new Date().getFullYear()} Pokémon. ©1995 - {new Date().getFullYear()} Nintendo/Creatures
          Inc./GAME FREAK inc. TM, ®Nintendo.
        </p>
      </footer>
    </div>
  );
};
