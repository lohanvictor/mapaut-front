"use client";

import { createContext, use, useState } from "react";
import { LocalStorageUtils } from "../_utils/localStorage.util";

const accessTokenStorageKey = "mapaut:accessToken";

type SessionContextProps = {
  handleLogin(email: string, password: string): Promise<void>;
  handleLogout(): Promise<void>;
  login: {
    accessToken: string;
    name: string;
  };
};

const SessionContext = createContext<SessionContextProps>(
  {} as SessionContextProps
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [login, setLogin] = useState(() => {
    const accessToken = LocalStorageUtils.get(accessTokenStorageKey) || "";
    return { accessToken, name: "" };
  });

  async function handleLogin(email: string, password: string) {
    const accessToken = "123456";

    LocalStorageUtils.set(accessTokenStorageKey, accessToken);
    setLogin({ name: "Arroz", accessToken });
  }

  async function handleLogout() {
    LocalStorageUtils.delete(accessTokenStorageKey);
    setLogin({ accessToken: "", name: "" });
  }

  return (
    <SessionContext.Provider value={{ handleLogin, handleLogout, login }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = use(SessionContext);
  return context;
}
