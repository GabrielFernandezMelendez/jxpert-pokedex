// Átomo — botón de opción de ordenación
// Principio aplicado: Single Responsibility — solo renderiza una opción de sort
// Principio aplicado: Open-Closed — si se añade una nueva opción de sort se crea otra instancia, no se modifica este componente
//la pill para selecionar un  filtro por caracteristica (hp,deffence,attack etc)

type Props = {
  label: string;
  displayText: string;
  isActive: boolean;
  onSelect: () => void;
};

export const SortPill = ({ label, displayText, isActive, onSelect }: Props) => {
  return (
    <span
      role="radio"
      aria-label={label}
      tabIndex={0}
      className={`sort__pill ${isActive ? "active" : ""}`}
      aria-checked={isActive}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSelect();
        }
      }}
    >
      {displayText}
    </span>
  );
};
