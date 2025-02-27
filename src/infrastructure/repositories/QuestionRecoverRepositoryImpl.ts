import { QuestionRecoverUser } from "@/domain/models/QuestionRecover";
import { QuestionRecoverRepository } from "@/domain/repositories/QuestionRecoverRepository";
import { db } from "@/lib/db";

export class QuestionRecoverRepositoryImpl
  implements QuestionRecoverRepository
{
  private pool = db.getPool();

  async create(
    idUser: number,
    questions: QuestionRecoverUser[]
  ): Promise<void> {
    const query = `
            INSERT INTO question_recover_user (question_num, answer, id_user) 
            VALUES ${questions.map(() => {
              return `(?, ?, ?)`;
            })}
        `;

    const values = questions.flatMap((q) => [q.questionNum, q.answer, idUser]);

    const [insertResult] = await this.pool.execute(query, values);

    console.log(insertResult);
  }
  async getQuestionRecoverUserById(
    idUser: number,
    showAnswer: boolean = false
  ): Promise<QuestionRecoverUser[]> {
    const qResult = await this.pool.execute(
      `SELECT * FROM question_recover_user WHERE id_user = ?`,
      [idUser]
    );

    const [rows] = qResult as any[];

    console.log(rows);

    return rows.map((row: any) => ({
      id: row.id,
      questionNum: row.question_num,
      answer: showAnswer ? row.answer : "********",
      idUser: row.id_user,
    }));
  }

  async isValidAnswer(
    id: number,
    answer: string,
    idUser: number
  ): Promise<boolean> {
    const qResult = await this.pool.execute(
      `SELECT * FROM question_recover_user WHERE id = ? AND answer = ? AND id_user = ?`,
      [id, answer, idUser]
    );

    const [rows] = qResult as any[];

    return rows.length > 0;
  }

  async update(
    idUser: number,
    questions: QuestionRecoverUser[]
  ): Promise<void> {
    const query = `
     UPDATE question_recover_user
      SET
      question_num = CASE id
        ${questions
          .map(() => {
            return `WHEN ? THEN ?`;
          })
          .join(" ")}
      END,
      answer = CASE ID
        ${questions
          .map(() => {
            return `WHEN ? THEN ?`;
          })
          .join(" ")}
      END
      WHERE id IN (${questions.map(() => "?").join(",")})
    `;

    const questionNUmValues = questions.flatMap((q) => [q.id, q.questionNum]);
    const answerValues = questions.flatMap((q) => [q.id, q.answer]);
    const idValues = questions.map((q) => q.id);
    const values = [...questionNUmValues, ...answerValues, ...idValues];

    const [updateResult] = await this.pool.execute(query, values);

    console.log(updateResult);
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
