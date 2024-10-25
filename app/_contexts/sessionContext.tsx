"use client";

import { createContext, use, useEffect, useMemo, useState } from "react";
import cookies from "js-cookie";
import { ACCESS_TOKEN_STORAGE_KEY } from "../_constants/keys.constants";
import api from "../_lib/api";
import { LoginResponse } from "../@types/login.type";

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

  async function getUserByToken(token: string) {
    await api.get("/api/register", {params: {token}});

  }

  useEffect(() => {
    const accessToken = cookies.get(ACCESS_TOKEN_STORAGE_KEY);
    if (accessToken) {
      getUserByToken(accessToken)
      setLogin({ accessToken, name: "Arroz", email: "arroz@gmail.com" });
    }
  }, []);

  async function handleLogin(email: string, password: string) {
    const {
      data: { name, token: accessToken },
    } = await api.post<LoginResponse>("/api/login", {
      email,
      password,
    });

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    cookies.set(ACCESS_TOKEN_STORAGE_KEY, accessToken, { expires: 7 });
    setLogin({ name, accessToken, email });
  }

  async function handleLogout() {
    await api.delete("/api/login");
    cookies.remove(ACCESS_TOKEN_STORAGE_KEY);
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
