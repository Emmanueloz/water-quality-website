import { db } from "@/lib/db";
import { ProfileRepository } from "@/domain/repositories/ProfileRepository";
import { Profile } from "@/domain/models/profile";

export class ProfileRepositoryImpl implements ProfileRepository {
    private static pool = db.getPool();

    async getProfileById(profileId: number): Promise<Profile | null> {
        const [rows]: any = await ProfileRepositoryImpl.pool.execute(
            `SELECT id, Usuario, Email as email, Contraseña AS password 
            FROM Usuarios 
            WHERE id = ?`,
            [profileId]
        );

        if (rows.length === 0) {
            return null;
        }

        return rows[0] as Profile; 
    }

    async updateProfile(profileId: number, email: string, password: string): Promise<void> {
        await ProfileRepositoryImpl.pool.execute(
            `UPDATE Usuarios 
            SET Email = ?, Contraseña = ? 
            WHERE id = ?`,
            [email, password, profileId]
        );
    }

    async updateEmail(profileId: number, email: string): Promise<void> {
        await ProfileRepositoryImpl.pool.execute(
            `UPDATE Usuarios 
            SET Email = ? 
            WHERE id = ?`,
            [email, profileId]
        );
    }

    async updatePassword(profileId: number, password: string): Promise<void> {
        await ProfileRepositoryImpl.pool.execute(
            `UPDATE Usuarios 
            SET Contraseña = ? 
            WHERE id = ?`,
            [password, profileId]
        );
    }
}
