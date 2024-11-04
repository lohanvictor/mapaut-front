import { VGA_INTERACAO } from "@/app/_constants/vga.constant";
import { VGAStepTemplate } from "../../VGAStepTemplate";

type Props = {
  onNextStep: (selected: boolean[]) => void;
  onReturn: () => void;
  textsSelected: boolean[];
};

export function InteracaoStep(props: Props) {
  return (
    <VGAStepTemplate
      onNextStep={props.onNextStep}
      onReturn={props.onReturn}
      questions={VGA_INTERACAO}
      step="1/4"
      textsSelected={props.textsSelected}
      title="Interação Social"
    />
  );
}
