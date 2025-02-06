import { db } from "@/lib/db";

export async function resetPassword( id: number, password: string ) {
    const connection = db.getPool();
    const query = `
        UPDATE Usuarios
        SET Contraseña = ?
        WHERE id = ?;
    `;

    const result = await connection.query(query, [password, id]);

    return result;
}

export async function findByEmail(email: string): Promise<number | null> {
    const connection = db.getPool();
    const query = `SELECT id FROM Usuarios WHERE Email = ?`;
    const [rows]: any = await connection.query(query, [email]);

    if (rows.length === 0) {
        return null;
    }
    return rows[0].id;
}