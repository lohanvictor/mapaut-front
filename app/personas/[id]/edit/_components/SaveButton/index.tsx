"use client";

import Modal from "@/app/_components/Modal/Modal";
import { Button } from "@mui/material";
import { useState } from "react";

export default function SaveButton() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function toggleModal() {
    setIsOpenModal((prev) => !prev);
  }

  return (
    <>
      <Button onClick={toggleModal} variant="contained" color="primary">
        Salvar
      </Button>

      <Modal
        isOpen={isOpenModal}
        onCancel={toggleModal}
        onProceed={() => null}
        text="Você realmente deseja salvar esta persona?"
        type="normal"
      />
    </>
  );
}
