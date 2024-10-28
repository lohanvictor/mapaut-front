"use client";

import { useEffect, useState } from "react";
import CancelButton from "./_components/CancelButton";
import SaveButton from "./_components/SaveButton";
import { PersonaModel, PersonaSection } from "@/app/@types/persona.type";
import { LocalStorageUtils } from "@/app/_utils/localStorage.util";
import EditDetailsPersona from "@/app/_components/_detailsPersona/EditDetailsPersona";
import { DemographicAndGeneral } from "./_components/DemographicAndGeneral";
import CalmActivities from "@/app/_components/_personaSteps/CalmActivities";
import StressActivities from "@/app/_components/_personaSteps/StressActivities";
import SocialAspects from "@/app/_components/_personaSteps/SocialAspects";
import SoftwareAspects from "@/app/_components/_personaSteps/SoftwareAspects";
import Stereotypes from "@/app/_components/_personaSteps/Stereotypes";
import AboutPersona from "@/app/_components/_personaSteps/AboutPersona";
import { VGA } from "@/app/_components/_personaSteps/VGA";

type PersonasEditPageProps = {
  params: {
    id: string;
  };
};

export default function PersonasEditPage({ params }: PersonasEditPageProps) {
  const [persona, setPersona] = useState<PersonaModel | null>(null);
  const [editSection, setEditSection] = useState<PersonaSection>("none");

  useEffect(() => {
    async function fetchPersona() {
      const response = await (await fetch(`/api/personas/${params.id}`)).json();
      setPersona(response as PersonaModel);
    }

    const persona = LocalStorageUtils.get("mapaut:persona" + params.id);
    if (persona) {
      setPersona(JSON.parse(persona) as PersonaModel);
    } else {
      fetchPersona();
    }
  }, []);

  if (persona === null) return null;

  function handleSaveDemoGeneral(form: {
    age: number;
    gender: string;
    name: string;
    imgLink: string;
    file: unknown;
    language: string;
    autism: string;
  }) {
    setPersona((prev) =>
      prev !== null
        ? {
            ...prev,
            idade: form.age,
            genero: form.gender,
            nome: form.name,
            foto: form.imgLink,
            file: form.file,
            linguagem: form.language,
            nivel_autismo: form.autism,
          }
        : null
    );
    setEditSection("none");
  }

  function handleSaveActivities(activities: string[], activityName: string) {
    setPersona((prev) =>
      prev !== null
        ? {
            ...prev,
            [activityName]: activities,
          }
        : null
    );
    setEditSection("none");
  }

  function handleSaveAbout(about: string) {
    setPersona((prev) =>
      prev !== null
        ? {
            ...prev,
            sobre: about,
          }
        : null
    );
    setEditSection("none");
  }

  function handleSaveVGA(vga: {
    interacao: boolean[];
    comunicacao: boolean[];
    comportamento: boolean[];
    cognicao: boolean[];
  }) {
    setPersona((prev) =>
      prev !== null
        ? {
            ...prev,
            interacao: vga.interacao,
            comunicacao: vga.comunicacao,
            comportamento: vga.comportamento,
            cognicao: vga.cognicao,
          }
        : null
    );
    setEditSection("none");
  }

  function handleClickEdit(section: PersonaSection) {
    setEditSection(section);
  }

  return (
    <div className="flex-1 flex flex-col gap-8 p-6">
      {editSection === "none" ? (
        <>
          <div className="flex flex-row justify-end items-center">
            <div className="flex flex-row gap-4">
              <CancelButton />
              <SaveButton persona={persona} />
            </div>
          </div>
          <EditDetailsPersona persona={persona} onClickEdit={handleClickEdit} />
        </>
      ) : null}

      {editSection === "demographic" && (
        <DemographicAndGeneral
          persona={persona}
          onBack={() => setEditSection("none")}
          onSave={handleSaveDemoGeneral}
        />
      )}

      {editSection === "calm" && (
        <CalmActivities
          activities={persona.atividades_acalmam}
          onNext={(a) => handleSaveActivities(a, "atividades_acalmam")}
          onReturn={() => setEditSection("none")}
          step="1/1"
        />
      )}

      {editSection === "stress" && (
        <StressActivities
          activities={persona.atividades_estressam}
          onNext={(a) => handleSaveActivities(a, "atividades_estressam")}
          onReturn={() => setEditSection("none")}
          step="1/1"
        />
      )}

      {editSection === "social" && (
        <SocialAspects
          activities={persona.aspectos_sociais}
          onNext={(a) => handleSaveActivities(a, "aspectos_sociais")}
          onReturn={() => setEditSection("none")}
          step="1/1"
        />
      )}

      {editSection === "software" && (
        <SoftwareAspects
          activities={persona.aspectos_software}
          onNext={(a) => handleSaveActivities(a, "aspectos_software")}
          onReturn={() => setEditSection("none")}
          step="1/1"
        />
      )}

      {editSection === "stereotypes" && (
        <Stereotypes
          activities={persona.manias}
          onNext={(a) => handleSaveActivities(a, "manias")}
          onReturn={() => setEditSection("none")}
          step="1/1"
        />
      )}

      {editSection === "about" && (
        <AboutPersona
          name={persona.nome}
          onNext={handleSaveAbout}
          onReturn={() => setEditSection("none")}
          form={{
            about: persona.sobre,
          }}
          step="1/1"
        />
      )}

      {editSection === "vga" && (
        <VGA
          onNext={handleSaveVGA}
          onReturn={() => setEditSection("none")}
          form={{
            cognicao: persona.cognicao,
            comportamento: persona.comportamento,
            comunicacao: persona.comunicacao,
            interacao: persona.interacao,
          }}
        />
      )}
    </div>
  );
}
