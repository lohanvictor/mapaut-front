import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type OptionModalProps = {
  isOpen: boolean;
  text: string;
  onCancel: () => void;
  onProceed: () => void;
  type?: "danger" | "normal" | "info";
};

export default function OptionModal({
  isOpen,
  onCancel,
  onProceed,
  text,
  type = "danger",
}: OptionModalProps) {
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
