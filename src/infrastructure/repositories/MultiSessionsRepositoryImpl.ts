import { IMultiSessions } from "@/domain/models/MultiSessions";
import { IMultiSessionsRepository } from "@/domain/repositories/MultiSessionsRepository";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export class MultiSessionsRepositoryImpl implements IMultiSessionsRepository {
  private pool = db.getPool();

  async create(multiSessions: IMultiSessions): Promise<IMultiSessions> {
    const query = `
      INSERT INTO multi_sessions (user_agent, x_forwarded_for, user_id, created_at, token)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
      multiSessions.userAgent,
      multiSessions.xForwardedFor,
      multiSessions.userId,
      multiSessions.createdAt,
      multiSessions.token,
    ];

    const qResult = await this.pool.execute(query, values);

    const [rows] = qResult as [ResultSetHeader, any];

    console.log(qResult);

    return {
      ...multiSessions,
      id: rows.insertId,
    };
  }
  async getAllByUserId(userId: number): Promise<IMultiSessions[]> {
    throw new Error("Method not implemented.");
  }
  async deleteByToken(token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async deleteByUserId(userId: number, excludeToken: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
