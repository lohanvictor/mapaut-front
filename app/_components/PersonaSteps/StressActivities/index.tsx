import { Button, FormControl, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { AddActivityButton } from "./styled";
import LayoutPersona from "../../LayoutPersona";
import {
  STEPS_PERSONA_DATA,
  STRESS_ACTIVITIES_MOCK,
} from "@/app/_constants/steps.constant";

type StressActivitiesProps = {
  step: string;
  activities: string[];
  onReturn: () => void;
  onNext: (activities: string[]) => void;
};

export default function StressActivities(props: StressActivitiesProps) {
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(-1);
  const [selectedGuideAutActivityIndex, setSelectedGuideAutActivityIndex] =
    useState(-1);

  const [guideAutActivities, setGuideAutActivities] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>(props.activities);
  const [activityInput, setActivityInput] = useState("");
  const [errors, setErrors] = useState({
    activityInput: "",
    activities: "",
  });

  useEffect(() => {
    async function getActivity() {
      const response = await fetch(
        `/api/guideaut?section=atividades_estressam`
      );
      const data = await response.json();

      setGuideAutActivities(data);
    }
    getActivity();
  }, []);

  const valid = {
    activityInput: () => {
      let error = "";

      if (!activityInput) {
        error = "Este campo é obrigatório";
      }

      setErrors((prev) => ({ ...prev, activityInput: error }));

      return Boolean(error);
    },
    activity: () => {
      let error = "";

      if (!activities.length) {
        error = "Adicione pelo menos uma atividade";
      }

      setErrors((prev) => ({ ...prev, activities: error }));

      return Boolean(error);
    },
  };

  function handleAddActivity() {
    if (valid.activityInput()) return;

    setActivities((prev) => [activityInput, ...prev]);

    setActivityInput("");
  }

  function handleSelectActivity(index: number) {
    const newSelectedIndex = selectedActivityIndex === index ? -1 : index;

    setSelectedActivityIndex(newSelectedIndex);
  }

  function handleRemoveActivity() {
    if (selectedActivityIndex === -1) return;

    const newActivities = activities.filter(
      (_, index) => index !== selectedActivityIndex
    );

    setActivities(newActivities);
    setSelectedActivityIndex(-1);
  }

  function handleSelectGuideAutActivity(index: number) {
    const newSelectedIndex =
      selectedGuideAutActivityIndex === index ? -1 : index;

    setSelectedGuideAutActivityIndex(newSelectedIndex);
  }

  function handleAddGuideAutActivity() {
    if (selectedGuideAutActivityIndex === -1) return;

    const selectedActivity = guideAutActivities[selectedGuideAutActivityIndex];

    setActivities((prev) => [selectedActivity, ...prev]);
    setSelectedGuideAutActivityIndex(-1);
  }

  function onNext() {
    if (valid.activity()) return;

    props.onNext(activities);
  }

  return (
    <LayoutPersona
      step={props.step}
      title={STEPS_PERSONA_DATA.stressActivities.title}
      description={STEPS_PERSONA_DATA.stressActivities.description}
    >
      <div className="w-full flex flex-row gap-4">
        <div className="flex-1 flex flex-row gap-2">
          <div className="flex-1">
            <TextField
              placeholder="Escreva uma atividade que estressa"
              value={activityInput}
              onChange={(event) => setActivityInput(event.target.value)}
              variant="outlined"
              required
              fullWidth
              error={!!errors.activityInput}
              helperText={errors.activityInput}
            />
          </div>
          <AddActivityButton
            className="h-full rounded-full text-3xl text-white bg-blue-500 hover:bg-blue-600 aspect-square"
            onClick={handleAddActivity}
          >
            +
          </AddActivityButton>
        </div>
      </div>
      <div className="w-full flex flex-row h-96">
        <div className="flex-1 flex flex-col gap-1">
          <h2 className="text-sm text-slate-950">Atividades do GuideAut</h2>
          <div className="flex-1 flex flex-col border-2 overflow-y-auto border-slate-700">
            {guideAutActivities.map((selectedActivity, index) => (
              <button
                key={index}
                onClick={() => handleSelectGuideAutActivity(index)}
                className={
                  "flex flex-row p-2 w-full justify-start items-center border-b-2 hover:bg-slate-200 " +
                  (index === selectedGuideAutActivityIndex
                    ? "bg-slate-400"
                    : "")
                }
              >
                <span className="text-slate-800">{selectedActivity}</span>
              </button>
            ))}
          </div>
          <div style={{ height: "20px" }}></div>
        </div>
        <div className="p-6 flex flex-col gap-6 items-center justify-start">
          <Button
            variant="contained"
            color="info"
            disabled={selectedGuideAutActivityIndex === -1}
            onClick={handleAddGuideAutActivity}
            fullWidth
          >
            Mover atividade para selecionadas
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="error"
            disabled={selectedActivityIndex === -1}
            onClick={handleRemoveActivity}
          >
            Remover atividade selecionada
          </Button>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <h2 className="text-sm text-slate-950">Atividades selecionadas</h2>
          <div className="flex-1 flex flex-col border-2 overflow-y-auto border-slate-700">
            {activities.map((selectedActivity, index) => (
              <button
                key={index}
                onClick={() => handleSelectActivity(index)}
                className={
                  "flex flex-row p-2 w-full justify-start items-center border-b-2 hover:bg-slate-200 " +
                  (index === selectedActivityIndex ? "bg-slate-400" : "")
                }
              >
                <span className="text-slate-800">{selectedActivity}</span>
              </button>
            ))}
          </div>
          <div style={{ height: "20px", textAlign: "end" }}>
            <span className="text-red-500 text-sm text-end">
              {errors.activities}
            </span>
          </div>
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
