import { useState } from "react";

import { typeIcons } from "../constants/typeIcons";
import { HEADER, FOOTER } from "../constants/ui";
import { type Region, regions } from "../pokemon/domain/Region";

import { usePokemons } from "../hooks/usePokemons";
import { usePokemonSearch } from "../hooks/usePokemonSearch";
import { usePokemonSort } from "../hooks/usePokemonSort";
import { useDropdown } from "../hooks/useDropdown";
import { useFavorites } from "../hooks/useFavorites";

import { LocalStorageFavoriteRepository } from "../pokemon/infrastructure/LocalStorageFavoriteRepository";

import { Header } from "../components/organisms/Header";
import { Footer } from "../components/organisms/Footer";
import { SearchBar } from "../components/organisms/SearchBar";
import { PokemonGrid } from "../components/organisms/PokemonGrid";

import { Link } from "react-router-dom";

const favoriteRepository = new LocalStorageFavoriteRepository();

export const PokedexPage = () => {
  const [region, setRegion] = useState<Region>("kanto");

  const { pokemons, isLoading } = usePokemons(region);
  const { searchQuery, setSearchQuery, filteredPokemons, setFilteredPokemons, isFiltering } =
    usePokemonSearch(pokemons);
  const { sortBy, setSortBy } = usePokemonSort(filteredPokemons, setFilteredPokemons);
  const { favoriteIds, toggleFavorite } = useFavorites(favoriteRepository);

  const regionDropdown = useDropdown();
  const sortMenu = useDropdown();

  return (
    <div className="layout">
      <Header logoSrc={HEADER.logoSrc} title={HEADER.title}>
        <Link to="/favorites" className="header__favorites-btn">
          ★ Favorites
        </Link>
      </Header>

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
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      </main>

      <Footer copyrightText={FOOTER.copyrightText} />
    </div>
  );
};
