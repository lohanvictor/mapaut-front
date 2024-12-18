"use client";

import ArrowBack from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../_lib/api";
import { Notification } from "../_lib/notification";
import { ValidationUtil } from "../_utils/validation.util";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState("");

  const route = useRouter();

  function handleBack() {
    route.replace("/login");
  }

  async function handleClick() {
    if (!ValidationUtil.isEmailValid(email)) {
      setEmailValid("Email inválido");
      return;
    }
    setEmailValid("");
    await api.post("/api/login/reset-password", { email });
    Notification.info("Verifique seu e-mail para redefinir sua senha.");
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
          <h1 className="text-slate-950 text-4xl font-medium">
            Esqueceu sua senha?
          </h1>
          <span className="text-slate-700">
            Preencha o campo abaixo com o e-mail que você deseja alterar para
            uma nova senha. Caso o e-mail exista, você receberá um link para
            redefinir sua senha. A senha deve possui{" "}
            <strong>no mínimo 8 caracteres</strong>. Verifique sua caixa de span
            ou lixo eletrônico, caso não tenha aparecido na caixa de entrada
            principal.
          </span>
        </div>

        <TextField
          placeholder="Digite o e-mail"
          value={email}
          onChange={(target) => setEmail(target.target.value)}
          variant="outlined"
          required
          fullWidth
          className="bg-white"
          helperText={emailValid}
          error={!!emailValid}
        />

        <Button
          disabled={!email}
          onClick={handleClick}
          fullWidth
          variant="contained"
        >
          Enviar link de recuperação
        </Button>
      </div>
    </div>
  );
}
