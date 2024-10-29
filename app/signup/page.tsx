"use client";

import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordInput } from "../_components/PasswordInput";
import api from "../_lib/api";
import { RegisterModel } from "../@types/login.type";
import LoadingModal from "../_components/_modal/LoadingModal";
import { Notification } from "../_lib/notification";

export default function SignUp() {
  const route = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prev) => !prev);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
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

      if (password.length < 6 || confirmedPassword.length < 6) {
        error = "A senha deve ter no mínimo 6 caracteres";
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

  async function handleClick() {
    const validationErrors = [valid.email(), valid.password()];
    const isValid = validationErrors.every((validation) => !validation);
    if (!isValid) {
      return;
    }

    toggleModal();
    try {
      await api.post("/api/register", {
        name,
        email,
        password,
      } as RegisterModel);
      Notification.success("Conta criada com sucesso!");
      toggleModal();
      route.replace("/login");
    } catch (error) {
      Notification.error("Erro ao criar conta");
      toggleModal();
    }
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

        <PasswordInput
          error={errors.password}
          password={password}
          setPassword={setPassword}
        />

        <PasswordInput
          error={errors.password}
          password={confirmedPassword}
          setPassword={setConfirmedPassword}
        />

        <Button onClick={handleClick} fullWidth variant="contained">
          Registrar
        </Button>
      </div>

      {openModal && <LoadingModal text="Criando conta..." />}
    </div>
  );
}
