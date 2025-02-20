import { GameRepository } from "../domain/repositories/GameRepository";
import { Game } from "../domain/models/Game";

export class GameService {
    constructor(private gameRepository: GameRepository) { }
    async getAllGamesByUser(userId: number): Promise<Game[]> {
        return this.gameRepository.getAllGamesByUser(userId);
    }

    async getGamesById(gameId: number, userId: number): Promise<Game | null> {
        return this.gameRepository.getGameById(gameId, userId);
    }

    async getLast6ProjectsByUser(userId: number): Promise<Game[]> {
        return this.gameRepository.getLast6GamesByUser(userId);
    }

    async getPaginatedProjectsByUser(userId: number, page: number, limit: number): Promise<Game[]> {
        return this.gameRepository.getPaginatedGamesByUser(userId, page, limit);
    }


    async createGame(game: Omit<Game, "id">): Promise<Game> {
        return this.gameRepository.createGame(game);
    }

    async updateGame(game: Game): Promise<Game> {
        return this.gameRepository.updateGame(game);
    }

    async deleteGame(projectId: number): Promise<void> {
        return this.gameRepository.deleteGame(projectId);
    }
}