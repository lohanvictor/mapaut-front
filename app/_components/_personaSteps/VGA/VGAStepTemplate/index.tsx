import { useMemo, useState } from "react";
import { CheckboxButton } from "../CheckboxButton";
import { Button, styled } from "@mui/material";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 16,
  borderRadius: 8,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
  },
}));

type Props = {
  onNextStep: (selected: boolean[]) => void;
  onReturn: () => void;
  textsSelected: boolean[];
  questions: [string, string][];
  title: string;
  step: string;
};

export function VGAStepTemplate(props: Props) {
  const [selected, setSelected] = useState(
    props.textsSelected.length
      ? props.textsSelected
      : Array.from({ length: props.questions.length }, () => false)
  );

  const progressValue = useMemo(() => {
    const [step, total] = props.step.split("/");
    return (Number(step) / Number(total)) * 100;
  }, []);

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
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-950">{props.title}</h1>
          <p className="m-0 text-slate-950">
            Caracterize a persona selecionando as opções abaixo
          </p>
        </div>

        <div className="flex flex-col-reverse items-start gap-1 h-fit">
          <div className="w-40">
            <BorderLinearProgress variant="determinate" value={progressValue} />
          </div>
          <span className="text-sm text-slate-950">Passos {props.step}</span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 max-h-full overflow-y-auto">
        {props.questions.map(([text1, text2], index) => (
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
