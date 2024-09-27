import {
  AutismTypes,
  LanguageTypes,
  PersonaModel,
} from "../@types/persona.type";

export const PERSONA_MOCK: PersonaModel = {
  aspectos_sociais: [
    "Gosta de estar com amigos",
    "Gosta de estar com a família",
    "Gosta de estar com outras pessoas",
  ],
  atividades_acalmam: [
    "Ficar sozinho",
    "Ler um livro",
    "Ouvir música",
    "Ficar em silêncio",
  ],
  atividades_estressam: [
    "Luzes altas",
    "Muito barulho",
    "Muitas pessoas",
    "Ficar parado",
  ],
  aspectos_software: [
    "Gosta de jogos",
    "Gosta de redes sociais",
    "Gosta de aplicativos",
    "Gosta de assistir vídeos",
  ],
  foto: "https://pm1.aminoapps.com/8018/ec9b52841ae5d91f60d28740147aa755418370a6r1-640-556v2_uhq.jpg",
  genero: "Masculino",
  idade: 25,
  linguagem: LanguageTypes.verbal,
  manias: [
    "Balancar a perna",
    "Morder a unha",
    "Roer a caneta",
    "Ficar mexendo no cabelo",
  ],
  modelo: "1",
  nome: "João",
  nivel_autismo: AutismTypes.soft,
  sensibilidade_som: true,
  sobre: "",
};
