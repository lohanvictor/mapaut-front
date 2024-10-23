"use client";

import { usePathname } from "next/navigation";
import { NavbarButton } from "./NavbarButton";
import { NAVBAR_ITEMS } from "@/app/_constants/navbar.constant";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";
import { useMemo } from "react";
import { useSession } from "@/app/_contexts/sessionContext";
import { AccountCircle } from "@mui/icons-material";

export const Navbar = () => {
  const pathname = usePathname();
  const { login } = useSession();

  const isLogged = useMemo(
    () => Boolean(login.accessToken),
    [login.accessToken]
  );

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
            <button className="w-full flex flex-row gap-2 items-center justify-center text-sky-800 hover:text-white hover:bg-sky-800 p-2 rounded-md">
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
