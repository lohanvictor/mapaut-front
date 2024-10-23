"use client";

import { createContext, use, useEffect, useMemo, useState } from "react";
import { LocalStorageUtils } from "../_utils/localStorage.util";
import { ACCESS_TOKEN_STORAGE_KEY } from "../_constants/keys.constants";

type SessionContextProps = {
  handleLogin(email: string, password: string): Promise<void>;
  handleLogout(): Promise<void>;
  login: {
    accessToken: string;
    name: string;
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
  });

  const isLogged = useMemo(() => !!login.accessToken, [login.accessToken]);

  useEffect(() => {
    const accessToken = LocalStorageUtils.get(ACCESS_TOKEN_STORAGE_KEY) || "";
    if (accessToken) {
      setLogin({ accessToken, name: "Arroz" });
    }
  }, []);

  async function handleLogin(email: string, password: string) {
    const accessToken = "123456";

    LocalStorageUtils.set(ACCESS_TOKEN_STORAGE_KEY, accessToken);
    setLogin({ name: "Arroz", accessToken });
  }

  async function handleLogout() {
    LocalStorageUtils.delete(ACCESS_TOKEN_STORAGE_KEY);
    setLogin({ accessToken: "", name: "" });
  }

  return (
    <SessionContext.Provider
      value={{ handleLogin, handleLogout, login, isLogged }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = use(SessionContext);
  return context;
}
