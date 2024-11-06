import { PersonaModel } from "@/app/_types/persona.type";
import ViewDetailsPersona from "@/app/_components/_detailsPersona/ViewDetailsPersona";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CancelButton from "../CancelButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/_lib/api";
import LoadingModal from "@/app/_components/_modal/LoadingModal";
import { Notification } from "@/app/_lib/notification";
import { isAxiosError } from "axios";

type ViewCreatedPersona = {
  persona: PersonaModel;
  file: File;
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

      const { data } = await api.post<PostResponse>(`/api/personas`, {
        ...props.persona,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      
      try {
        const formData = new FormData();
        formData.set("file", props.file);
        await api.post(`/api/personas/${data.id}/picture`, formData);
        Notification.success("Persona criada com sucesso!");
      } catch (error) {
        if (isAxiosError(error) && error.response!.status === 500) {
          Notification.info(
            "A persona foi criada, porém a imagem não foi salva. Tente salvá-la na edição"
          );
        }
      }

      route.push(`/personas/${data.id}/view`);
    } catch {
      Notification.error("Erro ao criar persona");
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
