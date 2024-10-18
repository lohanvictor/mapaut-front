"use client";

import { useEffect, useState } from "react";
import CancelButton from "./_components/CancelButton";
import SaveButton from "./_components/SaveButton";
import { PersonaModel } from "@/app/@types/persona.type";
import { LocalStorageUtils } from "@/app/_utils/localStorage.util";
import ViewDetailsPersona from "@/app/_components/_detailsPersona/ViewDetailsPersona";

type PersonasEditPageProps = {
  params: {
    id: string;
  };
};

export default function PersonasEditPage({ params }: PersonasEditPageProps) {
  const [persona, setPersona] = useState<PersonaModel | null>(null);

  if (persona === null) return null;

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

  return (
    <div className="flex-1 flex flex-col gap-8 p-6">
      <div className="flex flex-row justify-end items-center">
        <div className="flex flex-row gap-4">
          <CancelButton />
          <SaveButton />
        </div>
      </div>

      <ViewDetailsPersona persona={persona} />
    </div>
  );
}
