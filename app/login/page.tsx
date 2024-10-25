"use client";

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useSession } from "../_contexts/sessionContext";
import { useRouter } from "next/navigation";
import { PasswordInput } from "../_components/PasswordInput";
import LoadingModal from "../_components/_modal/LoadingModal";

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
      toggleModal();
      route.push("/");
    } catch (error) {
      toggleModal();
      console.error(error);
    }
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

        <PasswordInput
          error={errors.password}
          password={password}
          setPassword={setPassword}
        />

        <Button onClick={() => null} size="small">
          Esqueci minha senha
        </Button>

        <Button onClick={handleClick} variant="contained">
          Logar
        </Button>

        {openModal && <LoadingModal text="Entrando no sistema..." />}
      </div>
    </div>
  );
}
