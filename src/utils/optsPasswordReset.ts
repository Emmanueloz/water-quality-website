import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2";
import bcrypt from "bcryptjs";



export async function createPasswordReset(userId: number, token: string, expiresAt: Date, type: string): Promise<number> {
    const connection = db.getPool();
    const query = `INSERT INTO password_reset (user_id, token, expires_at, type) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.query<ResultSetHeader>(query, [userId, token, expiresAt, type]);
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
export async function findByCodeSMS(codeSMS: string): Promise<PasswordReset | null> {
    try {
        const connection = db.getPool();
        const query = `
            SELECT id, user_id as userId, token, expires_at as expiresAt 
            FROM password_reset 
            WHERE token = ? AND type = ? AND expires_at > ?
        `;

        const [rows]: any = await connection.query(query, [codeSMS, "sms", new Date()]);

        return rows[0] as PasswordReset || null;
    } catch (error) {
        console.error("Error fetching password reset record:", error);
        return null;
    }
}

// Actualizar el registro con el nuevo token
export async function updatePasswordReset(id: number, token: string): Promise<void> {
    const connection = db.getPool();
    const query = `UPDATE password_reset SET token = ? WHERE id = ?`;
    await connection.query(query, [token, id]);
}


export async function deletePasswordReset(id: number): Promise<void> {
    const connection = db.getPool();
    const query = `DELETE FROM password_reset WHERE id = ?`;
    await connection.query(query, [id]);
}
