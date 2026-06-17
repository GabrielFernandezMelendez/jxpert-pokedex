//este atomo  nos ayuda a no repetir codigo y le llegan los datos en props de lo que va a dibujar en cada barra de las stats
// Principio aplicado: Single Responsibility — solo renderiza un stat
// Atomic Design — átomo, no importa otros componentes

type Props = {
  label: string;
  abbreviation: string;
  value: number;
  max?: number;
};

export const StatBar = ({ label, abbreviation, value, max = 255 }: Props) => {
  return (
    <li className="card__stat" aria-label={label}>
      <div className="stat__value">
        <p className="stat__name" aria-hidden="true">
          {abbreviation}
        </p>
        <p>{value}</p>
      </div>
      <progress value={value} max={max}></progress>
    </li>
  );
};
