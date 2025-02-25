import { QuestionRecoverUser } from "@/domain/models/QuestionRecover";

export interface QuestionRecoverRepository {
  create(questionRecoverUser: QuestionRecoverUser): Promise<void>;
  getQuestionRecoverUserById(idUser: number): Promise<QuestionRecoverUser>;
  update(questionRecoverUser: QuestionRecoverUser): Promise<void>;
}
