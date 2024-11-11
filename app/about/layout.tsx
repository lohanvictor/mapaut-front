import { Metadata } from "next";

type PersonaViewLayoutProps = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: "PersonAut | Sobre",
};

export default function AboutLayout({ children }: PersonaViewLayoutProps) {
  return children;
}
