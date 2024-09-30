import { PersonaModel } from "@/app/@types/persona.type";
import { useMemo } from "react";

type MainCharacteristicsProps = {
  persona: PersonaModel;
};

export default function MainCharacteristics(props: MainCharacteristicsProps) {
  const description = useMemo(() => {
    return `${props.persona.genero}, ${props.persona.idade} anos`;
  }, [props.persona.idade]);
  const autismLevel = useMemo(() => {
    return `Nível de autismo: ${props.persona.nivel_autismo}`;
  }, [props.persona.nivel_autismo]);
  const language = useMemo(() => {
    return `Linguagem: ${props.persona.linguagem}`;
  }, [props.persona.linguagem]);
  const soundSensibility = useMemo(() => {
    const soundSensibility = props.persona.sensibilidade_som
      ? "Possui"
      : "Não possui";
    return `${soundSensibility} sensibilidade ao som`;
  }, [props.persona.sensibilidade_som]);

  return (
    <div className="flex-1 flex flex-row gap-4 items-start">
      <img
        className="aspect-square rounded-full bg-cover"
        width={175}
        height={175}
        alt="Foto principal"
        src={props.persona.foto}
      />
      <div className="flex flex-col gap-0">
        <h1 className="text-slate-900 text-4xl leading-snug">
          {props.persona.nome}
        </h1>
        <span className="text-slate-900 text-md leading-tight">
          {description}
        </span>
        <span className="text-slate-900 text-md leading-tight">
          {autismLevel}
        </span>
        <span className="text-slate-900 text-md leading-tight">{language}</span>
        <span className="text-slate-900 text-md leading-tight">
          {soundSensibility}
        </span>
      </div>
    </div>
  );
}
