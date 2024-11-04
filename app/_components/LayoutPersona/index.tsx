import { styled } from "@mui/material";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import React, { useMemo } from "react";

type StepLayoutProps = {
  children?: React.ReactNode;
  step: string;
  title: string;
  description: string;
};

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 16,
  borderRadius: 8,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
  },
}));

export default function LayoutPersona(props: StepLayoutProps) {
  const progressValue = useMemo(() => {
    const [step, total] = props.step.split("/");
    return (Number(step) / Number(total)) * 100;
  }, [props.step]);

  return (
    <div className="max-h-full w-full overflow-y-auto flex flex-col gap-4">
      <div className="w-full flex flex-row justify-between">
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-950">{props.title}</h1>
          <p className="m-0 text-slate-950">{props.description}</p>
        </div>
        <div className="flex flex-col-reverse items-start gap-1 h-fit">
          <div className="w-40">
            <BorderLinearProgress variant="determinate" value={progressValue} />
          </div>
          <span className="text-sm text-slate-950">Passos {props.step}</span>
        </div>
      </div>
      {props.children}
    </div>
  );
}
