"use client";

import { PersonaModel } from "@/app/@types/persona.type";
import LoadingModal from "@/app/_components/_modal/LoadingModal";
import OptionModal from "@/app/_components/_modal/OptionModal";
import api from "@/app/_lib/api";
import { Notification } from "@/app/_lib/notification";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  persona: PersonaModel;
};

export default function SaveButton(props: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  function toggleModal() {
    setIsOpenModal((prev) => !prev);
  }

  async function handleSave() {
    setIsOpenModal(false);
    try {
      setIsLoading(true);
      await api.patch<{ id: string }>(`/api/personas/${props.persona.id}`, {
        ...props.persona,
        updatedAt: new Date().toISOString(),
      });
      Notification.success("Persona editada com sucesso!");
      setIsLoading(false);
      route.push(`/personas/${props.persona.id}/view`);
    } catch (error) {
      Notification.error("Erro ao editar persona!");
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button onClick={handleSave} variant="contained" color="primary">
        Salvar
      </Button>

      <OptionModal
        isOpen={isOpenModal}
        onCancel={toggleModal}
        onProceed={() => null}
        text="Você realmente deseja salvar esta persona?"
        type="normal"
      />

      {isLoading && <LoadingModal text="Salvando persona..." />}
    </>
  );
}
