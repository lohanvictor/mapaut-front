"use client";

import { PersonaModel } from "@/app/_types/persona.type";
import { LocalStorageUtils } from "@/app/_utils/localStorage.util";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";

type EditButtonProps = {
  persona: PersonaModel;
};

export default function EditButton({ persona }: EditButtonProps) {
  const route = useRouter();

  function onProceed() {
    LocalStorageUtils.set("mapaut:persona" + persona.id, persona);
    route.push(`/personas/${persona.id}/edit`);
  }

  return (
    <Button onClick={onProceed} variant="contained" color="primary">
      Editar
    </Button>
  );
}
