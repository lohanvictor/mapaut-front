"use client";

import { createContext, use, useMemo, useState } from "react";
import cookies from "js-cookie";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  EMAIL_STORAGE_KEY,
  NAME_STORAGE_KEY,
  UID_STORAGE_KEY,
} from "../_constants/keys.constants";
import api from "../_lib/api";
import { LoginResponse } from "../_types/login.type";

type SessionContextProps = {
  handleLogin(email: string, password: string): Promise<void>;
  handleLogout(): Promise<void>;
  updateAccount(name: string, password: string): Promise<void>;
  handleDeleteAccount(): Promise<void>;
  login: {
    accessToken: string;
    name: string;
    email: string;
    uid: string;
  };
  isLogged: boolean;
};

const SessionContext = createContext<SessionContextProps>(
  {} as SessionContextProps
);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [login, setLogin] = useState({
    accessToken: cookies.get(ACCESS_TOKEN_STORAGE_KEY) || "",
    name: cookies.get(NAME_STORAGE_KEY) || "",
    email: cookies.get(EMAIL_STORAGE_KEY) || "",
    uid: cookies.get(UID_STORAGE_KEY) || "",
  });
  const isLogged = useMemo(() => !!login.accessToken, [login.accessToken]);

  function resetToken() {
    cookies.remove(ACCESS_TOKEN_STORAGE_KEY);
    cookies.remove(EMAIL_STORAGE_KEY);
    cookies.remove(NAME_STORAGE_KEY);
    cookies.remove(UID_STORAGE_KEY);
  }

  function resetLogin() {
    setLogin({ accessToken: "", name: "", email: "", uid: "" });
  }

  async function handleLogin(email: string, password: string) {
    const {
      data: { name, token: accessToken, uid },
    } = await api.post<LoginResponse>("/api/login", {
      email,
      password,
    });

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
    cookies.set(ACCESS_TOKEN_STORAGE_KEY, accessToken, { expires: 7 });
    cookies.set(EMAIL_STORAGE_KEY, email, { expires: 7 });
    cookies.set(NAME_STORAGE_KEY, name, { expires: 7 });
    cookies.set(UID_STORAGE_KEY, uid, { expires: 7 });
    setLogin({ name, accessToken, email, uid });
  }

  async function handleLogout() {
    await api.delete("/api/login");
    resetToken();
    resetLogin();
  }

  async function updateAccount(name: string, password: string) {
    await api.put("/api/register/" + login.uid, {
      name,
      password,
    });

    cookies.set(NAME_STORAGE_KEY, name, { expires: 7 });
    setLogin((login) => ({
      ...login,
      name,
    }));
  }

  async function handleDeleteAccount() {
    await api.delete("/api/register/" + login.uid);
    resetToken();
    resetLogin();
  }

  return (
    <SessionContext.Provider
      value={{
        handleLogin,
        handleLogout,
        login,
        isLogged,
        updateAccount,
        handleDeleteAccount,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = use(SessionContext);
  return context;
}
