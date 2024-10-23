import { Metadata } from "next";

type SignUpLayoutProps = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: "MapAut | Registro",
  description: "Registro no sistema",
};

export default function SignUpLayout({ children }: SignUpLayoutProps) {
  return children;
}
