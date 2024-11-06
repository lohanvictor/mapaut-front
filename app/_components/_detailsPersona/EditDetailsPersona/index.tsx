import MainCharacteristics from "../MainCharacteristics";
import LayoutActivity from "../LayoutActivity";
import { PersonaModel, PersonaSection } from "@/app/_types/persona.type";
import { GraphVGA } from "../../GraphVGA";
import { useMemo } from "react";
import Edit from "@mui/icons-material/Edit";

type EditContainerProps = {
  onClick: () => void;
  children?: React.ReactNode;
};

type EditDetailsPersonaProps = {
  persona: PersonaModel;
  onClickEdit: (section: PersonaSection) => void;
};

function EditContainer(props: EditContainerProps) {
  return (
    <div className="relative">
      {props.children}
      <div className="absolute right-0 top-0">
        <button
          onClick={props.onClick}
          className="rounded-md bg-slate-500 p-1 flex flex-row items-center"
        >
          <Edit className="mr-2" />
          Editar
        </button>
      </div>
    </div>
  );
}

export default function EditDetailsPersona({
  persona,
  onClickEdit,
}: EditDetailsPersonaProps) {
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
      (interacao * 100) / persona.interacao.length,
      (comunicacao * 100) / persona.comunicacao.length,
      (comportamento * 100) / persona.comportamento.length,
      (cognicao * 100) / persona.cognicao.length,
    ];
  }, [
    persona.cognicao,
    persona.comunicacao,
    persona.comportamento,
    persona.interacao,
  ]);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-row gap-2 items-center justify-between">
        <EditContainer onClick={() => onClickEdit("demographic")}>
          <MainCharacteristics persona={persona} />
        </EditContainer>
        <EditContainer onClick={() => onClickEdit("vga")}>
          <GraphVGA data={vgaData} />
        </EditContainer>
      </div>
      {persona.modelo === "1" && (
        <div className="grid grid-cols-2 gap-3 pb-6">
          <EditContainer onClick={() => onClickEdit("calm")}>
            <LayoutActivity
              label="Atividades que acalmam"
              activities={persona.atividades_acalmam}
            />
          </EditContainer>

          <EditContainer onClick={() => onClickEdit("stress")}>
            <LayoutActivity
              label="Atividades que estressam"
              activities={persona.atividades_estressam}
            />
          </EditContainer>

          <EditContainer onClick={() => onClickEdit("social")}>
            <LayoutActivity
              label="Aspectos sociais e familiares"
              activities={persona.aspectos_sociais}
            />
          </EditContainer>

          <EditContainer onClick={() => onClickEdit("software")}>
            <LayoutActivity
              label="Aspectos de software"
              activities={persona.aspectos_software}
            />
          </EditContainer>

          <EditContainer onClick={() => onClickEdit("stereotypes")}>
            <LayoutActivity
              label="Esteriotipias e Manias"
              activities={persona.manias}
            />
          </EditContainer>
        </div>
      )}
      {persona.modelo === "2" && (
        <EditContainer onClick={() => onClickEdit("about")}>
          <div className="w-full flex-1 flex flex-col">
            <span className="text-slate-950 text-md ">
              Sobre {aboutName[0]}
            </span>
            <div className="w-full h-full flex-1 border-2 border-slate-300 rounded-md p-2">
              {about.map((paragrafo, index) => (
                <p key={index} className="text-slate-950">
                  {paragrafo}
                </p>
              ))}
            </div>
          </div>
        </EditContainer>
      )}
    </div>
  );
}
