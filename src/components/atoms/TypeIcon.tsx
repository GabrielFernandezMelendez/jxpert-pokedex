// Átomo — renderiza el icono de un tipo de Pokémon
//  Single Responsibility — solo muestra un icono de tipo
// Atomic Design — átomo, no importa otros componentes
//no importamos las imagenes directamente si no que lo hacemos luego desde el fichero main para que no este acoplado a ninguna fuente de datos

type Props = {
  typeName: string;
  iconSrc: string;
  variant?: "primary" | "secondary";
};

//variant primary por default por que algunos pokemon solo tienen un tipo
export const TypeIcon = ({ typeName, iconSrc, variant = "primary" }: Props) => {
  return <img src={iconSrc} className="card__type" alt={`${typeName} ${variant} type`} />;
};
