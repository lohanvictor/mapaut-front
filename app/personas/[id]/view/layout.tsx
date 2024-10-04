import { Metadata } from "next";

type PersonaViewLayoutProps = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Persona | MapAut",
}

export default function PersonaViewLayout({
  children,
}: PersonaViewLayoutProps) {
  return children;
}
