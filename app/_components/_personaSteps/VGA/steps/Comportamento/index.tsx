import { VGA_COMPORTAMENTO } from "@/app/_constants/vga.constant";
import { VGAStepTemplate } from "../../VGAStepTemplate";

type Props = {
  onNextStep: (selected: boolean[]) => void;
  onReturn: () => void;
  textsSelected: boolean[];
};

export function ComportamentoStep(props: Props) {
  return (
    <VGAStepTemplate
      onNextStep={props.onNextStep}
      onReturn={props.onReturn}
      questions={VGA_COMPORTAMENTO}
      step="3/4"
      textsSelected={props.textsSelected}
      title="Comportamento"
    />
  );
}
