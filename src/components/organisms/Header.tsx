import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  logoSrc: string;
  title: string;
  children?: ReactNode;
};

export const Header = ({ logoSrc, title, children }: Props) => {
  return (
    <header className="header">
      <Link to="/" className="header__home">
        <img src={logoSrc} alt="" className="header__logo" />
        <p className="header__title">{title}</p>
      </Link>
      {children && <nav className="header__actions">{children}</nav>}
    </header>
  );
};
