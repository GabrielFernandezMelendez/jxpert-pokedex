// Organismo — pie de página con información de copyright
// En la web: barra inferior oscura con el texto legal de Nintendo/Pokémon
// Atomic Design — organismo, sección completa e independiente de la página
// Consistencia — recibe contenido por props igual que Header

type Props = {
  copyrightText: string;
};

export const Footer = ({ copyrightText }: Props) => {
  return (
    <footer className="footer">
      <p>{copyrightText}</p>
    </footer>
  );
};
