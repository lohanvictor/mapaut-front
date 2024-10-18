"use client";

import { PersonaModel } from "@/app/@types/persona.type";
import ViewDetailsPersona from "@/app/_components/_detailsPersona/ViewDetailsPersona";
import { useEffect, useState } from "react";
import BackButton from "./_components/BackButton";
import DeleteButton from "./_components/DeleteButton";
import EditButton from "./_components/EditButton";

type PersonaViewProps = {
  params: {
    id: string;
  };
};

export default function PersonaView(props: PersonaViewProps) {
  const [persona, setPersona] = useState<PersonaModel | null>(null);

  async function fetchPersona() {
    let response = await (
      await fetch(`/api/personas/${props.params.id}`)
    ).json();
    setPersona(response as PersonaModel);
  }

  useEffect(() => {
    fetchPersona();
  }, []);

  if (persona === null) return null;

  return (
    <div className="flex-1 flex flex-col gap-8 p-6">
      <div className="flex flex-row justify-between items-center">
        <BackButton />

        <div className="flex flex-row gap-4">
          <DeleteButton />
          <EditButton persona={persona} />
        </div>
      </div>

      <ViewDetailsPersona persona={persona} />
    </div>
  );
}
