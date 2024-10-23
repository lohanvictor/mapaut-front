import { VGA_COMUNICACAO, VGA_INTERACAO } from "@/app/_constants/vga.constant";
import { CheckboxButton } from "../../CheckboxButton";
import { useState } from "react";
import { Button } from "@mui/material";
import { VGAStepTemplate } from "../../VGAStepTemplate";

type Props = {
  onNextStep: (selected: boolean[]) => void;
  onReturn: () => void;
  textsSelected: boolean[];
};

export function ComunicacaoStep(props: Props) {
  return (
    <VGAStepTemplate
      onNextStep={props.onNextStep}
      onReturn={props.onReturn}
      questions={VGA_COMUNICACAO}
      step="2/4"
      textsSelected={props.textsSelected}
      title="Comunicação"
    />
  );
}
