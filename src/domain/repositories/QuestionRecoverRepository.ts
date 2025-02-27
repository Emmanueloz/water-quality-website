import { QuestionRecoverUser } from "@/domain/models/QuestionRecover";

export interface QuestionRecoverRepository {
  create(idUser:number,questions: QuestionRecoverUser[]): Promise<void>;
  getQuestionRecoverUserById(idUser: number,showAnswer: boolean): Promise<QuestionRecoverUser[]>;
  update(idUser:number,questions: QuestionRecoverUser[]): Promise<void>;
  isValidAnswer(id: number, answer: string, idUser: number): Promise<boolean>;
}
