import { VGA_COGNICAO } from "@/app/_constants/vga.constant";
import { VGAStepTemplate } from "../../VGAStepTemplate";

type Props = {
  onNextStep: (selected: boolean[]) => void;
  onReturn: () => void;
  textsSelected: boolean[];
};

export function CognicaoStep(props: Props) {
  return (
    <VGAStepTemplate
      onNextStep={props.onNextStep}
      onReturn={props.onReturn}
      questions={VGA_COGNICAO}
      step="4/4"
      textsSelected={props.textsSelected}
      title="Cognição"
    />
  );
}
