import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";

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
    <BootstrapDialog id="loading-modal" open onClose={() => null}>
      <DialogContent dividers>
        <Typography variant="body1">{text}</Typography>
        <div className="w-full mt-2">
          <LinearProgress />
        </div>
      </DialogContent>
    </BootstrapDialog>
  );
}
