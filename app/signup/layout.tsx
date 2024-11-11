import { Metadata } from "next";

type SignUpLayoutProps = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: "PersonAut | Cadastro",
  description: "Cadastro no sistema",
};

export default function SignUpLayout({ children }: SignUpLayoutProps) {
  return children;
}
