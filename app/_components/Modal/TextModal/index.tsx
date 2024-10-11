import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type TextModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
};

export default function TextModal(props: TextModalProps) {
  return (
    <BootstrapDialog open={props.isOpen} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={props.onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <Close />
      </IconButton>

      {/* Modal */}
      <DialogContent dividers>{props.children}</DialogContent>
    </BootstrapDialog>
  );
}
