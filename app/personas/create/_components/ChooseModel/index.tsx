"use client";

import PersonaModel1HelpModal from "@/app/_components/_modal/custom/PersonaModel1HelpModal";
import PersonaModel2HelpModal from "@/app/_components/_modal/custom/PersonaModel2HelpModal";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { Container } from "./styled";

type ChooseModelProps = {
  onChooseModel: (model: ModelType) => void;
};
type ModelType = "1" | "2";

const buttonStyle =
  "flex-1 flex flex-row justify-center items-center cursor-pointer relative select-none bg-guidaut-blue hover:bg-[#0a7dd8] rounded-md";

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
    <Container>
      <h1 className="text-slate-950">
        Escolha o modelo adequado para sua persona
      </h1>
      <div className="flex-1 flex flex-row gap-4 max-h-80 h-80">
        <div
          className={`${buttonStyle} `}
          onClick={(event) => onClickModel(event, "1")}
          id="button-model-1"
        >
          <IconButton
            onClick={(event) => onClickHelp(event, "1")}
            className="button"
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
          id="button-model-2"
        >
          <IconButton
            onClick={(event) => onClickHelp(event, "2")}
            className="button"
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
    </Container>
  );
}
