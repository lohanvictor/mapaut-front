import MainCharacteristics from "../MainCharacteristics";
import { useState } from "react";
import LayoutActivity from "../LayoutActivity";
import { PERSONA_MOCK } from "@/app/mocks/persona.mock";

export default function ViewDetailsPersona() {
  const [persona, setPersona] = useState(PERSONA_MOCK);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-row gap-2 items-center">
        <MainCharacteristics persona={persona} />
        <div
          style={{ width: 300 }}
          className="h-full bg-slate-800 rounded-lg"
        ></div>
      </div>
      <div className="grid grid-cols-2 gap-3 pb-6">
        <LayoutActivity
          label="Atividades que acalmam"
          activities={persona.atividades_acalmam}
        />
        <LayoutActivity
          label="Atividades que estressam"
          activities={persona.atividades_estressam}
        />
        <LayoutActivity
          label="Aspectos sociais e familiares"
          activities={persona.aspectos_sociais}
        />
        <LayoutActivity
          label="Aspectos de software"
          activities={persona.aspectos_software}
        />
        <LayoutActivity
          label="Esteriotipias e Manias"
          activities={persona.manias}
        />
      </div>
    </div>
  );
}
