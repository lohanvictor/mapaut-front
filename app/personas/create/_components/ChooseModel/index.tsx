"use client";

import PersonaModel1HelpModal from "@/app/_components/_modal/custom/PersonaModel1HelpModal";
import PersonaModel2HelpModal from "@/app/_components/_modal/custom/PersonaModel2HelpModal";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { IconButton } from "@mui/material";
import { useState } from "react";

type ChooseModelProps = {
  onChooseModel: (model: ModelType) => void;
};
type ModelType = "1" | "2";

const buttonStyle =
  "flex-1 flex flex-row justify-center items-center cursor-pointer relative select-none bg-guidaut-blue hover:bg-[#0a7dd8] rounded-md";
const helpStyle = "absolute top-2 right-2 rounded-full bg-white w-12 h-12";

export default function ChooseModel(props: ChooseModelProps) {
  const [modalState, setModalState] = useState("none");

  function onClickHelp(
    event: React.MouseEvent<HTMLButtonElement>,
    model: ModelType
  ) {
    event.stopPropagation();
    setModalState(model);
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
          <span className="text-white text-2xl">
            <strong>Modelo 1</strong>
          </span>
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
          <span className="text-white text-2xl">
            <strong>Modelo 2</strong>
          </span>
        </div>
      </div>

      {modalState === "1" ? (
        <PersonaModel1HelpModal onClose={() => setModalState("none")} />
      ) : null}
      {modalState === "2" ? (
        <PersonaModel2HelpModal onClose={() => setModalState("none")} />
      ) : null}
    </div>
  );
}
