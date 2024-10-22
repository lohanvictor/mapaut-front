import MainCharacteristics from "../MainCharacteristics";
import LayoutActivity from "../LayoutActivity";
import { PersonaModel } from "@/app/@types/persona.type";
import { GraphVGA } from "../../GraphVGA";
import { useMemo } from "react";

type ViewDetailsPersonaProps = {
  persona: PersonaModel;
};

export default function ViewDetailsPersona({
  persona,
}: ViewDetailsPersonaProps) {
  const aboutName = persona.nome.split(" ");
  const about = persona.sobre.split("\n");

  const vgaData = useMemo<[number, number, number, number]>(() => {
    const interacao = persona.interacao.reduce(
      (acc, curr) => (curr ? acc + 1 : acc),
      0
    );
    const comunicacao = persona.comunicacao.reduce(
      (acc, curr) => (curr ? acc + 1 : acc),
      0
    );
    const comportamento = persona.comportamento.reduce(
      (acc, curr) => (curr ? acc + 1 : acc),
      0
    );
    const cognicao = persona.cognicao.reduce(
      (acc, curr) => (curr ? acc + 1 : acc),
      0
    );
    return [
      interacao * 100 / persona.interacao.length,
      comunicacao * 100 / persona.comunicacao.length,
      comportamento * 100 / persona.comportamento.length,
      cognicao * 100 / persona.cognicao.length,
    ];
  }, []);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-row gap-2 items-center">
        <MainCharacteristics persona={persona} />
        <GraphVGA data={vgaData} />
      </div>
      {persona.modelo === "1" && (
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
      )}
      {persona.modelo === "2" && (
        <div className="w-full flex-1 flex flex-col">
          <span className="text-slate-950 text-md ">Sobre {aboutName[0]}</span>
          <div className="w-full h-full flex-1 border-2 border-slate-300 rounded-md p-2">
            {about.map((paragrafo, index) => (
              <p key={index} className="text-slate-950">
                {paragrafo}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}