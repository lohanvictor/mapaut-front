"use client";

import OptionModal from "@/app/_components/_modal/OptionModal";
import { useSession } from "@/app/_contexts/sessionContext";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteAccountButton() {
  const [openModal, setOpenModal] = useState(false);
  const { handleLogout } = useSession();
  const route = useRouter();

  function toggleModal() {
    setOpenModal((prev) => !prev);
  }

  function handleClick() {
    alert("Conta deletada");
    handleLogout();
    toggleModal();
    route.replace("/login");
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
        isOpen={openModal}
        onCancel={toggleModal}
        text="Você tem certeza que deseja deletar sua conta?"
        type="danger"
        onProceed={handleClick}
      />
    </>
  );
}
