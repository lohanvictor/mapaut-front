export type PersonaModel = {
  foto: string; // Passo 1
  nome: string; // Passo 1
  idade: number; // Passo 1
  genero: string; // Passo 1
  linguagem: string | LanguageTypes; // Passo 2
  sensibilidade_som: boolean; // Passo 2
  nivel_autismo: string | AutismTypes; // Passo 2
  modelo: string; // Passo 0
  atividades_estressam: string[]; // Passo 3
  atividades_acalmam: string[]; // Passo 4
  manias: string[]; // Passo 5
  aspectos_software: string[]; // Passo 6
  aspectos_sociais: string[]; // Passo 7
  sobre: string; // Passo 3
  id: string;
  cognicao: boolean[];
  comportamento: boolean[];
  comunicacao: boolean[];
  interacao: boolean[];
};
export enum LanguageTypes {
  verbal = "Verbal",
  nonVerbal = "Não Verbal",
  verbalEco = "Verbal Ecolálica",
}

export enum AutismTypes {
  soft = "Leve",
  moderate = "Moderado",
  severe = "Severo",
}

export type PersonaModelList = {
  items: PersonaModel[];
  totalItems: number;
  pagination: {
    pages: number;
    page: number;
  };
};
