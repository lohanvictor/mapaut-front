import { Metadata } from "next";

type LoginLayoutProps = {
  children?: React.ReactNode;
};

export const metadata: Metadata = {
  title: "PersonAut | Login",
  description: "Login no sistema",
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return children;
}
