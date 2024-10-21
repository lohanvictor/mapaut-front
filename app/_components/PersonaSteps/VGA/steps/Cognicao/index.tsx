import {
  VGA_COGNICAO,
  VGA_COMPORTAMENTO,
  VGA_COMUNICACAO,
  VGA_INTERACAO,
} from "@/app/_constants/vga.constant";
import { CheckboxButton } from "../../CheckboxButton";
import { useState } from "react";
import { Button } from "@mui/material";

type Props = {
  onNextStep: (selected: boolean[]) => void;
  onReturn: () => void;
  textsSelected: boolean[];
};

export function CognicaoStep(props: Props) {
  const [selected, setSelected] = useState(
    props.textsSelected.length
      ? props.textsSelected
      : Array.from({ length: VGA_INTERACAO.length }, () => false)
  );

  function handleButton(value: boolean, i: number) {
    setSelected((prev) => {
      const newSelected = [...prev];
      newSelected[i] = value;
      return newSelected;
    });
  }

  function handleNextStep() {
    props.onNextStep(selected);
  }

  return (
    <div className="max-h-full w-full overflow-y-auto flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-950">Cognição</h1>
        <p className="m-0 text-slate-950">
          Caracterize a persona selecionando as opções abaixo
        </p>
      </div>

      <div className="w-full flex flex-col gap-2 max-h-full overflow-y-auto">
        {VGA_COGNICAO.map(([text1, text2], index) => (
          <CheckboxButton
            key={index}
            texts={[text1, text2]}
            onClick={(value) => handleButton(value, index)}
            defaultValue={selected[index]}
          />
        ))}
      </div>

      <div className="w-full flex flex-row justify-between">
        <Button variant="contained" onClick={props.onReturn}>
          Voltar
        </Button>

        <Button variant="contained" onClick={handleNextStep}>
          Prosseguir
        </Button>
      </div>
    </div>
  );
}
