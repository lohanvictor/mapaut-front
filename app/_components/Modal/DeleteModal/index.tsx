import {
  Button,
  Dialog,
  DialogContent,
  styled,
  Typography,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type DeleteModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onProceed: () => void;
};

export default function DeleteModal(props: DeleteModalProps) {
  return (
    <BootstrapDialog open={props.isOpen} onClose={() => null}>
      <DialogContent dividers>
        <Typography variant="body1">
          Você realmente deseja excluir esta persona?
        </Typography>
        <div className="flex flex-row gap-4 w-full justify-between mt-6">
          <Button variant="text" onClick={props.onCancel}>
            Não
          </Button>
          <Button variant="contained" color="error" onClick={props.onProceed}>
            Sim
          </Button>
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
}
