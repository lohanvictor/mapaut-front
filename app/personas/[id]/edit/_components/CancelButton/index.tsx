"use client";

import Modal from "@/app/_components/Modal/Modal";
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
    router.push(`/personas/${params.id}/view`);
  }

  return (
    <>
      <Button onClick={toggleModal} variant="contained" color="inherit">
        Cancelar
      </Button>

      <Modal
        isOpen={isOpenModal}
        onCancel={toggleModal}
        onProceed={() => null}
        text="Você quer realmente cancelar a ediçao desta persona?"
        type="normal"
      />
    </>
  );
}
