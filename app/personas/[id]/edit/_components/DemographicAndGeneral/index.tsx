import { PersonaModel } from "@/app/@types/persona.type";
import DemographicCharacteristics from "@/app/_components/_personaSteps/DemographicCharacteristics";
import GeneralCharacteristics from "@/app/_components/_personaSteps/GeneralCharacteristics";
import { useState } from "react";

type Props = {
  persona: PersonaModel;
  onBack: () => void;
  onSave(form: {
    age: number;
    gender: string;
    name: string;
    imgLink: string;
    file: unknown;
    language: string;
    autism: string;
  }): void;
};

export function DemographicAndGeneral(props: Props) {
  const [demographicStep, setDemographicStep] = useState(1);

  const [demographic, setDemographic] = useState({
    age: props.persona.idade,
    gender: props.persona.genero,
    name: props.persona.nome,
    imgLink: props.persona.foto,
    file: null as unknown,
    language: props.persona.linguagem,
    autism: props.persona.nivel_autismo,
  });

  const previousStep = () => setDemographicStep((prev) => prev - 1);
  const nextStep = () => setDemographicStep((prev) => prev + 1);

  function handleDemographicBack() {
    setDemographic({
      age: props.persona.idade,
      gender: props.persona.genero,
      name: props.persona.nome,
      imgLink: props.persona.foto,
      file: null as unknown,
      language: props.persona.linguagem,
      autism: props.persona.nivel_autismo,
    });
    props.onBack();
  }

  function handleDemographicStep(form: {
    name: string;
    age: number;
    gender: string;
    imgFile: File;
    imgLink: string;
  }) {
    setDemographic((prev) => ({
      ...prev,
      age: form.age,
      gender: form.gender,
      imgLink: form.imgLink,
      name: form.name,
    }));
    nextStep();
  }

  function handleGeneralStep(form: { language: string; autism: string }) {
    setDemographic((prev) => ({
      ...prev,
      language: form.language,
      autism: form.autism,
    }));
    props.onSave(demographic)
  }

  if (demographicStep === 1) {
    return (
      <DemographicCharacteristics
        state="create"
        step="1/2"
        onReturn={handleDemographicBack}
        onNext={handleDemographicStep}
        form={{
          age: demographic.age,
          gender: demographic.gender,
          name: demographic.name,
          imgLink: demographic.imgLink,
        }}
      />
    );
  }
  return (
    <GeneralCharacteristics
      step="2/2"
      img={{
        link: demographic.imgLink,
        file: demographic.file as File,
      }}
      form={{
        language: demographic.language,
        autism: demographic.autism,
      }}
      state="create"
      onReturn={previousStep}
      onNext={handleGeneralStep}
    />
  );
}
