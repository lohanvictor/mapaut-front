"use client";

import { useMemo, useState } from "react";
import ChooseModel from "./_components/ChooseModel";
import DemographicCharacteristics from "../../_components/_personaSteps/DemographicCharacteristics";
import GeneralCharacteristics from "@/app/_components/_personaSteps/GeneralCharacteristics";
import StressActivities from "@/app/_components/_personaSteps/StressActivities";
import { PersonaModel } from "@/app/@types/persona.type";
import CalmActivities from "@/app/_components/_personaSteps/CalmActivities";
import AboutPersona from "@/app/_components/_personaSteps/AboutPersona";
import Stereotypes from "@/app/_components/_personaSteps/Stereotypes";
import SocialAspects from "@/app/_components/_personaSteps/SocialAspects";
import SoftwareAspects from "@/app/_components/_personaSteps/SoftwareAspects";
import ViewCreatedPersona from "./_components/ViewCreatedPersona";
import { VGA } from "@/app/_components/_personaSteps/VGA";
import { CreateWelcome } from "./_components/CreateWelcome";
import { useSession } from "@/app/_contexts/sessionContext";

export default function PersonasCreate() {
  const { login } = useSession();
  const [currentStep, setCurrentStep] = useState(-2);
  const [totalSteps, setTotalSteps] = useState(0);
  const [vgaInitialStep, setVgaInitialStep] = useState(1);

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
    createdAt: "",
    updatedAt: "",
    usuarioId: login.uid,
  });

  function previousStep() {
    setCurrentStep((prev) => prev - 1);
  }

  function nextStep() {
    setCurrentStep((prev) => prev + 1);
  }

  function handlePreviousStepDemographic() {
    setVgaInitialStep(4);
    previousStep();
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
      sensibilidade_som: vga.comportamento[8] || !vga.comportamento[9],
    }));
    nextStep();
  }

  function handleChooseModel(model: string) {
    setPersonaModel((prev) => ({ ...prev, modelo: model }));
    setTotalSteps(model === "1" ? 7 : 3);
    setVgaInitialStep(1);
    nextStep();
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
      createdAt: "",
      updatedAt: "",
      usuarioId: login.uid,
    });
    setCurrentStep(-1);
    setTotalSteps(0);
  }

  return (
    <div className="flex-1 flex flex-col items-center p-6">
      {currentStep === -2 && <CreateWelcome onNext={nextStep} />}
      {currentStep === -1 && <ChooseModel onChooseModel={handleChooseModel} />}
      {currentStep === 0 && (
        <VGA
          onReturn={previousStep}
          onNext={handleVGA}
          initialStep={vgaInitialStep}
          form={{
            interacao: personaModel.interacao,
            comunicacao: personaModel.comunicacao,
            comportamento: personaModel.comportamento,
            cognicao: personaModel.cognicao,
          }}
        />
      )}
      {currentStep === 1 && (
        <DemographicCharacteristics
          state="create"
          step={textStep}
          onReturn={handlePreviousStepDemographic}
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
          file={img.file as File}
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
          file={img.file as File}
          onBack={previousStep}
          onCancel={handleCancelCreation}
          persona={{ ...personaModel, foto: img.link }}
        />
      )}
    </div>
  );
}
