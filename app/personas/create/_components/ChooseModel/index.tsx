"use client";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { IconButton } from "@mui/material";

type ChooseModelProps = {
  onChooseModel: (model: ModelType) => void;
};
type ModelType = "1" | "2";

export default function ChooseModel(props: ChooseModelProps) {
  const buttonStyle =
    "flex-1 flex flex-row justify-center items-center bg-zinc-400 hover:bg-zinc-500 cursor-pointer relative select-none";
  const helpStyle = "absolute top-1 right-1 rounded-full bg-white w-12 h-12";

  function onClickHelp(
    event: React.MouseEvent<HTMLButtonElement>,
    model: ModelType
  ) {
    event.stopPropagation();
  }

  function onClickModel(
    event: React.MouseEvent<HTMLDivElement>,
    model: ModelType
  ) {
    event.stopPropagation();
    props.onChooseModel(model);
  }

  return (
    <div className="flex-1 flex flex-col gap-6 w-full">
      <h1 className="text-slate-950">
        Escolha o modelo adequado para sua persona
      </h1>
      <div className="flex-1 flex flex-row gap-4 max-h-80 h-80">
        <div
          className={`${buttonStyle} `}
          onClick={(event) => onClickModel(event, "1")}
        >
          <IconButton
            onClick={(event) => onClickHelp(event, "1")}
            className={helpStyle}
          >
            <QuestionMarkIcon />
          </IconButton>
          <span>Modelo 1</span>
        </div>
        <div
          className={`${buttonStyle} `}
          onClick={(event) => onClickModel(event, "2")}
        >
          <IconButton
            onClick={(event) => onClickHelp(event, "2")}
            className={helpStyle}
          >
            <QuestionMarkIcon />
          </IconButton>
          <span>Modelo 2</span>
        </div>
      </div>
    </div>
  );
}
