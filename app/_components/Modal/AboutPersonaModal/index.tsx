import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
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

type AboutPersonaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

export default function AboutPersonaModal(props: AboutPersonaModalProps) {
  return (
    <BootstrapDialog open={props.isOpen} onClose={props.onClose}>
      <DialogTitle>Sobre {props.name}</DialogTitle>
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
      <DialogContent dividers>
        <Typography variant="body1">
          Esta seção é para você descrever sobre a persona em forma de história,
          itens como:
        </Typography>
        <Typography style={{ paddingLeft: 16 }}>
          <ul style={{ listStyleType: "'- '" }}>
            <li>Atividades que acalmam</li>
            <li>Atividades que estressam</li>
            <li>Aspectos sociais e familiares</li>
            <li>Aspectos tecnológicos de software</li>
            <li>Esteriotipias e Manias</li>
          </ul>
        </Typography>
      </DialogContent>
    </BootstrapDialog>
  );
}
