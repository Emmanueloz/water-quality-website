// src/infrastructure/repositories/UsuarioRepositoryImpl.ts
import { db } from "@/lib/db";
import { Admin } from "@/domain/models/Admin";
import { ResultSetHeader } from "mysql2";
import bcrypt from 'bcryptjs'; // Asegúrate de instalar bcryptjs para encriptar contraseñas

export class AdminRepositoryImpl {
    private pool = db.getPool();

    // Verifica si el usuario tiene rol de administrador
    async verifyRoleForUser(userId: number): Promise<boolean> {
        const [rows] = await this.pool.execute(
            `SELECT r.role
            FROM Usuarios u
            JOIN Roles r ON u.role = r.id
            WHERE u.id = ?`,
            [userId]
        );
        return (rows as { role: string }[])[0]?.role === "admin";
    }

    // Crea un nuevo administrador (o usuario con rol 'admin')
    async createAdmin(user: Omit<Admin, "id">, adminUserId: number): Promise<Admin> {
        const isAdmin = await this.verifyRoleForUser(adminUserId);
        if (!isAdmin) {
            throw new Error('No tienes permisos para crear un administrador');
        }

        // Encriptamos la contraseña
        const hashedPassword = await bcrypt.hash(user.Contraseña, 10);

        const [result] = await this.pool.execute<ResultSetHeader>(
            `INSERT INTO Usuarios (usuario, password, role)
            VALUES (?, ?, ?)`,
            [user.Usuario, hashedPassword, 'Admin']
        );

        const newUser: Admin = {
            id: result.insertId,
            ...user,
            Roles: 'Admin',  // Aseguramos que el rol sea 'admin'
        };

        return newUser;
    }
}
