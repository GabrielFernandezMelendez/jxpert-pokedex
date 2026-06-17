// Organismo — barra de búsqueda completa con input, dropdown de regiones y menú de ordenación
// En la web: sección superior del main con el buscador, selector de región y botón de sort
// Atomic Design — organismo, combina la molécula RegionDropdown y los átomos SortPill
// Principio aplicado: Composition — compone moléculas y átomos sin lógica de negocio

import type { Region } from "../../pokemon/domain/Region";
import type { SortOption } from "../../pokemon/domain/SortOption";
import { RegionDropdown } from "../molecules/RegionDropdown";
import { SortPill } from "../atoms/SortPill";

const sortOptions: { value: SortOption; label: string; displayText: string }[] = [
  { value: "default", label: "Default", displayText: "Default" },
  { value: "hp", label: "Health points", displayText: "Hp" },
  { value: "attack", label: "Attack", displayText: "At" },
  { value: "defense", label: "Defense", displayText: "Df" },
  { value: "special-attack", label: "Special attack", displayText: "SpA" },
  { value: "special-defense", label: "Special defense", displayText: "SpD" },
  { value: "speed", label: "Speed", displayText: "Spd" },
];

type Props = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  regions: readonly Region[];
  selectedRegion: Region;
  isRegionDropdownOpen: boolean;
  onRegionToggle: () => void;
  onRegionSelect: (region: Region) => void;
  sortBy: SortOption;
  isSortMenuOpen: boolean;
  onSortToggle: () => void;
  onSortSelect: (option: SortOption) => void;
};

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  regions,
  selectedRegion,
  isRegionDropdownOpen,
  onRegionToggle,
  onRegionSelect,
  sortBy,
  isSortMenuOpen,
  onSortToggle,
  onSortSelect,
}: Props) => {
  return (
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
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <RegionDropdown
        regions={regions}
        selectedRegion={selectedRegion}
        isOpen={isRegionDropdownOpen}
        onToggle={onRegionToggle}
        onSelect={onRegionSelect}
      />

      <button
        role="combobox"
        aria-haspopup="listbox"
        aria-controls="sort-list"
        aria-label="Sort by"
        aria-expanded={isSortMenuOpen}
        className="sort__button"
        onClick={onSortToggle}
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

      {isSortMenuOpen && (
        <article className="sort__wrapper">
          <h3 className="sort__title">Sort by</h3>
          <div className="sort__items" role="listbox" id="sort-list">
            {sortOptions.map((option) => (
              <SortPill
                key={option.value}
                label={option.label}
                displayText={option.displayText}
                isActive={sortBy === option.value}
                onSelect={() => onSortSelect(option.value)}
              />
            ))}
          </div>
        </article>
      )}
    </section>
  );
};
