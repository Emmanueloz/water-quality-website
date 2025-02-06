import { db } from "@/lib/db";
import { ProfileRepository } from "@/domain/repositories/ProfileRepository";
import { Profile } from "@/domain/models/profile";

export class ProfileRepositoryImpl implements ProfileRepository {
    private static pool = db.getPool();

    async getProfileById(profileId: number): Promise<Profile[]> {
        const [rows]: any = await ProfileRepositoryImpl.pool.execute(
            `SELECT id, Usuario, Email, Contraseña AS password 
            FROM Usuarios 
            WHERE id = ?`,
            [profileId]
        );

        return rows as Profile[];
    }

    async updateProfile(profileId: number, email: string, password: string): Promise<void> {
        await ProfileRepositoryImpl.pool.execute(
            `UPDATE Usuarios 
            SET Email = ?, Contraseña = ? 
            WHERE id = ?`,
            [email, password, profileId]
        );
    }
}
