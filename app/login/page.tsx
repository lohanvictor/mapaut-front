"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useSession } from "../_contexts/sessionContext";
import { useRouter } from "next/navigation";
import { PasswordInput } from "../_components/PasswordInput";
import LoadingModal from "../_components/_modal/LoadingModal";
import { Notification } from "../_lib/notification";
import { isAxiosError } from "axios";
import { ValidationUtil } from "../_utils/validation.util";

export default function Login() {
  const { handleLogin } = useSession();
  const route = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prev) => !prev);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const valid = {
    email: () => {
      let error = "";

      if (!ValidationUtil.isEmailValid(email)) {
        error = "Email inválido";
      }

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

  async function handleClick() {
    const validationErrors = [valid.email(), valid.password()];
    const isValid = validationErrors.every((validation) => !validation);
    if (!isValid) {
      return;
    }

    toggleModal();
    try {
      await handleLogin(email, password);
      Notification.info("Redirecionando para a página inicial");
      toggleModal();
      route.push("/");
    } catch (error) {
      if (isAxiosError(error)) {
        Notification.error(
          error.response?.data.error || "Erro ao realizar login"
        );
      }
      toggleModal();
    }
  }

  function handleSignUp() {
    route.push("/signup");
  }

  function handleForgotPassword() {
    route.push("/forgot-password");
  }

  function handleAboutSystem() {
    route.push("/about");
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
      <div className="flex flex-col w-96 gap-4 p-6 bg-slate-100 rounded-md">
        <h2 className="text-sky-800 text-4xl self-center font-bold">
          PersonAut | Login
        </h2>
        <Button id="sem-conta-button" onClick={handleSignUp} size="small">
          Não possui conta?
        </Button>
        <TextField
          placeholder="E-mail"
          value={email}
          onChange={onChangeEmail}
          variant="outlined"
          required
          fullWidth
          id="email-input"
          error={!!errors.email}
          helperText={errors.email}
          className="bg-white"
        />

        <PasswordInput
          error={errors.password}
          password={password}
          setPassword={setPassword}
        />

        <Button
          id="esqueci-senha-button"
          onClick={handleForgotPassword}
          size="small"
        >
          Esqueci minha senha
        </Button>

        <Button id="logar-button" onClick={handleClick} variant="contained">
          Logar
        </Button>

        {openModal && <LoadingModal text="Entrando no sistema..." />}
      </div>

      <Button onClick={handleAboutSystem} variant="text" className="mt-2">
        Sobre o sistema
      </Button>
    </div>
  );
}
