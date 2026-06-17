// Organismo — cabecera fija de la aplicación con logo y título, es un organismo por ser una seccion "grande" , forma parte de la estructura y identidad  de la pagina
// En la web: barra superior con el icono de pokeball y el texto "Pokédex"
// Atomic Design — organismo, sección completa e independiente de la página

type Props = {
  logoSrc: string;
  title: string;
};

export const Header = ({ logoSrc, title }: Props) => {
  return (
    <header className="header">
      <img src={logoSrc} alt="" className="header__logo" />
      <p className="header__title">{title}</p>
    </header>
  );
};
