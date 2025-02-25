import { QuestionRecoverUser } from "@/domain/models/QuestionRecover";
import { QuestionRecoverRepository } from "@/domain/repositories/QuestionRecoverRepository";
import { db } from "@/lib/db";

export class QuestionRecoverRepositoryImpl implements QuestionRecoverRepository {
  private pool = db.getPool();

  async create(questionRecoverUser: QuestionRecoverUser): Promise<void> {
    const query = `
            INSERT INTO question_recover_user (question_num, answer, id_user) 
            VALUES (?, ?, ?)
        `;
    const [insertResult] = await this.pool.query(query, [
      questionRecoverUser.questionNum,
      questionRecoverUser.answer,
      questionRecoverUser.idUser,
    ]);

    console.log(insertResult);
  }
  async getQuestionRecoverUserById(
    idUser: number
  ): Promise<QuestionRecoverUser> {
    throw new Error("Method not implemented.");
  }
  async update(questionRecoverUser: QuestionRecoverUser): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
