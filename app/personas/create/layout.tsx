import { Metadata } from "next";

type PersonsCreateLayoutProps = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: "PersonAut | Criando Persona",
  description: "Criar uma nova persona",
};

export default function PersonasCreateLayout({
  children,
}: PersonsCreateLayoutProps) {
  return children;
}
