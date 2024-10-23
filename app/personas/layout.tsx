import { Metadata } from "next";

type PersonaViewLayoutProps = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Personas | MapAut",
};

export default function PersonasLayout({ children }: PersonaViewLayoutProps) {
  return children;
}
