import { PersonaModel } from "@/app/@types/persona.type";
import ViewDetailsPersona from "@/app/_components/_detailsPersona/ViewDetailsPersona";
import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import CancelButton from "../CancelButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/_lib/api";
import LoadingModal from "@/app/_components/_modal/LoadingModal";

type ViewCreatedPersona = {
  persona: PersonaModel;
  onBack: () => void;
  onCancel: () => void;
};

type PostResponse = {
  id: string;
};

export default function ViewCreatedPersona(props: ViewCreatedPersona) {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  async function handleSave() {
    try {
      setIsLoading(true);
      const { data } = await api.post<PostResponse>(
        `/api/personas`,
        props.persona
      );
      route.push(`/personas/${data.id}/view`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-8 w-full">
      <div className="flex flex-row justify-between items-center">
        <IconButton onClick={props.onBack} size="medium">
          <ArrowBack />
        </IconButton>

        <div className="flex flex-row gap-4">
          <CancelButton onCancel={props.onCancel} />
          <Button onClick={handleSave} variant="contained" color="primary">
            Salvar
          </Button>
        </div>
      </div>

      <ViewDetailsPersona persona={props.persona} />

      {isLoading && <LoadingModal text="Aguardando salvamento da persona" />}
    </div>
  );
}
