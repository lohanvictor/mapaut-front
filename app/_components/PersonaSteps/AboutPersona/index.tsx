import { QuestionMark } from "@mui/icons-material";
import {
  Button,
  IconButton,
  LinearProgress,
  linearProgressClasses,
  TextField,
} from "@mui/material";
import { useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import AboutPersonaModal from "../../Modal/custom/AboutPersonaModal";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 16,
  borderRadius: 8,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 8,
  },
}));

type AboutProps = {
  step: string;
  name: string;
  form?: {
    about: string;
  };
  onReturn: () => void;
  onNext: (text: string) => void;
};

export default function AboutPersona(props: AboutProps) {
  const progressValue = useMemo(() => {
    const [step, total] = props.step.split("/");
    return (Number(step) / Number(total)) * 100;
  }, []);
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
        <div className="flex flex-col-reverse items-start gap-1 h-fit">
          <div className="w-40">
            <BorderLinearProgress variant="determinate" value={progressValue} />
          </div>
          <span className="text-sm text-slate-950">Passos {props.step}</span>
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

      {openModal ? (
        <AboutPersonaModal name={props.name} onClose={toggleModal} />
      ) : null}
    </div>
  );
}
