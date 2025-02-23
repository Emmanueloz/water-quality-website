
import { db } from "@/lib/db";
import { Game } from "@/domain/models/Game";
import { GameRepository } from "@/domain/repositories/GameRepository";
import { ResultSetHeader } from "mysql2";


export class GameRepositoryImpl implements GameRepository {

    private static pool = db.getPool();
    async verifyRoleForUser(userId: number): Promise<boolean> {
        const [rows] = await GameRepositoryImpl.pool.execute(`SELECT r.Rol
            FROM Usuarios u
            JOIN Rol r ON u.roles = r.id
            WHERE u.id = ?`,
            [userId]
        );
        return (rows as { Rol: string }[])[0]?.Rol === "admin";
    }

    static async getNameGame(id: number, userId: number): Promise<string | null> {
        const qResult = await GameRepositoryImpl.pool.execute(
            `
            SELECT 
              games.name AS game_name
            FROM games
            WHERE games.id = ? AND games.id_user = ?
            `,
            [id, userId]
        );

        const [rows] = qResult as any[];

        return rows[0]?.game_name;
    }

    async getAllGamesByUser(userId: number): Promise<Game[]> {
        const isAdmin = await this.verifyRoleForUser(userId);
        if (isAdmin) {
            const [rows] = await GameRepositoryImpl.pool.execute(
                `SELECT g.id, g.name, g.description, g.category, u.Usuario as nameUser
       FROM games g
       JOIN Usuarios  u ON g.id_user = u.id`
            );
            return rows as Game[];
        }
        const [rows] = await GameRepositoryImpl.pool.execute(
            `SELECT g.id, g.name, g.description, g.category
       FROM games g
       WHERE g.id_user = ?`,
            [userId]
        );

        console.log(rows);

        return rows as Game[];
    }

    async getLastSixGamesByUser(userId: number): Promise<Game[]> {
        const isAdmin = await this.verifyRoleForUser(userId);
        if (isAdmin) {
            const [rows] = await GameRepositoryImpl.pool.execute(
                `SELECT g.id, g.name, g.description, g.category, u.Usuario as nameUser
                FROM games g
                JOIN Usuarios u ON g.id_user = u.id
                ORDER BY g.id DESC
                LIMIT 6`
            );
            return rows as Game[];
        }
        const [rows] = await GameRepositoryImpl.pool.execute(
            `SELECT g.id, g.name, g.description, g.category
            FROM games g
            WHERE g.id_user = ?
            ORDER BY g.id DESC
            LIMIT 6`,
            [userId]
        );

        console.log(rows);

        return rows as Game[];
    }

    async getGameById(gameId: number, userId: number): Promise<Game | null> {
        const isAdmin = await this.verifyRoleForUser(userId);
        if (isAdmin) {
            const [rows] = await GameRepositoryImpl.pool.execute(
                `SELECT g.id, g.name, g.description, g.category, u.Usuario as nameUser
       FROM games g 
       JOIN Usuarios  u ON g.id_user = u.id
       WHERE g.id = ?`,
                [gameId]
            );
            return (rows as Game[])[0] || null;
        }
        const [rows] = await GameRepositoryImpl.pool.execute(
            `SELECT g.id, g.name, g.description, g.category
       FROM games g
       WHERE g.id = ? AND g.id_user = ?`,
            [gameId, userId]
        );
        return (rows as Game[])[0] || null;
    }

    async getLast6GamesByUser(userId: number): Promise<Game[]> {
        const isAdmin = await this.verifyRoleForUser(userId);
        if (isAdmin) {
            const [rows] = await GameRepositoryImpl.pool.execute(
                `SELECT g.id, g.name, g.description, g.category, u.Usuario as nameUser
           FROM games g 
           JOIN Usuarios  u ON g.id_user = u.id
           ORDER BY g.id DESC
           LIMIT 6`,
            );
            return rows as Game[];
        }
        const [rows] = await GameRepositoryImpl.pool.execute(
            `SELECT g.id, g.name, g.description, g.category
           FROM games g
           WHERE g.id_user = ? ORDER BY g.id DESC LIMIT 6`,
            [userId]
        );
        return rows as Game[];
    }
    async getPaginatedGamesByUser(userId: number, page: number, limit: number): Promise<Game[]> {
        const isAdmin = await this.verifyRoleForUser(userId);
        if (isAdmin) {
            const [rows] = await GameRepositoryImpl.pool.execute(
                `SELECT g.id, g.name, g.description, g.category, u.Usuario as nameUser
           FROM games g
           JOIN Usuarios  u ON g.id_user = u.id
           LIMIT ? OFFSET ?`,
                [limit, (page - 1) * limit]
            );
            return rows as Game[];
        }
        const [rows] = await GameRepositoryImpl.pool.execute(
            `SELECT g.id, g.name, g.description, g.category
           FROM games g
           WHERE g.id_user = ? LIMIT ? OFFSET ?`,
            [userId, limit, (page - 1) * limit]
        );
        return rows as Game[];
    }


    async createGame(game: Omit<Game, "id">): Promise<Game> {
        const [result] = await GameRepositoryImpl.pool.execute<ResultSetHeader>(
            `INSERT INTO games (name, description, category, id_user)
       VALUES (?, ?, ?, ?)`,
            [game.name, game.description, game.category, game.idUser]
        );

        const newGame: Game = {
            id: result.insertId,
            ...game,
        };

        return newGame;
    }

    async updateGame(game: Game): Promise<Game> {
        await GameRepositoryImpl.pool.execute(
            `UPDATE games
       SET name = ?, description = ?, category = ?
       WHERE id = ?`,
            [game.name, game.description, game.category, game.id]
        );

        return game;
    }

    async deleteGame(gameId: number): Promise<void> {
        await GameRepositoryImpl.pool.execute(
            `DELETE FROM games
       WHERE id = ?`,
            [gameId]
        );
    }
}