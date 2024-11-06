import Typography from "@mui/material/Typography";
import TextModal from "../../TextModal";

type AboutPersonaModalProps = {
  onClose: () => void;
  name: string;
};

export default function AboutPersonaModal(props: AboutPersonaModalProps) {
  return (
    <TextModal isOpen onClose={props.onClose} title={`Sobre ${props.name}`}>
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
    </TextModal>
  );
}
