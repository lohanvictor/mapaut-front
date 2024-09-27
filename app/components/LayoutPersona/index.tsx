import React from "react";
import styled from "styled-components";

type StepLayoutProps = {
  children?: React.ReactNode;
  step: string;
  title: string;
  description: string;
};

const Span = styled.span`
  display: block;
  padding: 4px 8px;
  background-color: #1976d2;
  border-radius: 8px;
`;

export default function LayoutPersona(props: StepLayoutProps) {
  return (
    <div className="max-h-full w-full overflow-y-auto flex flex-col gap-4">
      <div className="w-full flex flex-row justify-between">
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-slate-950">{props.title}</h1>
          <p className="m-0 text-slate-950">{props.description}</p>
        </div>
        <div className="text-xl ">
          <Span className="text-white">{props.step}</Span>
        </div>
      </div>
      {props.children}
    </div>
  );
}
