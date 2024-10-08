"use client";

import Modal from "@/app/_components/Modal/Modal";
import { Button } from "@mui/material";
import { useState } from "react";

export default function DeleteButton() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function toggleModal() {
    setIsOpenModal((prev) => !prev);
  }

  return (
    <>
      <Button onClick={toggleModal} variant="contained" color="error">
        Excluir
      </Button>

      <Modal
        isOpen={isOpenModal}
        onCancel={toggleModal}
        onProceed={() => null}
        text="Você realmente deseja excluir esta persona?"
        type="danger"
      />
    </>
  );
}
