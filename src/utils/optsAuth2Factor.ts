import { db } from "@/lib/db";
import { randomBytes } from 'crypto';

async function createAuth2Factor(userId: number, token: string, expiresAt: Date): Promise<void> {
    const connection = db.getPool();
    const query = `INSERT INTO TwoFactorTokens (userId, token, expiresAt) VALUES (?, ?, ?)`;
    const [result] = await connection.query(query, [userId, token, expiresAt]);

}

export async function findByToken(token: string): Promise<any | null> {
    const connection = db.getPool();
    const query = `SELECT id, userId FROM TwoFactorTokens WHERE token = ? AND expiresAt > ?`;
    const [rows]: any = await connection.query(query, [token, new Date()]);
    if (rows.length === 0) {
        return null;
    }
    return {
        id: rows[0].id,
        userId: rows[0].userId,
    };
}

export function generateToken(): string {
    return randomBytes(32).toString('hex');
}

export async function saveAuth2Factor(userId: number): Promise<string> {
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutos
    await deleteExpiredTokens();
    await createAuth2Factor(userId, token, expiresAt);
    return token;
}

export async function deleteAuth2Factor(id: number): Promise<void> {
    const connection = db.getPool();
    const query = `DELETE FROM TwoFactorTokens WHERE id = ?`;
    await connection.query(query, [id]);
}
// hacer una función para elimanar todos los tokens ya expirados
async function deleteExpiredTokens(): Promise<void> {
    const connection = db.getPool();
    const query = `DELETE FROM TwoFactorTokens WHERE expiresAt < ?`;
    await connection.query(query, [new Date()]);
}
