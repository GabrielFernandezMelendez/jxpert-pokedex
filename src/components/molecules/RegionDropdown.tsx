// Molécula — dropdown que permite al usuario seleccionar una región Pokemon
// En la web: aparece dentro de la barra de búsqueda, a la derecha del input
// Atomic Design — molécula, combina elementos HTML pero no otros componentes propios
// Principio aplicado: Single Responsibility — solo gestiona la selección de región

import type { Region } from "../../pokemon/domain/Region";

type Props = {
  regions: readonly Region[];
  selectedRegion: Region;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (region: Region) => void;
};

export const RegionDropdown = ({ regions, selectedRegion, isOpen, onToggle, onSelect }: Props) => {
  return (
    <div className="dropdown">
      <button
        role="combobox"
        aria-haspopup="listbox"
        aria-controls="reg-list"
        aria-label="Select region"
        aria-expanded={isOpen}
        className={`dropdown__button ${isOpen ? "active" : ""}`}
        onClick={onToggle}
      >
        {selectedRegion}
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
        hidden={!isOpen}
        className={`dropdown__list ${!isOpen ? "hide" : ""}`}
      >
        {regions.map((region) => (
          <li
            key={region}
            role="radio"
            aria-checked={selectedRegion === region}
            tabIndex={0}
            className={selectedRegion === region ? "active" : ""}
            onClick={() => onSelect(region)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSelect(region);
              }
            }}
          >
            {region}
          </li>
        ))}
      </ol>
    </div>
  );
};
