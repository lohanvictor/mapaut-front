"use client";

import { useMemo, useState } from "react";
import ChooseModel from "./_components/ChooseModel";
import DemographicCharacteristics from "../../_components/PersonaSteps/DemographicCharacteristics";
import GeneralCharacteristics from "@/app/_components/PersonaSteps/GeneralCharacteristics";
import StressActivities from "@/app/_components/PersonaSteps/StressActivities";
import { PersonaModel } from "@/app/@types/persona.type";
import CalmActivities from "@/app/_components/PersonaSteps/CalmActivities";
import AboutPersona from "@/app/_components/PersonaSteps/AboutPersona";
import Stereotypes from "@/app/_components/PersonaSteps/Stereotypes";
import SocialAspects from "@/app/_components/PersonaSteps/SocialAspects";
import SoftwareAspects from "@/app/_components/PersonaSteps/SoftwareAspects";
import ViewCreatedPersona from "./_components/ViewCreatedPersona";
import { VGA } from "@/app/_components/PersonaSteps/VGA";
import { CreateWelcome } from "./_components/CreateWelcome";

export default function PersonasCreate() {
  const [currentStep, setCurrentStep] = useState(-2);
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
    cognicao: [],
    comportamento: [],
    comunicacao: [],
    interacao: [],
  });

  function previousStep() {
    setCurrentStep((prev) => prev - 1);
  }

  function nextStep() {
    setCurrentStep((prev) => prev + 1);
  }

  function handleVGA(vga: {
    interacao: boolean[];
    comunicacao: boolean[];
    comportamento: boolean[];
    cognicao: boolean[];
  }) {
    setPersonaModel((prev) => ({
      ...prev,
      cognicao: vga.cognicao,
      comportamento: vga.comportamento,
      comunicacao: vga.comunicacao,
      interacao: vga.interacao,
    }));
    nextStep();
  }

  function handleChooseModel(model: string) {
    setPersonaModel((prev) => ({ ...prev, modelo: model }));
    setTotalSteps(model === "1" ? 7 : 3);
    setCurrentStep(1);
  }

  function handleNextDemoCharacteristics(form: {
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
    nextStep();
  }

  function handleNextGeneralCharacteristics(form: {
    language: string;
    autism: string;
  }) {
    setPersonaModel((prev) => ({
      ...prev,
      linguagem: form.language,
      nivel_autismo: form.autism,
    }));

    nextStep();
  }

  function handleNextStressActivites(activities: string[]) {
    setPersonaModel((prev) => ({
      ...prev,
      atividades_estressam: activities,
    }));
    nextStep();
  }

  function handleNextCalmActivities(activities: string[]) {
    setPersonaModel((prev) => ({
      ...prev,
      atividades_acalmam: activities,
    }));
    nextStep();
  }

  function handleNextAboutPersona(text: string) {
    setPersonaModel((prev) => ({
      ...prev,
      sobre: text,
    }));
    nextStep();
  }

  function handleNextStereotypes(activities: string[]) {
    setPersonaModel((prev) => ({
      ...prev,
      manias: activities,
    }));
    nextStep();
  }

  function handleNextSocialAspects(activities: string[]) {
    setPersonaModel((prev) => ({
      ...prev,
      aspectos_sociais: activities,
    }));
    nextStep();
  }

  function handleNextSoftwareAspects(activities: string[]) {
    setPersonaModel((prev) => ({
      ...prev,
      aspectos_software: activities,
    }));
    nextStep();
  }

  function handleCancelCreation() {
    setPersonaModel({
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
      cognicao: [],
      comportamento: [],
      comunicacao: [],
      interacao: [],
    });
    setCurrentStep(-1);
    setTotalSteps(0);
  }

  function handleSave() {
    console.log("Save", personaModel);
  }

  return (
    <div className="flex-1 flex flex-col items-center p-6">
      {currentStep === -2 && <CreateWelcome onNext={nextStep} />}
      {currentStep === -1 && <VGA onReturn={previousStep} onNext={handleVGA} />}
      {currentStep === 0 && <ChooseModel onChooseModel={handleChooseModel} />}
      {currentStep === 1 && (
        <DemographicCharacteristics
          state="create"
          step={textStep}
          onReturn={previousStep}
          onNext={handleNextDemoCharacteristics}
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
          onReturn={previousStep}
          onNext={handleNextGeneralCharacteristics}
        />
      )}
      {currentStep === 3 && personaModel.modelo === "1" ? (
        <StressActivities
          step={textStep}
          activities={personaModel.atividades_estressam}
          onReturn={previousStep}
          onNext={handleNextStressActivites}
        />
      ) : null}
      {currentStep === 4 && personaModel.modelo === "1" && (
        <CalmActivities
          step={textStep}
          activities={personaModel.atividades_acalmam}
          onReturn={previousStep}
          onNext={handleNextCalmActivities}
        />
      )}
      {currentStep === 5 && personaModel.modelo === "1" && (
        <Stereotypes
          step={textStep}
          activities={personaModel.manias}
          onReturn={previousStep}
          onNext={handleNextStereotypes}
        />
      )}
      {currentStep === 6 && personaModel.modelo === "1" && (
        <SocialAspects
          step={textStep}
          activities={personaModel.aspectos_sociais}
          onReturn={previousStep}
          onNext={handleNextSocialAspects}
        />
      )}
      {currentStep === 7 && personaModel.modelo === "1" && (
        <SoftwareAspects
          step={textStep}
          activities={personaModel.aspectos_software}
          onReturn={previousStep}
          onNext={handleNextSoftwareAspects}
        />
      )}
      {currentStep > 7 && personaModel.modelo === "1" && (
        <ViewCreatedPersona
          onBack={previousStep}
          onCancel={handleCancelCreation}
          persona={{ ...personaModel, foto: img.link }}
        />
      )}
      {currentStep === 3 && personaModel.modelo === "2" ? (
        <AboutPersona
          name={personaModel.nome}
          step={textStep}
          form={{ about: personaModel.sobre }}
          onReturn={previousStep}
          onNext={handleNextAboutPersona}
        />
      ) : null}
      {currentStep === 4 && personaModel.modelo === "2" && (
        <ViewCreatedPersona
          onBack={previousStep}
          onCancel={handleCancelCreation}
          persona={{ ...personaModel, foto: img.link }}
        />
      )}
    </div>
  );
}
