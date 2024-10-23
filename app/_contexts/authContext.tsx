"use client";

import { createContext, ReactNode, useEffect, useLayoutEffect } from "react";
import { useSession } from "./sessionContext";
import { useRouter } from "next/navigation";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isLogged } = useSession();
  const route = useRouter();

//   useLayoutEffect(() => {
//     if (!isLogged) {
//       return route.replace("/");
//     }
//   }, [isLogged]);

  return (
    <AuthContext.Provider value={undefined}>{children}</AuthContext.Provider>
  );
}
