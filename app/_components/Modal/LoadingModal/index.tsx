import {
  Dialog,
  DialogContent,
  LinearProgress,
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

type LoadingModalProps = {
  text: string;
};

export default function LoadingModal({ text }: LoadingModalProps) {
  return (
    <BootstrapDialog open onClose={() => null}>
      <DialogContent dividers>
        <Typography variant="body1">{text}</Typography>
        <div className="w-full mt-2">
          <LinearProgress />
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
}
