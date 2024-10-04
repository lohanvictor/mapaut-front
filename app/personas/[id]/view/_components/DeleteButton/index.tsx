"use client";

import DeleteModal from "@/app/_components/Modal/DeleteModal";
import { Button } from "@mui/material";
import { useState } from "react";

export default function DeleteButton() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  function toggleDeleteModal() {
    setIsOpenDeleteModal((prev) => !prev);
  }

  return (
    <>
      <Button onClick={toggleDeleteModal} variant="contained" color="error">
        Excluir
      </Button>

      <DeleteModal
        isOpen={isOpenDeleteModal}
        onCancel={toggleDeleteModal}
        onProceed={() => null}
      />
    </>
  );
}
