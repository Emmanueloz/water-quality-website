import { db } from "@/lib/db";
import { Usuario } from "@/tipos/tipos";

export async function resetPassword(id: number, password: string) {
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

export async function findByPhoneNumber(phoneNumber: string): Promise<number | null> {
    const connection = db.getPool();
    const query = `SELECT id FROM Usuarios WHERE phone_number = ?`;
    const [rows]: any = await connection.query(query, [phoneNumber]);

    if (rows.length === 0) {
        return null;
    }
    return rows[0].id;
}

export async function findById(id: number): Promise<Usuario> {
    const connection = db.getPool();
    const [rows] = await connection.execute(
        `SELECT 
        u.id, 
        u.Usuario, 
        u.Contraseña,
        u.is_two_factor_enabled AS isTwoFactorEnabled,
        u.Email AS email,
        r.Rol AS rol, 
        COALESCE(GROUP_CONCAT(m.name SEPARATOR ','), '') AS modules,
        JSON_ARRAYAGG(
                JSON_OBJECT('idRoute', pm.id_module, 'permissions',  pm.permissions)
                ) AS modulesPermissions
      FROM Usuarios u
      INNER JOIN Rol r ON u.Roles = r.id
      LEFT JOIN privilegios p ON u.id_privilegio = p.id
      LEFT JOIN priv_mod pm ON p.id = pm.id_privilegio
      LEFT JOIN modulos m ON pm.id_module = m.id
      WHERE u.id = ?
      GROUP BY u.id, u.Usuario, u.Contraseña, r.Rol;
        `,
        [id]
    );
    const usuarios = rows as Usuario[];

    return usuarios[0];
}