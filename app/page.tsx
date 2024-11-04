"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();

  function redirectTo(path: string) {
    route.push(path);
  }

  return (
    <div className="flex flex-col w-full h-full gap-4 p-6">
      <h1 className="font-sans text-6xl text-slate-950">MapAut</h1>
      <p className="font-sans text-2xl text-slate-950">
        Seja bem-vindo ao MapAut. O que você deseja fazer?
      </p>

      <div className="w-full gap-4 grid grid-cols-3">
        <button
          onClick={() => redirectTo("/personas")}
          className="flex-1 flex flex-row justify-center items-center cursor-pointer relative select-none h-40 bg-guidaut-blue hover:bg-[#0a7dd8] rounded-md"
        >
          <span className="text-white text-2xl">Ver personas</span>
        </button>
        <button
          onClick={() => redirectTo("/personas/create")}
          className="flex-1 flex flex-row justify-center items-center cursor-pointer relative select-none h-40 bg-guidaut-blue hover:bg-[#0a7dd8] rounded-md"
        >
          <span className="text-white text-2xl">Criar nova persona</span>
        </button>
        <button
          onClick={() => redirectTo("/about")}
          className="flex-1 flex flex-row justify-center items-center cursor-pointer relative select-none h-40 bg-guidaut-blue hover:bg-[#0a7dd8] rounded-md"
        >
          <span className="text-white text-2xl">Sobre o sistema</span>
        </button>
      </div>
    </div>
  );
}
