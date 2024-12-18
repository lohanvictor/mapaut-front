"use client";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { DeleteAccountButton } from "./_components/DeleteAccountButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSession } from "../_contexts/sessionContext";
import { useEffect, useMemo, useState } from "react";
import { PasswordInput } from "../_components/PasswordInput";
import LoadingModal from "../_components/_modal/LoadingModal";
import { Notification } from "../_lib/notification";

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

      if (account.password.length < 8 || account.confirmedPassword.length < 8) {
        error = "A senha deve ter no mínimo 8 caracteres";
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
      Notification.success("Conta atualizada com sucesso!");
    } catch {
      Notification.error("Erro ao atualizar conta");
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

      <span className="text-slate-950 text-left self-start">
        Para mudar o nome, alterar o campo abaixo.
      </span>

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

      <span className="text-slate-950 text-left self-start">
        Para mudar a senha, colocar a nova senha abaixo e confirmação da nova
        senha.
      </span>

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
