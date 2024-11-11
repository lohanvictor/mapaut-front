"use client";

import ArrowBack from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordInput } from "../_components/PasswordInput";
import api from "../_lib/api";
import { RegisterModel } from "../_types/login.type";
import LoadingModal from "../_components/_modal/LoadingModal";
import { Notification } from "../_lib/notification";
import { ValidationUtil } from "../_utils/validation.util";

export default function SignUp() {
  const route = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prev) => !prev);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
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

      if (!ValidationUtil.isEmailValid(email)) {
        error = "Email inválido";
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

      if (!ValidationUtil.isPasswordLengthValid(password)) {
        error = "A senha deve ter no mínimo 8 caracteres";
      }

      setErrors((errors) => ({
        ...errors,
        password: error,
      }));

      return Boolean(error);
    },
  };

  async function handleClick() {
    const validationErrors = [valid.email(), valid.password(), valid.name()];
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
    } catch {
      Notification.error("Erro ao criar conta");
      toggleModal();
    }
  }

  function handleBack() {
    route.replace("/login");
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-6 overflow-y-auto">
      <div className="flex flex-col w-[600px] bg-slate-100 rounded-md p-6 items-center gap-2">
        <Button
          onClick={handleBack}
          variant="text"
          className="text-slate-500  self-start"
        >
          <ArrowBack />
          Voltar
        </Button>

        <div className="flex flex-col items-center gap-4">
          <h2 className="text-sky-800 text-4xl self-center font-bold">
            PersonAut | Cadastro
          </h2>
          <span className="text-slate-700">
            Preencha todos os campos abaixo para criar sua conta no PersonAut
          </span>
        </div>

        <TextField
          placeholder="Digite seu nome"
          value={name}
          onChange={(target) => setName(target.target.value)}
          variant="outlined"
          required
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
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
          placeholder="Confirme sua senha"
        />

        <Button onClick={handleClick} fullWidth variant="contained">
          Registrar
        </Button>
      </div>

      {openModal && <LoadingModal text="Criando conta..." />}
    </div>
  );
}
