import pokeball from "./assets/pokeball.svg";
import { useState } from "react";

import { typeIcons } from "./constants/typeIcons";
import { HEADER, FOOTER } from "./constants/ui";
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
