import { PersonaModel } from "@/app/@types/persona.type";
import ViewDetailsPersona from "@/app/_components/DetailsPersona/ViewDetailsPersona";
import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import CancelButton from "../CancelButton";

type ViewCreatedPersona = {
  persona: PersonaModel;
  onBack: () => void;
  onCancel: () => void;
  onSave: () => void;
};

export default function ViewCreatedPersona(props: ViewCreatedPersona) {
  return (
    <div className="flex-1 flex flex-col gap-8 w-full">
      <div className="flex flex-row justify-between items-center">
        <IconButton onClick={props.onBack} size="medium">
          <ArrowBack />
        </IconButton>

        <div className="flex flex-row gap-4">
          <CancelButton onCancel={props.onCancel} />
          <Button onClick={props.onSave} variant="contained" color="primary">
            Salvar
          </Button>
        </div>
      </div>

      <ViewDetailsPersona persona={props.persona} />
    </div>
  );
}
