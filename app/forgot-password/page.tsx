"use client";

import { ArrowBack } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../_lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const route = useRouter();

  function handleBack() {
    route.replace("/login");
  }

  async function handleClick() {
    await api.post("/api/login/reset-password", { email });
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
            redefinir sua senha. A senha deve possui
            <strong>no mínimo 8 caracteres</strong>.
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
