// "use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavbarButtonProps = {
  name: string;
  pathname: string;
  isActive?: boolean;
};

export const NavbarButton = (props: NavbarButtonProps) => {
  const route = useRouter();
  const path = usePathname();

  function handleClick() {
    if (props.pathname === path) {
      return;
    }
    route.push(props.pathname);
  }

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col items-center justify-center w-full h-10 hover:bg-sky-200 cursor-pointer ${
        props.isActive ? "bg-sky-800" : "bg-transparent"
      }`}
    >
      <span
        className={props.isActive ? "text-white" : "text-sky-800 font-semibold"}
      >
        {props.name}
      </span>
    </button>
  );
};
