"use client";

import { PersonaModel } from "@/app/@types/persona.type";
import ViewDetailsPersona from "@/app/_components/DetailsPersona/ViewDetailsPersona";
import DeleteModal from "@/app/_components/Modal/DeleteModal";
import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PersonaViewProps = {
  params: {
    id: string;
  };
};

export default function PersonaView(props: PersonaViewProps) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [persona, setPersona] = useState<PersonaModel | null>(null);

  const router = useRouter();

  function handleBack() {
    router.push("/personas");
  }

  function toggleDeleteModal() {
    setIsOpenDeleteModal((prev) => !prev);
  }

  async function fetchPersona() {
    let response = await (
      await fetch(`/api/personas/${props.params.id}`)
    ).json();
    setPersona(response as PersonaModel);
  }

  useEffect(() => {
    fetchPersona();
  }, []);

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

      {persona !== null ? <ViewDetailsPersona persona={persona} /> : null}

      <DeleteModal
        isOpen={isOpenDeleteModal}
        onCancel={toggleDeleteModal}
        onProceed={() => null}
      />
    </div>
  );
}
