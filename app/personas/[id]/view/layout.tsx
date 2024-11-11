import { Metadata } from "next";

type PersonaViewLayoutProps = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Persona | PersonAut",
}

export default function PersonaViewLayout({
  children,
}: PersonaViewLayoutProps) {
  return children;
}
