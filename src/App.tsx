import { useEffect, useState } from "react";
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

// Dominio — tipos y constantes del negocio
import type { Pokemon } from "./pokemon/domain/Pokemon";
import type { SortOption } from "./pokemon/domain/SortOption";
import { type Region, regions } from "./pokemon/domain/Region";

// Arquitectura Hexagonal — casos de uso e infraestructura
import { ApiPokemonRepository } from "./pokemon/infrastructure/ApiPokemonRepository";
import { GetPokemons } from "./pokemon/application/GetPokemons";
import { FilterPokemons } from "./pokemon/application/FilterPokemons";
import { SortPokemons } from "./pokemon/application/SortPokemons";

// Atomic Design — componentes de UI
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import { SearchBar } from "./components/organisms/SearchBar";
import { PokemonGrid } from "./components/organisms/PokemonGrid";

// Instancias de casos de uso — fuera del componente para no recrearlas en cada render
const repository = new ApiPokemonRepository();
const getPokemons = new GetPokemons(repository);
const filterPokemons = new FilterPokemons();
const sortPokemons = new SortPokemons();

// Mapa de iconos por tipo — dato de presentación, no de dominio
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

  // Fetch — obtiene pokémons de la región seleccionada
  useEffect(() => {
    const loadPokemons = async () => {
      setIsLoading(true);
      setIsFiltering(true);
      const result = await getPokemons.execute(region);
      setPokemons(result);
      setFilteredPokemons(result);
      setIsLoading(false);
    };
    loadPokemons();
  }, [region]);

  // Filter — filtra por nombre o tipo
  useEffect(() => {
    const results = filterPokemons.execute(pokemons, searchQuery);
    setFilteredPokemons(results);
    setIsFiltering(false);
  }, [pokemons[0]?.id, searchQuery]);

  // Sort — ordena los resultados filtrados
  useEffect(() => {
    const sorted = sortPokemons.execute(filteredPokemons, sortBy);
    setFilteredPokemons(sorted);
  }, [filteredPokemons[0]?.id, sortBy]);

  return (
    <div className="layout">
      <Header logoSrc={pokeball} title="Pokédex" />

      <main className="container">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          regions={regions}
          selectedRegion={region}
          isRegionDropdownOpen={isRegionDropdownOpen}
          onRegionToggle={() =>
            setIsRegionDropdownOpen((prev) => {
              if (isSortMenuOpen) setIsSortMenuOpen(false);
              return !prev;
            })
          }
          onRegionSelect={(r) => {
            setRegion(r);
            setIsRegionDropdownOpen(false);
          }}
          sortBy={sortBy}
          isSortMenuOpen={isSortMenuOpen}
          onSortToggle={() =>
            setIsSortMenuOpen((prev) => {
              if (isRegionDropdownOpen) setIsRegionDropdownOpen(false);
              return !prev;
            })
          }
          onSortSelect={(option) => {
            setSortBy(option);
            setIsSortMenuOpen(false);
          }}
        />

        <PokemonGrid
          pokemons={filteredPokemons}
          typeIcons={typeIcons}
          isLoading={isLoading}
          isFiltering={isFiltering}
          searchQuery={searchQuery}
        />
      </main>

      <Footer
        copyrightText={`©${new Date().getFullYear()} Pokémon. ©1995 - ${new Date().getFullYear()} Nintendo/Creatures Inc./GAME FREAK inc. TM, ®Nintendo.`}
      />
    </div>
  );
};
