"use client";

import LoadingModal from "@/app/_components/_modal/LoadingModal";
import OptionModal from "@/app/_components/_modal/OptionModal";
import { useSession } from "@/app/_contexts/sessionContext";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

export function DeleteAccountButton() {
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const { handleDeleteAccount } = useSession();

  function toggleModal() {
    setOpenQuestionModal((prev) => !prev);
  }

  async function handleClick() {
    toggleModal();

    setOpenLoadingModal(true);
    await handleDeleteAccount();
    setOpenLoadingModal(false);
  }

  return (
    <>
      <Button
        variant="contained"
        color="error"
        startIcon={<Delete />}
        onClick={toggleModal}
      >
        Deletar conta
      </Button>

      <OptionModal
        isOpen={openQuestionModal}
        onCancel={toggleModal}
        text="Você tem certeza que deseja deletar sua conta?"
        type="danger"
        onProceed={handleClick}
      />

      {openLoadingModal && <LoadingModal text="Deletando conta..." />}
    </>
  );
}
