import {
  Button,
  Dialog,
  DialogContent,
  styled,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type DangerModalProps = {
  isOpen: boolean;
  text: string;
  onCancel: () => void;
  onProceed: () => void;
  type?: "danger" | "normal" | "info";
};

export default function Modal({
  isOpen,
  onCancel,
  onProceed,
  text,
  type = "danger",
}: DangerModalProps) {
  const color = useMemo(() => {
    if (type === "danger") return "error";
    if (type === "info") return "info";

    return "primary";
  }, [type]);
  return (
    <BootstrapDialog open={isOpen} onClose={() => null}>
      <DialogContent dividers>
        <Typography variant="body1">{text}</Typography>
        <div className="flex flex-row gap-4 w-full justify-between mt-6">
          <Button variant="text" onClick={onCancel}>
            Não
          </Button>
          <Button variant="contained" color={color} onClick={onProceed}>
            Sim
          </Button>
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
}
