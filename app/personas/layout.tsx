import { Metadata } from "next";

type PersonaViewLayoutProps = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: "PersonAut | Personas",
};

export default function PersonasLayout({ children }: PersonaViewLayoutProps) {
  return children;
}
