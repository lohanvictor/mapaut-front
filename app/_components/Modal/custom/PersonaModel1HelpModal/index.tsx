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
              Características demográficas: usado nos modelos tradicionais,
              composto por nome, idade, gênero e foto.
            </li>
            <li>
              Características gerais: é composto por informações gerais sobre o
              nível de autismo e o tipo de linguagem.
            </li>
            <li>
              Atividades que acalmam: lista de atividades ou situações que fazem
              o autista ficar calmo.
            </li>
            <li>
              Atividades que estressam: lista de atividades ou situações que
              fazem o autista ficar estressado.
            </li>
            <li>
              Aspectos sociais e familiares: descreve a relação do autista com
              os pais, demais familiares, terapeutas, colegas de escola e demais
              aspectos sociais e afins.
            </li>
            <li>
              Aspectos tecnológicos de software: descreve a relação do autista
              com as tecnologias e suas afinidades.
            </li>
            <li>
              Esteriotipias e Manias: para descrever as manias e estereotipias
              do comportamento do autista.
            </li>
          </ul>
        </Typography>
      </Container>
    </TextModal>
  );
}
