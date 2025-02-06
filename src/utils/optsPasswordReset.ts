import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2";
import bcrypt from "bcryptjs";



export async function createPasswordReset(userId: number, token: string, expiresAt: Date): Promise<number> {
    const connection = db.getPool();
    const query = `INSERT INTO password_reset (user_id, token, expires_at) VALUES (?, ?, ?)`;
    const [result] = await connection.query<ResultSetHeader>(query, [userId, token, expiresAt]);
    return result.insertId;
}



export async function findByToken(token: string): Promise<PasswordReset | null> {
    const connection = db.getPool();
    const query = `SELECT id, user_id as userId, token, expires_at as expiresAt FROM password_reset`;
    
    const [rows]: any = await connection.query(query, [token]);

    for (const row of rows) {
        const isMatch = await bcrypt.compare(token, row.token);
        if (isMatch) {
            return {
                id: row.id,
                userId: row.userId,
                token: row.token,
                expiresAt: row.expiresAt,
            };
        }
    }

    return null;
}

export async function deletePasswordReset(id: number): Promise<void> {
    const connection = db.getPool();
    const query = `DELETE FROM password_reset WHERE id = ?`;
    await connection.query(query, [id]);
}
