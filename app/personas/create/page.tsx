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
import Stereotypes from "@/app/_components/PersonaSteps/Stereotypes";
import SocialAspects from "@/app/_components/PersonaSteps/SocialAspects";
import SoftwareAspects from "@/app/_components/PersonaSteps/SoftwareAspects";
import ViewCreatedPersona from "./_components/ViewCreatedPersona";

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

  function previousStep() {
    setCurrentStep((prev) => prev - 1);
  }

  function nextStep() {
    setCurrentStep((prev) => prev + 1);
  }

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
    nextStep();
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

    nextStep();
  }

  function onNextStressActivites(activities: string[]) {
    setPersonaModel((prev) => ({
      ...prev,
      atividades_estressam: activities,
    }));
    nextStep();
  }

  function onNextCalmActivities(activities: string[]) {
    setPersonaModel((prev) => ({
      ...prev,
      atividades_acalmam: activities,
    }));
    nextStep();
  }

  function onNextAboutPersona(text: string) {
    setPersonaModel((prev) => ({
      ...prev,
      sobre: text,
    }));
    nextStep();
  }

  function onNextStereotypes(activities: string[]) {
    setPersonaModel((prev) => ({
      ...prev,
      manias: activities,
    }));
    nextStep();
  }

  function onNextSocialAspects(activities: string[]) {
    setPersonaModel((prev) => ({
      ...prev,
      aspectos_sociais: activities,
    }));
    nextStep();
  }

  function onNextSoftwareAspects(activities: string[]) {
    setPersonaModel((prev) => ({
      ...prev,
      aspectos_software: activities,
    }));
    nextStep();
  }

  function onCancelCreation() {
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
    });
    setCurrentStep(0);
    setTotalSteps(0);
  }

  function onSave() {
    console.log("Save", personaModel);
  }

  return (
    <div className="flex-1 flex flex-col items-center p-6">
      {/* DEBUG DE SENIOR */}
      {/* <span className="text-black">{JSON.stringify(personaModel)}</span> */}

      {currentStep === 0 && <ChooseModel onChooseModel={onChooseModel} />}
      {currentStep === 1 && (
        <DemographicCharacteristics
          state="create"
          step={textStep}
          onReturn={previousStep}
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
          onReturn={previousStep}
          onNext={onNextGeneralCharacteristics}
        />
      )}
      {currentStep === 3 && personaModel.modelo === "1" ? (
        <StressActivities
          step={textStep}
          activities={personaModel.atividades_estressam}
          onReturn={previousStep}
          onNext={onNextStressActivites}
        />
      ) : null}
      {currentStep === 3 && personaModel.modelo === "2" ? (
        <AboutPersona
          name={personaModel.nome}
          step={textStep}
          form={{ about: personaModel.sobre }}
          onReturn={previousStep}
          onNext={onNextAboutPersona}
        />
      ) : null}
      {currentStep === 4 && personaModel.modelo === "1" && (
        <CalmActivities
          step={textStep}
          activities={personaModel.atividades_acalmam}
          onReturn={previousStep}
          onNext={onNextCalmActivities}
        />
      )}
      {currentStep === 5 && personaModel.modelo === "1" && (
        <Stereotypes
          step={textStep}
          activities={personaModel.manias}
          onReturn={previousStep}
          onNext={onNextStereotypes}
        />
      )}
      {currentStep === 6 && personaModel.modelo === "1" && (
        <SocialAspects
          step={textStep}
          activities={personaModel.aspectos_sociais}
          onReturn={previousStep}
          onNext={onNextSocialAspects}
        />
      )}
      {currentStep === 7 && personaModel.modelo === "1" && (
        <SoftwareAspects
          step={textStep}
          activities={personaModel.aspectos_software}
          onReturn={previousStep}
          onNext={onNextSoftwareAspects}
        />
      )}
      {currentStep > 7 && personaModel.modelo === "1" && (
        <ViewCreatedPersona
          onBack={previousStep}
          onCancel={onCancelCreation}
          persona={{ ...personaModel, foto: img.link }}
        />
      )}
      {currentStep === 4 && personaModel.modelo === "2" && (
        <ViewCreatedPersona
          onBack={previousStep}
          onCancel={onCancelCreation}
          persona={{ ...personaModel, foto: img.link }}
        />
      )}
    </div>
  );
}
