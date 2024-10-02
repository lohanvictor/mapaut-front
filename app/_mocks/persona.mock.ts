import {
  AutismTypes,
  LanguageTypes,
  PersonaModel,
  PersonaModelList,
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
    "Assistir TV",
    "Jogar",
    "Ficar no celular",
    "Ficar no computador",
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
  nome: "Arroz de Festa",
  nivel_autismo: AutismTypes.soft,
  sensibilidade_som: true,
  sobre: "",
  id: '421'
};

export const LIST_PERSONAS_MOCK: PersonaModelList = {
  items: [
    {
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
        "Assistir TV",
        "Jogar",
        "Ficar no celular",
        "Ficar no computador",
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
      linguagem: LanguageTypes.verbalEco,
      manias: [
        "Balancar a perna",
        "Morder a unha",
        "Roer a caneta",
        "Ficar mexendo no cabelo",
      ],
      modelo: "1",
      nome: "João da Silva",
      nivel_autismo: AutismTypes.moderate,
      sensibilidade_som: true,
      sobre: "",
      id: '321'
    },
    {
      aspectos_sociais: [],
      atividades_acalmam: [],
      atividades_estressam: [],
      manias: [],
      aspectos_software: [],
      foto: "https://pm1.aminoapps.com/8018/ec9b52841ae5d91f60d28740147aa755418370a6r1-640-556v2_uhq.jpg",
      genero: "Masculino",
      idade: 12,
      linguagem: LanguageTypes.verbal,
      modelo: "2",
      nivel_autismo: AutismTypes.soft,
      sensibilidade_som: true,
      sobre:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin in lacus et quam dictum ultrices. Phasellus justo augue, cursus vitae lorem in, rutrum semper felis. In mattis ipsum vitae laoreet dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In semper varius neque, vitae vehicula lacus consectetur quis. Sed commodo efficitur venenatis. Nulla fringilla in ligula quis rhoncus. Nulla at elit sed odio rhoncus convallis sit amet non nibh. Nunc in lacinia elit. Morbi lacus arcu, cursus cursus sollicitudin ut, pulvinar quis diam. Nunc tellus ipsum, mollis quis suscipit ac, tempus at arcu.",
      nome: "Arroz de Festa",
      id: '123'
    },
  ],
  totalItems: 3,
  pagination: {
    pages: 1,
    page: 1,
  },
};