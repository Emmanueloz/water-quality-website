import { Game } from "../models/Game";

export interface GameRepository {
    getAllGamesByUser(userId: number): Promise<Game[]>;
    getGameById(gameId: number, userId: number): Promise<Game | null>;
    getLast6GamesByUser(userId: number): Promise<Game[]>;
    getPaginatedGamesByUser(userId: number, page: number, limit: number): Promise<Game[]>;

    createGame(game: Omit<Game, "id">): Promise<Game>;
    updateGame(game: Game): Promise<Game>;
    deleteGame(gameId: number): Promise<void>;
}