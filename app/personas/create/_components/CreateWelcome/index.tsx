import { Button } from "@mui/material";

type Props = {
  onNext: () => void;
};

export function CreateWelcome(props: Props) {
  return (
    <div className="max-h-full w-full overflow-y-auto flex flex-col gap-4">
      <div className="max-h-full w-full overflow-y-auto flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-center text-slate-950">
          Criar Persona
        </h1>
        <p className="text-left text-slate-950">
          Para a criação da persona, primeiramente você marcará alguas opções
          referentes a interação social, comunicação, comportamento e cognição
          da persona, sendo esses dados necessários para a criação do gráfico
          VGA (Visão Geral do Autista). Após isso, você poderá adicionar
          informações mais detalhadas sobre a persona dependendo do modelo de
          persona que escolher.
        </p>
        <p className="text-center text-slate-950">
          Para começar, clique no botão abaixo.
        </p>
        <Button
          className="bg-primary text-white font-bold py-2 px-4 rounded-full"
          onClick={props.onNext}
          variant="contained"
        >
          Começar
        </Button>
      </div>
    </div>
  );
}
