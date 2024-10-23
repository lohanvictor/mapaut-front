"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useSession } from "../_contexts/sessionContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { handleLogin } = useSession();
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const valid = {
    email: () => {
      let error = "";
      if (!email) {
        error = "Email é obrigatório";
      }

      setErrors((errors) => ({
        ...errors,
        email: error,
      }));

      return Boolean(error);
    },
    password: () => {
      let error = "";
      if (!password) {
        error = "Senha é obrigatória";
      }

      setErrors((errors) => ({
        ...errors,
        password: error,
      }));

      return Boolean(error);
    },
  };

  function onChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
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

  async function handleClick() {
    const validationErrors = [valid.email(), valid.password()];
    const isValid = validationErrors.every((validation) => !validation);
    if (!isValid) {
      return;
    }

    await handleLogin(email, password);

    route.push("/");
  }

  function handleSignUp() {
    route.push("/signup");
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
      <div className="flex flex-col w-96 gap-4 p-6 bg-slate-100 rounded-md">
        <h1 className="text-sky-800 text-4xl self-center font-bold">Login</h1>
        <Button onClick={handleSignUp} size="small">
          Não possui conta?
        </Button>
        <TextField
          placeholder="E-mail"
          value={email}
          onChange={onChangeEmail}
          variant="outlined"
          required
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          className="bg-white"
        />
        <div className="relative flex flex-row">
          <TextField
            id="outlined-adornment-password"
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
            value={password}
            fullWidth
            required
            onChange={(event) => setPassword(event.target.value)}
            className="bg-white"
            error={!!errors.password}
            helperText={errors.password}
          />
          <IconButton
            aria-label={
              showPassword ? "hide the password" : "display the password"
            }
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            onMouseUp={handleMouseUpPassword}
            className="absolute right-1 self-center"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>

        <Button onClick={() => null} size="small">
          Esqueci minha senha
        </Button>

        <Button onClick={handleClick} variant="contained">
          Logar
        </Button>
      </div>
    </div>
  );
}
