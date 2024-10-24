import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
  password: string;
  setPassword: (password: string) => void;
  error: string;
  fullWidth?: boolean;
  placeholder?: string;
};

export function PasswordInput(props: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div className="relative flex flex-row w-full">
      <TextField
        id="outlined-adornment-password"
        placeholder={props.placeholder || "Senha"}
        type={showPassword ? "text" : "password"}
        value={props.password}
        fullWidth
        required
        onChange={(event) => props.setPassword(event.target.value)}
        className="bg-white"
        error={!!props.error}
        helperText={props.error}
      />
      <IconButton
        aria-label={showPassword ? "hide the password" : "display the password"}
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        onMouseUp={handleMouseUpPassword}
        className="absolute right-1 top-2"
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </div>
  );
}
