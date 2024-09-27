export enum LanguageTypes {
  verbal = "verbal",
  nonVerbal = "naoVerbal",
  verbalEco = "verbalEcolalica",
}

export const LANGUAGE_TYPES_LABEL: Record<LanguageTypes, string> = {
  [LanguageTypes.verbal]: "Verbal",
  [LanguageTypes.nonVerbal]: "Não verbal",
  [LanguageTypes.verbalEco]: "Verbal Ecolálica",
};

export enum AutismTypes {
  soft = "leve",
  moderate = "moderado",
  severe = "severo",
}

export const AUTISM_TYPES_LABEL: Record<AutismTypes, string> = {
  [AutismTypes.soft]: "Leve",
  [AutismTypes.moderate]: "Moderado",
  [AutismTypes.severe]: "Severo",
};
