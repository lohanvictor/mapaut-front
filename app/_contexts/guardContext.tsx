"use client";

import { createContext, ReactNode, useEffect } from "react";
import { useSession } from "./sessionContext";
import { usePathname, useRouter } from "next/navigation";

const GuardContext = createContext(undefined);

const publicRoutes = ["/login", "/signup", "/forgot-password"];

export function GuardProvider({ children }: { children: ReactNode }) {
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
    <GuardContext.Provider value={undefined}>{children}</GuardContext.Provider>
  );
}
