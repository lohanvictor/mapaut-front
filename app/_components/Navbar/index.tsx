"use client";

import { usePathname } from "next/navigation";
import { NavbarButton } from "./NavbarButton";
import { NAVBAR_ITEMS } from "@/app/_constants/navbar.constant";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-2/12 h-full bg-sky-950 gap-1 max-w-56 min-w-56">
      <div className="flex flex-col items-center justify-center w-full h-20 bg-sky-950  ">
        <span className="text-white">MapAut</span>
      </div>
      {NAVBAR_ITEMS.map((item) => (
        <NavbarButton
          key={item.pathname}
          name={item.name}
          pathname={item.pathname}
          isActive={pathname === item.pathname}
        />
      ))}
    </nav>
  );
};
