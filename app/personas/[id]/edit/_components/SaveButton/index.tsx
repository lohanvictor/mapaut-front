"use client";

import { PersonaModel } from "@/app/@types/persona.type";
import LoadingModal from "@/app/_components/_modal/LoadingModal";
import OptionModal from "@/app/_components/_modal/OptionModal";
import api from "@/app/_lib/api";
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
    toggleModal();
    try {
      setIsLoading(true);
      const response = await api.post<{ id: string }>(
        `/api/personas`,
        props.persona
      );
      setIsLoading(false);
      route.push(`/personas/${response.data.id}/view`);
    } catch (error) {
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
