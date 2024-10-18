"use client";

import OptionModal from "@/app/_components/_modal/OptionModal";
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

      <OptionModal
        isOpen={isOpenModal}
        onCancel={toggleModal}
        onProceed={() => null}
        text="Você realmente deseja excluir esta persona?"
        type="danger"
      />
    </>
  );
}
