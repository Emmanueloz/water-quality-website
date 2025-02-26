import { QuestionRecoverUser } from "@/domain/models/QuestionRecover";

export interface QuestionRecoverRepository {
  create(idUser:number,questions: QuestionRecoverUser[]): Promise<void>;
  getQuestionRecoverUserById(idUser: number): Promise<QuestionRecoverUser[]>;
  update(questionRecoverUser: QuestionRecoverUser): Promise<void>;
  isValidAnswer(id: number, answer: string, idUser: number): Promise<boolean>;
}
