import { Button, TextField } from "@mui/material";
import TextModal from "../../TextModal";
import { useState } from "react";
import { useSession } from "@/app/_contexts/sessionContext";
import { useRouter } from "next/navigation";

type Props = {
  onClose: () => void;
};

export function LoginModal(props: Props) {
  const { handleLogin } = useSession();
  const route = useRouter();

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
        error = "E-mail é obrigatório";
      }

      setErrors((errors) => ({ ...errors, email: error }));
      return error;
    },
    password: () => {
      let error = "";

      if (!password) {
        error = "Senha é obrigatória";
      }

      setErrors((errors) => ({ ...errors, password: error }));
      return error;
    },
  };

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const email = event.target.value;
    setEmail(email);

    valid.email();
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;
    setPassword(password);

    valid.password();
  }

  async function handleClick() {
    if (valid.email() && valid.password()) {
      return;
    }
    await handleLogin(email, password);
    route.push("/personas");

    props.onClose();
  }

  return (
    <TextModal title="Login" isOpen onClose={props.onClose}>
      <div className="flex flex-col gap-2 w-96">
        <TextField
          label="E-mail"
          placeholder="Insira seu e-mail"
          value={email}
          onChange={handleEmailChange}
          variant="standard"
          required
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Senha"
          placeholder="Insira sua senha"
          value={password}
          onChange={handlePasswordChange}
          variant="standard"
          required
          error={!!errors.password}
          helperText={errors.password}
          type="password"
        />
        <Button onClick={handleClick} fullWidth variant="contained">
          Logar
        </Button>
      </div>
    </TextModal>
  );
}
