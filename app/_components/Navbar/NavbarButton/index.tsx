// "use client";

import Link from "next/link";

type NavbarButtonProps = {
  name: string;
  pathname: string;
  isActive?: boolean;
};

export const NavbarButton = (props: NavbarButtonProps) => {
  return (
    <Link
      href={props.pathname}
      className={`flex flex-col items-center justify-center w-full h-10 bg-sky-500 hover:bg-sky-400 cursor-pointer ${
        props.isActive ? "bg-sky-800" : ""
      }`}
    >
      <span className="text-white">{props.name}</span>
    </Link>
  );
};
