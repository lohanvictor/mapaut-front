"use client";

import { usePathname } from "next/navigation";
import { NavbarButton } from "./NavbarButton";
import { NAVBAR_ITEMS } from "@/app/_constants/navbar.constant";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-2/12 h-full bg-transparent gap-1 max-w-56 min-w-56 border-r border-gray-400">
      <div className="flex flex-col items-center justify-center w-full pb-4 pt-4">
        <span className="text-slate-950 text-4xl">
          <strong>MapAut</strong>
        </span>
      </div>
      <div className="pl-4 flex flex-col gap-2">
        {NAVBAR_ITEMS.map((item) => (
          <NavbarButton
            key={item.pathname}
            name={item.name}
            pathname={item.pathname}
            isActive={pathname === item.pathname}
          />
        ))}
      </div>
    </nav>
  );
};
