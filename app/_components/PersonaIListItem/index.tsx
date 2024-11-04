import { PersonaModel } from "@/app/_types/persona.type";
import { Container } from "./styled";
import { MoreVert } from "@mui/icons-material";

type PersonaListItemProps = {
  persona: PersonaModel;
  onClick: () => void;
};

export default function PersonaListItem(props: PersonaListItemProps) {
  return (
    <Container className="shadow-md hover:bg-slate-300" onClick={props.onClick}>
      <img src={props.persona.foto} alt={props.persona.nome} className="img" />

      <div className="flex flex-col">
        <span className="text-slate-950 text-xl">{props.persona.nome}</span>
        <span className="text-slate-950">
          {props.persona.genero}, {props.persona.idade} anos
        </span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <MoreVert color="action" />
      </div>
    </Container>
  );
}
