import { VGA_INTERACAO } from "@/app/_constants/vga.constant";
import { CheckboxButton } from "../../CheckboxButton";
import { useState } from "react";
import { Button } from "@mui/material";

type Props = {
  onNextStep: () => void;
  textsSelected?: boolean[];
};

export function InteracaoStep(props: Props) {
  const [selected, setSelected] = useState(
    props.textsSelected ??
      Array.from({ length: VGA_INTERACAO.length }, () => false)
  );

  function handleButton(value: boolean, i: number) {
    setSelected((prev) => {
      const newSelected = [...prev];
      newSelected[i] = value;
      return newSelected;
    });
  }

  return (
    <div className="max-h-full w-full overflow-y-auto flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-950">Interação Social</h1>
        <p className="m-0 text-slate-950">
          Caracterize a persona selecionando as opções abaixo
        </p>
      </div>

      <div className="w-full flex flex-col gap-2 max-h-full overflow-y-auto">
        {VGA_INTERACAO.map(([text1, text2], index) => (
          <CheckboxButton
            key={index}
            texts={[text1, text2]}
            onClick={(value) => handleButton(value, index)}
            defaultValue={selected[index]}
          />
        ))}
      </div>

      <div className="w-full flex flex-row justify-end">
        {/* <Button variant="contained" onClick={props.onReturn}>
          Voltar
        </Button> */}

        <Button variant="contained" onClick={props.onNextStep}>
          Prosseguir
        </Button>
      </div>
    </div>
  );
}
