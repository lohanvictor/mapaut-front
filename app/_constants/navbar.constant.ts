import { NavbarItem } from "../_types/navbar.type";

export const NAVBAR_ITEMS: NavbarItem[] = [
  { name: "Home", pathname: "/" },
  // { name: "Criar Persona", pathname: "/personas/create" },
  { name: "Personas", pathname: "/personas", auth: true },
  { name: "Sobre", pathname: "/about" },
];
