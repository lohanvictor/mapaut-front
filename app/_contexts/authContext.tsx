"use client";

import { createContext, ReactNode, useEffect, useLayoutEffect } from "react";
import { useSession } from "./sessionContext";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext(undefined);

const publicRoutes = ["/login", "/signup"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLogged } = useSession();
  const route = useRouter();
  const pathname = usePathname();

  function handleRouteGuard() {
    const inPublicRoute = publicRoutes.includes(pathname);
    if (!isLogged && !inPublicRoute) {
      route.replace("/login");
    }
    if (isLogged && inPublicRoute) {
      route.replace("/");
    }
  }

  useEffect(() => {
    handleRouteGuard();
  }, [isLogged]);

  return (
    <AuthContext.Provider value={undefined}>{children}</AuthContext.Provider>
  );
}
