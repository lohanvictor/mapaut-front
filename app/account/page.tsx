"use client";

import { AccountCircle } from "@mui/icons-material";
import { DeleteAccountButton } from "./_components/DeleteAccountButton";
import { TextField } from "@mui/material";
import { useSession } from "../_contexts/sessionContext";
import { useEffect, useMemo, useState } from "react";
import { PasswordInput } from "../_components/PasswordInput";

export default function Account() {
  const { login } = useSession();
  const firstName = useMemo(() => {
    if (!login.name) return "";
    const firstName = login.name.split(" ")[0];
    return firstName.at(0)?.toUpperCase() + firstName.slice(1);
  }, []);

  const [account, setAccount] = useState({
    name: login.name,
    password: "",
    confirmedPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    password: "",
  });
  const valid = {
    name: () => {
      let error = "";
      if (!account.name) {
        error = "Nome é obrigatório";
      }

      setErrors((errors) => ({
        ...errors,
        name: error,
      }));

      return Boolean(error);
    },
    password: () => {
      let error = "";
      if (!!account.password || !!account.confirmedPassword) {
        error = "Senha é obrigatória";
      }
      if (account.password && account.password !== account.confirmedPassword) {
        error = "As senhas não coincidem";
      }

      setErrors((errors) => ({
        ...errors,
        password: error,
      }));

      return Boolean(error);
    },
  };

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAccount((account) => ({
      ...account,
      name: event.target.value,
    }));
  }

  function handlePasswordChange(password: string) {
    setAccount((account) => ({
      ...account,
      password,
    }));
  }

  function handleConfirmedPasswordChange(password: string) {
    setAccount((account) => ({
      ...account,
      confirmedPassword: password,
    }));
  }

  return (
    <div className="flex-1 flex flex-col items-center gap-4 p-6 overflow-y-auto">
      <div className="w-full flex flex-row justify-between">
        <div className="flex-1 flex flex-row gap-2 items-center">
          <AccountCircle className="text-4xl text-slate-900" />
          <span className="text-4xl text-slate-900 font-medium">
            Tudo bem, {firstName}?
          </span>
        </div>

        <DeleteAccountButton />
      </div>

      <TextField
        label="E-mail"
        defaultValue={login.email}
        variant="standard"
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
        fullWidth
      />

      <TextField
        placeholder="Nome completo"
        label="Nome completo"
        value={account.name}
        onChange={handleNameChange}
        error={!!errors.name}
        helperText={errors.name}
        className="bg-white"
        fullWidth
      />

      <PasswordInput
        error={errors.password}
        password={account.password}
        setPassword={handlePasswordChange}
      />

      <PasswordInput
        error={errors.password}
        password={account.confirmedPassword}
        setPassword={handleConfirmedPasswordChange}
        placeholder="Confirme a senha"
      />
    </div>
  );
}
