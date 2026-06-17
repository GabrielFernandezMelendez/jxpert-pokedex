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
import { useState } from "react";

// Dominio
import { type Region, regions } from "./pokemon/domain/Region";

// Custom Hooks — toda la lógica de estado y efectos vive aquí
import { usePokemons } from "./hooks/usePokemons";
import { usePokemonSearch } from "./hooks/usePokemonSearch";
import { usePokemonSort } from "./hooks/usePokemonSort";
import { useDropdown } from "./hooks/useDropdown";

// Atomic Design — componentes de UI
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import { SearchBar } from "./components/organisms/SearchBar";
import { PokemonGrid } from "./components/organisms/PokemonGrid";

//iconos y constantes
// Constantes — datos estáticos de UI
import { typeIcons } from "./constants/typeIcons";
import { HEADER, FOOTER } from "./constants/ui";

export const App = () => {
  // Estado de la región seleccionada — vive aquí porque alimenta a usePokemons
  const [region, setRegion] = useState<Region>("kanto");

  // Hook de fetch — carga pokémons de la región seleccionada
  const { pokemons, isLoading } = usePokemons(region);

  // Hook de búsqueda — filtra pokémons por nombre o tipo
  const { searchQuery, setSearchQuery, filteredPokemons, setFilteredPokemons, isFiltering } =
    usePokemonSearch(pokemons);

  // Hook de ordenación — ordena los pokémons filtrados por stat
  const { sortBy, setSortBy } = usePokemonSort(filteredPokemons, setFilteredPokemons);

  // Hooks de dropdowns — gestionan abrir/cerrar cada menú
  const regionDropdown = useDropdown();
  const sortMenu = useDropdown();

  return (
    <div className="layout">
      <Header logoSrc={HEADER.logoSrc} title={HEADER.title} />

      <main className="container">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          regions={regions}
          selectedRegion={region}
          isRegionDropdownOpen={regionDropdown.isOpen}
          onRegionToggle={() => {
            if (sortMenu.isOpen) sortMenu.close();
            regionDropdown.toggle();
          }}
          onRegionSelect={(r) => {
            setRegion(r);
            regionDropdown.close();
          }}
          sortBy={sortBy}
          isSortMenuOpen={sortMenu.isOpen}
          onSortToggle={() => {
            if (regionDropdown.isOpen) regionDropdown.close();
            sortMenu.toggle();
          }}
          onSortSelect={(option) => {
            setSortBy(option);
            sortMenu.close();
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

      <Footer copyrightText={FOOTER.copyrightText} />
    </div>
  );
};
