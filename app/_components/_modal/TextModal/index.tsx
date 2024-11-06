import { Close } from "@mui/icons-material";
import { styled } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

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
