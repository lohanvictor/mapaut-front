"use client";

import { createContext, use, useEffect, useMemo, useState } from "react";
import { LocalStorageUtils } from "../_utils/localStorage.util";
import { ACCESS_TOKEN_STORAGE_KEY } from "../_constants/keys.constants";

const mockFn = () =>
  new Promise<string>((resolve) => setTimeout(() => resolve(""), 1000));

type SessionContextProps = {
  handleLogin(email: string, password: string): Promise<void>;
  handleLogout(): Promise<void>;
  updateAccount(name: string, password: string): Promise<void>;
  login: {
    accessToken: string;
    name: string;
    email: string;
  };
  isLogged: boolean;
};

const SessionContext = createContext<SessionContextProps>(
  {} as SessionContextProps
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [login, setLogin] = useState({
    accessToken: "",
    name: "",
    email: "",
  });

  const isLogged = useMemo(() => !!login.accessToken, [login.accessToken]);

  useEffect(() => {
    const accessToken = LocalStorageUtils.get(ACCESS_TOKEN_STORAGE_KEY) || "";
    if (accessToken) {
      setLogin({ accessToken, name: "Arroz", email: "arroz@gmail.com" });
    }
  }, []);

  async function handleLogin(email: string, password: string) {
    const accessToken = "123456";

    LocalStorageUtils.set(ACCESS_TOKEN_STORAGE_KEY, accessToken);
    setLogin({ name: "Arroz", accessToken, email });
  }

  async function handleLogout() {
    LocalStorageUtils.delete(ACCESS_TOKEN_STORAGE_KEY);
    setLogin({ accessToken: "", name: "", email: "" });
  }

  async function updateAccount(name: string, password: string) {
    if (password) {
    }
    await mockFn();
  }

  return (
    <SessionContext.Provider
      value={{ handleLogin, handleLogout, login, isLogged, updateAccount }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = use(SessionContext);
  return context;
}
