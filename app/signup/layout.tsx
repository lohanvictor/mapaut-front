import { Metadata } from "next";

type SignUpLayoutProps = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: "MapAut | Cadastro",
  description: "Cadastro no sistema",
};

export default function SignUpLayout({ children }: SignUpLayoutProps) {
  return children;
}
