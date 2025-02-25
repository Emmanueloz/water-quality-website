import { QuestionRecoverUser } from "@/domain/models/QuestionRecover";
import { QuestionRecoverRepository } from "@/domain/repositories/QuestionRecoverRepository";
import { db } from "@/lib/db";

export class QuestionRecoverRepositoryImpl
  implements QuestionRecoverRepository
{
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
    const qResult = await this.pool.execute(
      `SELECT * FROM question_recover_user WHERE id_user = ?`,
      [idUser]
    );

    const [rows] = qResult as any[];

    const questionRecoverUser = rows[0];

    return {
      id: questionRecoverUser.id,
      questionNum: questionRecoverUser.question_num,
      answer: "********",
      idUser: questionRecoverUser.id_user,
    };
  }
  async update(questionRecoverUser: QuestionRecoverUser): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getIdUser(user: string): Promise<number | null> {
    const qResult = await this.pool.execute(
      `SELECT id FROM Usuarios WHERE Usuario = ?`,
      [user]
    );

    const [rows] = qResult as any[];

    return rows[0]?.id;
  }
}
