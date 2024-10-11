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

export default function PersonaModel2HelpModal(props: TextModalProps) {
  return (
    <TextModal isOpen onClose={props.onClose} title="Modelo 1">
      <Container>
        <Typography variant="body1">
          O modelo 2 do PersonAut representa a persona com informações gerais,
          porém dá a liberdade de apresentar informações por meio de textos
          descritivos. Os tópicos que serão respondidos são:
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
              Sobre: usado para condensar as informações da persona de forma
              mais flexível em forma de história.
            </li>
          </ul>
        </Typography>
      </Container>
    </TextModal>
  );
}
