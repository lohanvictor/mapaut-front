import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { ImgContainer } from "./styled";
import { useMemo, useState } from "react";
import { AutismTypes, LanguageTypes } from "../../../_types/persona.type";
import LayoutPersona from "../../LayoutPersona";
import { STEPS_PERSONA_DATA } from "@/app/_constants/steps.constant";
import TextModal from "../../_modal/TextModal";

type GeneralCharacteristicsProps = {
  step: string;
  state: "create" | "edit";
  form?: {
    language: string;
    autism: string;
  };
  img: {
    link: string;
    file?: File;
  };
  onReturn: () => void;
  onNext: (form: { language: string; autism: string }) => void;
};

export default function GeneralCharacteristics(
  props: GeneralCharacteristicsProps
) {
  const imgUrl = useMemo(() => {
    if (props.img.file) {
      return URL.createObjectURL(props.img.file);
    }

    return props.img.link;
  }, [props.img.file, props.img.link]);

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen((prev) => !prev);

  const [language, setLanguage] = useState(props.form?.language || "");
  const [autism, setAutism] = useState(props.form?.autism || "");

  const [errors, setErrors] = useState({
    language: "",
    autism: "",
  });

  const valid = {
    language: () => {
      let error = "";

      if (language === "") {
        error = "Selecione a linguagem da persona";
      }

      setErrors((prev) => ({
        ...prev,
        language: error,
      }));

      return Boolean(error);
    },
    autism: () => {
      let error = "";

      if (autism === "") {
        error = "Selecione o nível do autismo";
      }

      setErrors((prev) => ({
        ...prev,
        autism: error,
      }));

      return Boolean(error);
    },
  };

  function handleLanguageChange(type: string) {
    setLanguage(type);
  }

  function handleAutismChange(type: string) {
    setAutism(type);
  }

  function onNext() {
    const errors = [valid.autism(), valid.language()];
    if (errors.some((error) => !!error)) {
      return;
    }

    props.onNext({
      language,
      autism,
    });
  }

  return (
    <LayoutPersona
      step={props.step}
      title={STEPS_PERSONA_DATA.generalCharacteristics.title}
      description={STEPS_PERSONA_DATA.generalCharacteristics.title}
    >
      <div className="w-full flex flex-row gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <FormControl variant="standard" error={Boolean(errors.language)}>
            <InputLabel id="general-characteristics-select-language">
              Linguagem da persona
            </InputLabel>
            <Select
              labelId="general-characteristics-select-language"
              id="c-general-characteristics-select-language"
              value={language}
              onBlur={valid.language}
              onChange={(event) => handleLanguageChange(event.target.value)}
              label="Linguagem da persona"
            >
              <MenuItem
                value={LanguageTypes.nonVerbal}
                id={LanguageTypes.nonVerbal}
              >
                {LanguageTypes.nonVerbal}
              </MenuItem>
              <MenuItem value={LanguageTypes.verbal} id={LanguageTypes.verbal}>
                {LanguageTypes.verbal}
              </MenuItem>
              <MenuItem
                value={LanguageTypes.verbalEco}
                id={LanguageTypes.verbalEco}
              >
                {LanguageTypes.verbalEco}
              </MenuItem>
            </Select>

            <FormHelperText>{errors.language}</FormHelperText>
          </FormControl>

          <Button onClick={toggleModal} variant="contained" color="inherit">
            Dúvidas sobre linguagem da persona?
          </Button>
          <TextModal
            isOpen={modalOpen}
            onClose={toggleModal}
            title="Linguagem da Persona"
          >
            <Typography variant="body1">
              Os tipos de linguagem da persona são:
            </Typography>
            <Typography style={{ paddingLeft: 16 }}>
              <ul style={{ listStyleType: "'- '" }}>
                <li>
                  <strong>Não verbal:</strong> dificuldade em expressar-se
                  verbalmente ou oralmente, podendo não desenvolver a linguagem
                  falada ou ter uma fala limitada. Se comunica por gestos ou
                  expressões faciais.
                </li>
                <li>
                  <strong>Verbal:</strong> utiliza a comunicação verbal, porém
                  com certas peculiaridades, incluindo uma tendência a ser
                  literal, dificuldade em entender metáforas e sarcasmo.
                </li>
                <li>
                  <strong>Verbal Ecolálica:</strong> repetição de frases ou
                  palavras que ouviu de outras pessoas ou de fontes externas
                  (TV, músicas, etc.), estando dentro ou fora de contexto de uma
                  conversa.
                </li>
              </ul>
            </Typography>
          </TextModal>

          <FormControl variant="standard" error={Boolean(errors.autism)}>
            <InputLabel id="general-characteristics-select-autism">
              Nível do autismo
            </InputLabel>
            <Select
              labelId="general-characteristics-select-autism"
              id="c-general-characteristics-select-autism"
              value={autism}
              onBlur={valid.autism}
              onChange={(event) => handleAutismChange(event.target.value)}
              label="Nível do autismo"
            >
              <MenuItem value={AutismTypes.soft}>{AutismTypes.soft}</MenuItem>
              <MenuItem value={AutismTypes.moderate} id={AutismTypes.moderate}>
                {AutismTypes.moderate}
              </MenuItem>
              <MenuItem value={AutismTypes.severe}>
                {AutismTypes.severe}
              </MenuItem>
            </Select>

            <FormHelperText>{errors.autism}</FormHelperText>
          </FormControl>
        </div>
        <div className="flex-1 flex flex-row justify-center items-center">
          <ImgContainer className="bg-slate-400 h-96 aspect-square rounded-full cursor-pointer flex flex-row justify-center items-center">
            <img id="demographic-characteristics-img" src={imgUrl} alt="" />
          </ImgContainer>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between">
        <Button variant="contained" onClick={props.onReturn}>
          Voltar
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          id="general-characteristics-next-button"
        >
          Prosseguir
        </Button>
      </div>
    </LayoutPersona>
  );
}
