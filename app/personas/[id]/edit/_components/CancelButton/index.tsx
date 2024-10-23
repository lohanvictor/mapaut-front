"use client";

import OptionModal from "@/app/_components/_modal/OptionModal";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CancelButton() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const params = useParams<{ id: string }>();

  const router = useRouter();

  function toggleModal() {
    setIsOpenModal((prev) => !prev);
  }

  function onProceed() {
    router.replace(`/personas/${params.id}/view`);
  }

  return (
    <>
      <Button onClick={toggleModal} variant="contained" color="inherit">
        Cancelar
      </Button>

      <OptionModal
        isOpen={isOpenModal}
        onCancel={toggleModal}
        onProceed={onProceed}
        text="Você quer realmente cancelar a ediçao desta persona?"
        type="normal"
      />
    </>
  );
}
