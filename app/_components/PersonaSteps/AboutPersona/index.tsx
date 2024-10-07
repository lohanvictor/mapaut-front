import { Close, QuestionMark } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import styledComponents from "styled-components";
import { styled } from "@mui/material/styles";
import AboutPersonaModal from "../../Modal/AboutPersonaModal";

type AboutProps = {
  step: string;
  name: string;
  form?: {
    about: string;
  };
  onReturn: () => void;
  onNext: (text: string) => void;
};

const Span = styledComponents.span`
  display: block;
  padding: 4px 8px;
  background-color: #1976d2;
  border-radius: 8px;
`;

export default function AboutPersona(props: AboutProps) {
  const [openModal, setOpenModal] = useState(false);
  const [about, setAbout] = useState(props.form?.about || "");
  const [errors, setErrors] = useState({
    about: "",
  });

  const valid = {
    about: () => {
      let error = "";

      if (!about) {
        error = "Campo obrigatório";
      }

      setErrors((prev) => ({ ...prev, about: error }));

      return Boolean(error);
    },
  };

  function onNext() {
    if (valid.about()) return;

    props.onNext(about);
  }

  function toggleModal() {
    setOpenModal((prev) => !prev);
  }

  return (
    <div className="max-h-full w-full overflow-y-auto flex flex-col gap-4">
      <div className="w-full flex flex-row justify-between">
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-row gap-1 items-center">
            <span className="text-3xl font-bold text-slate-950 leading-3">
              Sobre {props.name}
            </span>
            <IconButton onClick={toggleModal} size="medium">
              <QuestionMark />
            </IconButton>
          </div>
          <p className="m-0 text-slate-950">Que não sei oq não sei oq lá</p>
        </div>
        <div className="text-xl">
          <Span className="text-white">{props.step}</Span>
        </div>
      </div>
      <div className="w-full">
        <TextField
          id="standard-textarea"
          label="Descrição"
          placeholder="Descreva a persona"
          multiline
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={8}
          fullWidth
          helperText={errors.about}
          error={Boolean(errors.about)}
        />
      </div>
      <div className="w-full flex flex-row justify-between">
        <Button variant="contained" onClick={props.onReturn}>
          Voltar
        </Button>

        <Button variant="contained" onClick={onNext}>
          Prosseguir
        </Button>
      </div>

      <AboutPersonaModal
        isOpen={openModal}
        name={props.name}
        onClose={toggleModal}
      />
    </div>
  );
}
