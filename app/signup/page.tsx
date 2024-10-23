"use client";

import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const route = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const valid = {
    name: () => {
      let error = "";
      if (!name) {
        error = "Nome é obrigatório";
      }

      setErrors((errors) => ({
        ...errors,
        name: error,
      }));

      return Boolean(error);
    },
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

      if (password !== confirmedPassword) {
        error = "As senhas não coincidem";
      }

      setErrors((errors) => ({
        ...errors,
        password: error,
      }));

      return Boolean(error);
    },
  };

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

    route.replace("/login");
  }

  function handleBack() {
    route.replace("/login");
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-6 overflow-y-auto">
      <div className="flex flex-col w-[600px] bg-slate-200 rounded-md p-6 items-center gap-2">
        <Button
          onClick={handleBack}
          variant="text"
          className="text-slate-500  self-start"
        >
          <ArrowBack />
          Voltar
        </Button>

        <div className="flex flex-col items-center">
          <h1 className="text-slate-950 text-4xl font-medium">Cadastro</h1>
          <span className="text-slate-700">
            Preencha todos os campos abaixo para criar sua conta no MapAut
          </span>
        </div>

        <TextField
          placeholder="Digite seu nome"
          value={name}
          onChange={(target) => setName(target.target.value)}
          variant="outlined"
          required
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          className="bg-white"
        />

        <TextField
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          variant="outlined"
          required
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          className="bg-white"
        />

        <div className="relative flex flex-row w-full">
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

        <div className="relative flex flex-row w-full">
          <TextField
            id="outlined-adornment-password"
            placeholder="Confirmar senha"
            type={showPassword ? "text" : "password"}
            value={confirmedPassword}
            fullWidth
            required
            onChange={(event) => setConfirmedPassword(event.target.value)}
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

        <Button onClick={handleClick} fullWidth variant="contained">
          Registrar
        </Button>
      </div>
    </div>
  );
}
