import { Typography } from "@mui/material";
import TextModal from "../../TextModal";
import styled from "styled-components";

const Container = styled.div`
  max-height: 50vh;
  overflow-y: auto;
`;

type TextModalProps = {
  onClose: () => void;
};

export default function PersonaModel1HelpModal(props: TextModalProps) {
  return (
    <TextModal isOpen onClose={props.onClose} title="Modelo 1">
      <Container>
        <Typography variant="body1">
          O modelo 1 do PersonAut representa a persona com informações de
          maneira resumida, por meio de tópicos. Os tópicos que serão
          respondidos são:
        </Typography>
        <Typography style={{ paddingLeft: 16 }}>
          <ul style={{ listStyleType: "'- '" }}>
            <li>
              <strong>Características demográficas:</strong> usado nos modelos tradicionais,
              composto por nome, idade, gênero e foto.
            </li>
            <li>
              <strong>Características gerais:</strong> é composto por informações gerais sobre o
              nível de autismo e o tipo de linguagem.
            </li>
            <li>
              <strong>Atividades que acalmam:</strong> lista de atividades ou situações que fazem
              o autista ficar calmo.
            </li>
            <li>
              <strong>Atividades que estressam:</strong> lista de atividades ou situações que
              fazem o autista ficar estressado.
            </li>
            <li>
              <strong>Aspectos sociais e familiares:</strong> descreve a relação do autista com
              os pais, demais familiares, terapeutas, colegas de escola e demais
              aspectos sociais e afins.
            </li>
            <li>
              <strong>Aspectos tecnológicos de software:</strong> descreve a relação do autista
              com as tecnologias e suas afinidades.
            </li>
            <li>
              <strong>Esteriotipias e Manias:</strong> para descrever as manias e estereotipias
              do comportamento do autista.
            </li>
          </ul>
        </Typography>
      </Container>
    </TextModal>
  );
}
