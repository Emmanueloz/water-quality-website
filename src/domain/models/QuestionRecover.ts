export enum SecurityQuestion {
  FIRST_PET_NAME,
  HIGH_SCHOOL_GRADUATION_YEAR,
  FAVORITE_FICTIONAL_CHARACTER,
}

export const SecurityQuestionText: Record<SecurityQuestion, string> = {
  [SecurityQuestion.FIRST_PET_NAME]:
    "¿Cuál es el nombre de tu primera mascota?",
  [SecurityQuestion.HIGH_SCHOOL_GRADUATION_YEAR]:
    "¿En qué año te graduaste de la secundaria?",
  [SecurityQuestion.FAVORITE_FICTIONAL_CHARACTER]:
    "¿Cuál es el nombre de tu personaje ficticio favorito?",
};

export interface QuestionRecoverUser {
  id: number;
  questionNum: number;
  answer: string;
  idUser: number;
}
