// Constantes de UI — textos estáticos del Header y Footer
// Centralizados aquí para mantener los componentes limpios de datos hardcodeados

import pokeball from "../assets/pokeball.svg";

export const HEADER = {
  logoSrc: pokeball,
  title: "Pokédex",
};

export const FOOTER = {
  copyrightText: `©${new Date().getFullYear()} Pokémon. ©1995 - ${new Date().getFullYear()} Nintendo/Creatures Inc./GAME FREAK inc. TM, ®Nintendo.`,
};
