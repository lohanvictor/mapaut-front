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

export default function DeleteButton(props: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  function toggleModal() {
    setIsOpenModal((prev) => !prev);
  }

  async function handleDelete() {
    toggleModal();
    try {
      setIsLoading(true);
      await api.delete(`/api/personas/${props.persona.id}`);
      Notification.success("Persona excluída com sucesso!");
      setIsLoading(false);
      route.replace("/personas");
    } catch (error) {
      Notification.error("Erro ao excluir persona!");
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button onClick={toggleModal} variant="contained" color="error">
        Excluir
      </Button>

      <OptionModal
        isOpen={isOpenModal}
        onCancel={toggleModal}
        onProceed={handleDelete}
        text="Você realmente deseja excluir esta persona?"
        type="danger"
      />

      {isLoading && <LoadingModal text="Deletando persona..." />}
    </>
  );
}
