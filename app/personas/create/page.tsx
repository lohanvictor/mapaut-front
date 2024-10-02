"use client";

import { useMemo, useState } from "react";
import ChooseModel from "./_components/ChooseModel";
import DemographicCharacteristics from "../../_components/PersonaSteps/DemographicCharacteristics";
import GeneralCharacteristics from "@/app/_components/PersonaSteps/GeneralCharacteristics";
import StressActivities from "@/app/_components/PersonaSteps/StressActivities";
import { PersonaModel } from "@/app/@types/persona.type";
import CalmActivities from "@/app/_components/PersonaSteps/CalmActivities";
import ViewDetailsPersona from "@/app/_components/DetailsPersona/ViewDetailsPersona";
import AboutPersona from "@/app/_components/PersonaSteps/AboutPersona";
export default function PersonasCreate() {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  const textStep = useMemo(() => {
    return `${currentStep}/${totalSteps}`;
  }, [currentStep, totalSteps]);

  const [img, setImg] = useState({
    file: null as unknown,
    link: "",
  });
  const [personaModel, setPersonaModel] = useState<PersonaModel>({
    nome: "",
    idade: 0,
    genero: "",
    linguagem: "",
    sensibilidade_som: false,
    nivel_autismo: "",
    modelo: "",
    atividades_estressam: [],
    atividades_acalmam: [],
    manias: [],
    aspectos_software: [],
    aspectos_sociais: [],
    sobre: "",
    foto: "",
    id: "",
  });

  function onChooseModel(model: string) {
    setPersonaModel((prev) => ({ ...prev, modelo: model }));
    setTotalSteps(model === "1" ? 7 : 3);
    setCurrentStep(1);
  }

  function onNextDemoCharacteristics(form: {
    name: string;
    age: number;
    gender: string;
    imgFile: File;
    imgLink: string;
  }) {
    setPersonaModel((prev) => ({
      ...prev,
      nome: form.name,
      idade: form.age,
      genero: form.gender,
    }));
    setImg({
      file: form.imgFile,
      link: form.imgLink,
    });
    setCurrentStep(2);
  }

  function onReturnGeneralCharacteristics() {
    setCurrentStep(1);
  }

  function onNextGeneralCharacteristics(form: {
    language: string;
    autism: string;
  }) {
    setPersonaModel((prev) => ({
      ...prev,
      linguagem: form.language,
      nivel_autismo: form.autism,
    }));

    setCurrentStep(3);
  }

  function onReturnStressActivities() {
    setCurrentStep(2);
  }

  function onNextStressActivites(activities: string[]) {
    setPersonaModel((prev) => ({
      ...prev,
      atividades_estressam: activities,
    }));
    setCurrentStep(4);
  }

  function onReturnCalmActivities() {
    setCurrentStep(3);
  }

  function onReturnAboutPersona() {
    setCurrentStep(2);
  }

  function onNextAboutPersona(text: string) {
    setPersonaModel((prev) => ({
      ...prev,
      sobre: text,
    }));
  }

  return (
    <div className="flex-1 flex flex-col items-center p-6">
      {/* DEBUG DE SENIOR */}
      <span className="text-black">{JSON.stringify(personaModel)}</span>

      {currentStep === 0 && <ChooseModel onChooseModel={onChooseModel} />}
      {currentStep === 1 && (
        <DemographicCharacteristics
          state="create"
          step={textStep}
          onReturn={() => null}
          onNext={onNextDemoCharacteristics}
          form={{
            age: personaModel.idade,
            gender: personaModel.genero,
            name: personaModel.nome,
            imgLink: img.link,
          }}
        />
      )}
      {currentStep === 2 && (
        <GeneralCharacteristics
          step={textStep}
          img={{ link: img.link, file: img.file as File }}
          form={{
            language: personaModel.linguagem,
            autism: personaModel.nivel_autismo,
          }}
          state="create"
          onReturn={onReturnGeneralCharacteristics}
          onNext={onNextGeneralCharacteristics}
        />
      )}
      {currentStep === 3 && personaModel.modelo === "1" ? (
        <StressActivities
          step={textStep}
          activities={personaModel.atividades_estressam}
          onReturn={onReturnStressActivities}
          onNext={onNextStressActivites}
        />
      ) : null}
      {currentStep === 3 && personaModel.modelo === "2" ? (
        <AboutPersona
          name={personaModel.nome}
          step={textStep}
          onReturn={onReturnAboutPersona}
          onNext={onNextAboutPersona}
        />
      ) : null}
      {currentStep === 4 && (
        <CalmActivities
          step={textStep}
          onReturn={onReturnCalmActivities}
          onNext={console.log}
        />
      )}
      {currentStep > 7 && <ViewDetailsPersona />}
    </div>
  );
}
