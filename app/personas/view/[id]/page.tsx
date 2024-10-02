"use client";

import ViewDetailsPersona from "@/app/_components/DetailsPersona/ViewDetailsPersona";
import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

type PersonaViewProps = {
  params: {
    id: string;
  };
};

export default function PersonaView(props: PersonaViewProps) {
  const router = useRouter();

  function handleBack() {
    router.push('/personas')
  }

  return (
    <div className="flex-1 flex flex-col gap-8 p-6">
      <div className="flex flex-row justify-between items-center">
        <IconButton onClick={handleBack} size="medium">
          <ArrowBack />
        </IconButton>

        <div className="flex flex-row gap-4">
          <Button variant="contained" color="error">
            Excluir
          </Button>
          <Button variant="contained">Editar</Button>
        </div>
      </div>
      <ViewDetailsPersona />
    </div>
  );
}
