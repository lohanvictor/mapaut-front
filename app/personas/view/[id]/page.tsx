"use client";

import ViewDetailsPersona from "@/app/_components/DetailsPersona/ViewDetailsPersona";
import DeleteModal from "@/app/_components/Modal/DeleteModal";
import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PersonaViewProps = {
  params: {
    id: string;
  };
};

export default function PersonaView(props: PersonaViewProps) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const router = useRouter();

  function handleBack() {
    router.push("/personas");
  }

  function toggleDeleteModal() {
    setIsOpenDeleteModal((prev) => !prev);
  }

  return (
    <div className="flex-1 flex flex-col gap-8 p-6">
      <div className="flex flex-row justify-between items-center">
        <IconButton onClick={handleBack} size="medium">
          <ArrowBack />
        </IconButton>

        <div className="flex flex-row gap-4">
          <Button onClick={toggleDeleteModal} variant="contained" color="error">
            Excluir
          </Button>
          <Button variant="contained">Editar</Button>
        </div>
      </div>
      <ViewDetailsPersona />

      <DeleteModal
        isOpen={isOpenDeleteModal}
        onCancel={toggleDeleteModal}
        onProceed={() => null}
      />
    </div>
  );
}
