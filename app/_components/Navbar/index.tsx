"use client";

import { usePathname, useRouter } from "next/navigation";
import { NavbarButton } from "./NavbarButton";
import { NAVBAR_ITEMS } from "@/app/_constants/navbar.constant";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";
import { useEffect, useMemo } from "react";
import { useSession } from "@/app/_contexts/sessionContext";
import { AccountCircle } from "@mui/icons-material";

export const Navbar = () => {
  const pathname = usePathname();
  const { login } = useSession();
  const route = useRouter();

  const isLogged = useMemo(
    () => Boolean(login.accessToken),
    [login.accessToken]
  );

  useEffect(() => {
    route.prefetch("/");
    route.prefetch("/personas");
    route.prefetch("/account");
  }, []);

  if (!isLogged) {
    return null;
  }

  return (
    <nav className="flex flex-col w-2/12 h-full bg-transparent gap-1 max-w-56 min-w-56 border-r border-gray-400">
      <div className="flex flex-col items-center justify-center w-full pb-4 pt-4">
        <span className="text-slate-950 text-4xl">
          <strong>MapAut</strong>
        </span>
      </div>
      <div className="pl-4 flex flex-col gap-2">
        {NAVBAR_ITEMS.map((item) =>
          !item.auth ? (
            <NavbarButton
              key={item.pathname}
              name={item.name}
              pathname={item.pathname}
              isActive={pathname === item.pathname}
            />
          ) : isLogged ? (
            <NavbarButton
              key={item.pathname}
              name={item.name}
              pathname={item.pathname}
              isActive={pathname === item.pathname}
            />
          ) : null
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-2 mt-auto p-2">
        {isLogged ? (
          <>
            <button
              onClick={() => route.push("/account")}
              className={`w-full flex flex-row gap-2 items-center justify-center p-2 rounded-md ${pathname === "/account" ? " text-white bg-sky-800" : " text-sky-800 hover:text-white hover:bg-sky-800"}`}
            >
              <AccountCircle />
              <strong>Conta</strong>
            </button>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
};
