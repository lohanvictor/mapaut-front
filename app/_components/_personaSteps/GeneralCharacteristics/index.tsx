import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { ImgContainer } from "./styled";
import { useMemo, useState } from "react";
import { AutismTypes, LanguageTypes } from "../../../_types/persona.type";
import LayoutPersona from "../../LayoutPersona";
import { STEPS_PERSONA_DATA } from "@/app/_constants/steps.constant";

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
              <MenuItem value={LanguageTypes.nonVerbal}>
                {LanguageTypes.nonVerbal}
              </MenuItem>
              <MenuItem value={LanguageTypes.verbal}>
                {LanguageTypes.verbal}
              </MenuItem>
              <MenuItem value={LanguageTypes.verbalEco}>
                {LanguageTypes.verbalEco}
              </MenuItem>
            </Select>

            <FormHelperText>{errors.language}</FormHelperText>
          </FormControl>

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
              <MenuItem value={AutismTypes.moderate}>
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
        <Button variant="contained" onClick={onNext}>
          Prosseguir
        </Button>
      </div>
    </LayoutPersona>
  );
}
