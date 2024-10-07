"use client";

import { PersonaModel } from "@/app/@types/persona.type";
import Modal from "@/app/_components/Modal/Modal";
import { LocalStorageUtils } from "@/app/_utils/localStorage.util";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EditButtonProps = {
  persona: PersonaModel;
};

export default function EditButton({ persona }: EditButtonProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const route = useRouter();

  function toggleModal() {
    setIsOpenModal((prev) => !prev);
  }

  function onProceed() {
    LocalStorageUtils.set("mapaut:persona" + persona.id, persona);
    route.push(`/personas/${persona.id}/edit`);
  }

  return (
    <>
      <Button onClick={onProceed} variant="contained" color="primary">
        Editar
      </Button>

      <Modal
        isOpen={isOpenModal}
        onCancel={toggleModal}
        onProceed={onProceed}
        text="Você deseja editar esta persona?"
        type="normal"
      />
    </>
  );
}
