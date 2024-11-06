import { Autocomplete, Button, Slider, TextField } from "@mui/material";
import { useMemo, useRef, useState } from "react";
import { ImgContainer } from "./styled";
import LayoutPersona from "../../LayoutPersona";
import { STEPS_PERSONA_DATA } from "@/app/_constants/steps.constant";

const genderOptions = ["Masculino", "Feminino"];

type DemographicCharacteristicsProps = {
  step: string;
  state: "create" | "edit";
  form?: {
    name: string;
    age: number;
    gender: string;
    imgLink: string;
  };
  onReturn: () => void;
  onNext: (form: {
    name: string;
    age: number;
    gender: string;
    imgFile: File;
    imgLink: string;
  }) => void;
};
export default function DemographicCharacteristics(
  props: DemographicCharacteristicsProps
) {
  const [name, setName] = useState(props.form?.name || "");
  const [age, setAge] = useState(props.form?.age || 10);
  const [gender, setGender] = useState(props.form?.gender || "");
  const [img, setImg] = useState({
    file: null as unknown,
    link: props.form?.imgLink || "",
  });
  const imgRef = useRef<HTMLInputElement | null>(null);

  const imgHoverText = useMemo(() => {
    if (img.link === "") {
      return "Clique para adicionar uma foto";
    }
    return "Clique para editar a foto";
  }, [img.link]);

  const [errors, setErrors] = useState({
    name: "",
    age: "",
    gender: "",
    img: "",
  });

  const valid = {
    name: () => {
      let error = "";

      if (!name) {
        error = "Nome é obrigatório";
      }

      setErrors((prev) => ({ ...prev, name: error }));

      return Boolean(error);
    },
    age: () => {
      let error = "";

      if (age < 0) {
        error = "Idade é obrigatória";
      }

      setErrors((prev) => ({ ...prev, age: error }));

      return Boolean(error);
    },
    gender: () => {
      let error = "";

      if (!gender) {
        error = "Gênero é obrigatório";
      }
      setErrors((prev) => ({ ...prev, gender: error }));

      return Boolean(error);
    },
    image: () => {
      let error = "";
      if (!img.link) {
        error = "Escolha uma imagem para perfil";
      }

      setErrors((prev) => ({ ...prev, img: error }));

      return Boolean(error);
    },
  };

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setName(value);

    valid.name();
  }

  function handleAgeChange(value: number) {
    setAge(value);

    valid.age();
  }

  function handleGenderChange(value: string) {
    setGender(value);
  }

  function getImage(event: HTMLInputElement) {
    const file = event.files?.item(0);
    if (file) {
      const img = document.getElementById(
        "demographic-characteristics-img"
      ) as HTMLImageElement;
      img.src = URL.createObjectURL(file);

      setImg({ file, link: img.src });
      setErrors((prev) => ({ ...prev, img: "" }));
    }
  }

  function handleImgClick() {
    if (imgRef.current) {
      imgRef.current.click();
    }
  }

  function onNext() {
    const booleanErrors = [
      valid.name(),
      valid.age(),
      valid.gender(),
      valid.image(),
    ];

    if (booleanErrors.some((err) => !!err)) {
      return;
    }

    props.onNext({
      name,
      age,
      gender,
      imgFile: img.file as File,
      imgLink: img.link,
    });
  }

  return (
    <LayoutPersona
      step={props.step}
      title={STEPS_PERSONA_DATA.demographicCharacteristics.title}
      description={STEPS_PERSONA_DATA.demographicCharacteristics.description}
    >
      <div className="w-full flex flex-row gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <TextField
            label="Nome"
            placeholder="Escreva um nome"
            value={name}
            onChange={handleNameChange}
            variant="standard"
            required
            error={!!errors.name}
            helperText={errors.name}
            id="demographic-characteristics-name"
          />

          <div className="w-full flex flex-col gap-1">
            <span className="text-slate-950">Idade: {age}</span>

            <Slider
              defaultValue={props.form?.age || 10}
              value={age}
              onChange={(event, value) => handleAgeChange(value as number)}
              valueLabelDisplay="auto"
            ></Slider>
          </div>

          <Autocomplete
            freeSolo
            options={genderOptions}
            onChange={(event, value) => handleGenderChange(value ?? "")}
            onInput={(event) =>
              handleGenderChange((event.target as HTMLInputElement).value)
            }
            onBlur={valid.gender}
            value={gender}
            id="demographic-characteristics-genero"
            renderInput={(params) => (
              <TextField
                label="Gênero"
                placeholder="Escreva o nome do gênero ou selecione uma opção"
                variant="standard"
                error={!!errors.gender}
                helperText={errors.gender}
                {...params}
              />
            )}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <ImgContainer
            onClick={handleImgClick}
            className="bg-slate-400 hover:bg-slate-600 h-96 aspect-square rounded-full cursor-pointer flex flex-row justify-center items-center"
          >
            <img id="demographic-characteristics-img" src={img.link} alt="" />
            <span className="add">{imgHoverText}</span>
            <input
              type="file"
              accept="image/png,image/jpeg"
              style={{ opacity: 0 }}
              id="demographic-characteristics-img-input"
              ref={imgRef}
              onChange={(event) => getImage(event.target as HTMLInputElement)}
            />
          </ImgContainer>
          <span className="text-red-400">{errors.img}</span>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between">
        <Button variant="contained" onClick={props.onReturn}>
          Voltar
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          id="demographic-characteristics-next-button"
        >
          Prosseguir
        </Button>
      </div>
    </LayoutPersona>
  );
}
