"use client";

import { useMemo, useState } from "react";
import styled from "styled-components";
import { PERSONA_MOCK } from "../_mocks/persona.mock";
import Image from "next/image";

const GenericContainer = styled.div`
  width: calc(100% / 3);
  position: absolute;
  padding: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  ul {
    list-style-type: disc;
  }
  span,
  li {
    color: #222;
  }
`;

const PictureContainer = styled(GenericContainer)`
  aspect-ratio: 16/11;

  img {
    height: max-content;
    object-fit: cover;
  }

  .general-info {
    width: 100%;
    box-sizing: border-box;

    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const AboveBelowPictureContainer = styled(GenericContainer)`
  left: calc(100% / 3);
`;

const ColumnContainer = styled(GenericContainer)`
  height: calc(100% / 2);
`;

export default function Test() {
  const { heightAboveBelow, height } = useMemo(() => {
    if (!document) return { height: 0, heightAboveBelow: 0 };

    const height = document.documentElement.clientHeight;
    const width = document.documentElement.clientWidth - 224;

    const centerHeight = (width * 11) / (3 * 16);
    const heightAboveBelow = (height - centerHeight) / 2;

    return { heightAboveBelow, height };
  }, [document]);

  const [personaModel, setPersonaModel] = useState(PERSONA_MOCK);

  return (
    <div className="flex-1 flex w-full h-full justify-center items-center relative bg-red-400">
      <PictureContainer className="bg-blue-500">
        <img src={personaModel.foto} alt="Foto da persona" />
        <div className="general-info">
          <div className="info">
            <span>
              <strong>Nome: </strong>
              {personaModel.nome}
            </span>
            <span>
              <strong>Idade: </strong>
              {personaModel.idade}
            </span>
          </div>
          <div className="info">
            <span>
              <strong>Gênero: </strong> {personaModel.genero}
            </span>
          </div>
        </div>
      </PictureContainer>

      <AboveBelowPictureContainer
        className="bg-green-300"
        style={{ height: heightAboveBelow, top: 0 }}
      >
        <span>Aspectos Sociais e Familiares</span>
        <ul>
          {personaModel.aspectos_sociais.map((aspecto) => (
            <li key={aspecto} style={{ alignSelf: "flex-start" }}>
              {aspecto}
            </li>
          ))}
        </ul>
      </AboveBelowPictureContainer>

      <AboveBelowPictureContainer
        className="bg-purple-300"
        style={{ height: heightAboveBelow, bottom: 0 }}
      >
        <span>Estereotipias/Manias</span>
        <ul>
          {personaModel.manias.map((manias) => (
            <li key={manias} style={{ alignSelf: "flex-start" }}>
              {manias}
            </li>
          ))}
        </ul>
      </AboveBelowPictureContainer>

      <ColumnContainer className="bg-gray-400" style={{ left: 0, top: 0 }}>
        <span>Atividades que acalmam</span>
        <ul>
          {personaModel.atividades_acalmam.map((atividade) => (
            <li key={atividade} style={{ alignSelf: "flex-start" }}>
              {atividade}
            </li>
          ))}
        </ul>
      </ColumnContainer>

      <ColumnContainer className="bg-orange-300" style={{ left: 0, bottom: 0 }}>
        <span>Atividades que estressam</span>
        <ul>
          {personaModel.atividades_estressam.map((atividade) => (
            <li key={atividade} style={{ alignSelf: "flex-start" }}>
              {atividade}
            </li>
          ))}
        </ul>
      </ColumnContainer>

      <ColumnContainer
        className="bg-gray-400"
        style={{ right: 0, bottom: 0, height: height * 0.4 }}
      >
        <span>Aspectos Tecnológicos de Software</span>
        <ul>
          {personaModel.aspectos_software.map((aspecto) => (
            <li key={aspecto} style={{ alignSelf: "flex-start" }}>
              {aspecto}
            </li>
          ))}
        </ul>
      </ColumnContainer>

      <ColumnContainer
        className="bg-orange-300"
        style={{ right: 0, top: 0, height: height * 0.6 }}
      >
        <span>Características Gerais</span>
        <span>
          <strong>Linguagem: </strong> {personaModel.linguagem}
        </span>
        <span>
          <strong>Sensibilidade ao som: </strong>
          {personaModel.sensibilidade_som ? "Sim" : "Não"}
        </span>
        <span>
          <strong>Nível de Autismo: </strong> {personaModel.nivel_autismo}
        </span>
      </ColumnContainer>
    </div>
  );
}
