import { useState } from "react";
import { InteracaoStep } from "./steps/Interacao";
import { ComunicacaoStep } from "./steps/Comunicacao";
import { ComportamentoStep } from "./steps/Comportamento";
import { CognicaoStep } from "./steps/Cognicao";

type Props = {
  onReturn: () => void;
  onNext: (vga: {
    interacao: boolean[];
    comunicacao: boolean[];
    comportamento: boolean[];
    cognicao: boolean[];
  }) => void;
  form?: {
    interacao: boolean[];
    comunicacao: boolean[];
    comportamento: boolean[];
    cognicao: boolean[];
  };
  initialStep?: number;
};

export function VGA(props: Props) {
  const [steps, setSteps] = useState({
    interacao: props.form?.interacao || ([] as boolean[]),
    comunicacao: props.form?.comunicacao || ([] as boolean[]),
    comportamento: props.form?.comportamento || ([] as boolean[]),
    cognicao: props.form?.cognicao || ([] as boolean[]),
  });
  const [currentStep, setCurrentStep] = useState(props.initialStep || 1);

  function nextStep() {
    setCurrentStep((prev) => prev + 1);
  }

  function previousStep() {
    setCurrentStep((prev) => prev - 1);
  }

  function handleInteracaoStepNext(interacao: boolean[]) {
    setSteps((prev) => ({ ...prev, interacao }));
    nextStep();
  }

  function handleComportamentoStepNext(comportamento: boolean[]) {
    setSteps((prev) => ({ ...prev, comportamento }));
    nextStep();
  }

  function handleCognicaoStepNext(cognicao: boolean[]) {
    setSteps((prev) => ({ ...prev, cognicao }));
    props.onNext({ ...steps, cognicao });
  }

  function handleComunicacaoStepNext(comunicacao: boolean[]) {
    setSteps((prev) => ({ ...prev, comunicacao }));
    nextStep();
  }

  return (
    <div className="max-h-full w-full overflow-y-auto flex flex-col gap-4">
      {/* {currentStep === 0 && (
        <div className="max-h-full w-full overflow-y-auto flex flex-col gap-4">
          
        </div>
      )} */}
      {currentStep === 1 && (
        <InteracaoStep
          onNextStep={handleInteracaoStepNext}
          onReturn={props.onReturn}
          textsSelected={steps.interacao}
        />
      )}
      {currentStep === 2 && (
        <ComunicacaoStep
          onNextStep={handleComunicacaoStepNext}
          onReturn={previousStep}
          textsSelected={steps.comunicacao}
        />
      )}
      {currentStep === 3 && (
        <ComportamentoStep
          onNextStep={handleComportamentoStepNext}
          onReturn={previousStep}
          textsSelected={steps.comportamento}
        />
      )}
      {currentStep === 4 && (
        <CognicaoStep
          onNextStep={handleCognicaoStepNext}
          onReturn={previousStep}
          textsSelected={steps.cognicao}
        />
      )}
    </div>
  );
}
