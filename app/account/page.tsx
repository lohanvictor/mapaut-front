"use client";

import { AccountCircle } from "@mui/icons-material";
import { DeleteAccountButton } from "./_components/DeleteAccountButton";
import { Button, TextField } from "@mui/material";
import { useSession } from "../_contexts/sessionContext";
import { useEffect, useMemo, useState } from "react";
import { PasswordInput } from "../_components/PasswordInput";
import LoadingModal from "../_components/_modal/LoadingModal";

export default function Account() {
  const { login, updateAccount } = useSession();
  const firstName = useMemo(() => {
    if (!login.name) return "";
    const firstName = login.name.split(" ")[0];
    return firstName.at(0)?.toUpperCase() + firstName.slice(1);
  }, [login.name]);

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen((open) => !open);

  const [account, setAccount] = useState({
    name: "",
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

      if (!account.password && !account.confirmedPassword) {
        return false;
      }

      if (account.password.length < 6 || account.confirmedPassword.length < 6) {
        error = "A senha deve ter no mínimo 6 caracteres";
      }

      if (account.password !== account.confirmedPassword) {
        error = "As senhas não coincidem";
      }

      setErrors((errors) => ({
        ...errors,
        password: error,
      }));

      return Boolean(error);
    },
  };
  useEffect(() => {
    setAccount((account) => ({
      ...account,
      name: login.name,
    }));
  }, [login.name]);

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

  async function handleUpdateAccount() {
    const errors = [valid.name(), valid.password()];
    if (errors.some((error) => error)) {
      return;
    }

    toggleModal();
    try {
      await updateAccount(account.name, account.password);
    } catch (error) {
      console.error("Erro ao atualizar conta", error);
    } finally {
      toggleModal();
    }
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
        value={login.email}
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
        placeholder="Nova senha"
      />

      <PasswordInput
        error={errors.password}
        password={account.confirmedPassword}
        setPassword={handleConfirmedPasswordChange}
        placeholder="Confirme a nova senha"
      />

      <Button className="self-end" onClick={handleUpdateAccount}>
        Atualizar conta
      </Button>

      {modalOpen && <LoadingModal text="Atualizando conta" />}
    </div>
  );
}
