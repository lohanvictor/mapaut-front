"use client";

import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

type Props = {
  onClick: (value: boolean) => void;
  texts: [string, string];
  defaultValue?: boolean;
};

export function CheckboxButton(props: Props) {
  const [checked, setChecked] = useState(props.defaultValue || false);

  function handleClick() {
    props.onClick(!checked);
    setChecked((prev) => !prev);
  }

  return (
    <button
      className="w-full flex gap-1 items-center bg-slate-100 p-2 rounded-md bor"
      onClick={handleClick}
    >
      <Checkbox checked={checked} />
      <div className="flex flex-col items-start">
        <span className="text-slate-950 text-start">{props.texts[0]}</span>
        <span className="text-zinc-400 text-sm text-start">
          {props.texts[1]}
        </span>
      </div>
    </button>
  );
}
