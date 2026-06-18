// Organismo — cabecera fija de la aplicación con logo, título y acciones opcionales
// En la web: barra superior con el icono de pokeball, el texto "Pokédex" y navegación

import type { ReactNode } from "react";

type Props = {
  logoSrc: string;
  title: string;
  children?: ReactNode;
};

export const Header = ({ logoSrc, title, children }: Props) => {
  return (
    <header className="header">
      <img src={logoSrc} alt="" className="header__logo" />
      <p className="header__title">{title}</p>
      {children && <nav className="header__actions">{children}</nav>}
    </header>
  );
};
