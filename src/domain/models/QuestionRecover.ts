enum SecurityQuestion {
  FIRST_PET_NAME = "¿Cuál es el nombre de tu primera mascota?",
  HIGH_SCHOOL_GRADUATION_YEAR = "¿En qué año te graduaste de la secundaria?",
  FAVORITE_FICTIONAL_CHARACTER = "¿Cuál es el nombre de tu personaje ficticio favorito?",
}

const SecurityQuestionText: Record<SecurityQuestion, string> = {
    [SecurityQuestion.FIRST_PET_NAME]: "¿Cuál es el nombre de tu primera mascota?",
    [SecurityQuestion.HIGH_SCHOOL_GRADUATION_YEAR]: "¿En qué año te graduaste de la secundaria?",
    [SecurityQuestion.FAVORITE_FICTIONAL_CHARACTER]: "¿Cuál es el nombre de tu personaje ficticio favorito?"
  };

interface QuestionRecoverUser {
  id: number;
  questionNum: number;
  answer: string;
  idUser: number;
}
