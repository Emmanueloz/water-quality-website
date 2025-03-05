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

    return {
      ...multiSessions,
      id: rows.insertId,
    };
  }
  async getAllByUserId(userId: number): Promise<IMultiSessions[]> {
    const query = `
      SELECT * FROM multi_sessions WHERE user_id = ?
    `;

    const qResult = await this.pool.query(query, userId);

    const [rows] = qResult as any[];

    //console.log(qResult);

    return rows.map((row: any) => ({
      id: row.id,
      userAgent: row.user_agent,
      xForwardedFor: row.x_forwarded_for,
      userId: row.user_id,
      createdAt: row.created_at,
      token: row.token,
    }));
  }

  async deleteByToken(userId: number, token: string): Promise<boolean> {
    const query = `
      DELETE FROM multi_sessions
      WHERE user_id = ? AND token = ?
    `;

    const values = [userId, token];

    const qResult = await this.pool.execute(query, values);
    const [rows] = qResult as [ResultSetHeader, any];

    console.log(qResult);

    return rows.affectedRows === 1;
  }
  async deleteByUserId(userId: number, excludeToken: string): Promise<void> {
    const query = `
      DELETE FROM multi_sessions
      WHERE user_id = ? AND token != ?
    `;

    const values = [userId, excludeToken];

    const qResult = await this.pool.execute(query, values);
    const [rows] = qResult as [ResultSetHeader, any];

    console.log(qResult);
  }
}
