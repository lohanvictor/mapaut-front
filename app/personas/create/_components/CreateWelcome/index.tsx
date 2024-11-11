"use client";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

type Props = {
  onNext: () => void;
};

export function CreateWelcome(props: Props) {
  const route = useRouter();

  function handleBack() {
    route.replace("/personas");
  }

  return (
    <div className="max-h-full w-full overflow-y-auto flex flex-col gap-4">
      <div className="flex flex-row justify-start items-center">
        <button
          onClick={handleBack}
          className="flex flex-row justify-start items-center cursor-pointer p-2 hover:bg-slate-300 rounded-lg"
        >
          <ArrowBack className="text-slate-500" />
          <p className="text-slate-500 text-lg ml-2">Voltar</p>
        </button>
      </div>
      <h1 className="text-4xl font-bold text-center text-slate-950">
        Criar Persona
      </h1>
      <p className="text-left text-slate-950">
        Para a criação da persona, primeiramente você escolherá qual o modelo de
        persona para preencher os dados. Após a escolha, marcará algumas opções
        referentes a interação social, comunicação, comportamento e cognição da
        persona, sendo esses dados necessários para a criação do gráfico VGA
        (Visão Geral do Autista). Após isso, você poderá adicionar informações
        mais detalhadas sobre a persona dependendo do modelo de persona que
        escolher.
      </p>
      <p className="text-center text-slate-950">
        Para começar, clique no botão abaixo.
      </p>
      <Button
        className="bg-primary text-white font-bold py-2 px-4 rounded-full"
        onClick={props.onNext}
        variant="contained"
        id="button-start-create-persona"
      >
        Começar
      </Button>
    </div>
  );
}
