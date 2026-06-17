// Custom Hook — gestiona el estado abierto/cerrado de un dropdown
// En la app: se usa para el dropdown de regiones y el menú de sort
// Principio aplicado: DRY — la misma lógica de abrir/cerrar reutilizada en dos sitios
// Principio aplicado: Single Responsibility — solo gestiona visibilidad

import { useState } from "react";

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Abre o cierra el dropdown
  const toggle = () => setIsOpen((prev) => !prev);

  // Cierra el dropdown
  const close = () => setIsOpen(false);

  return { isOpen, toggle, close };
};
