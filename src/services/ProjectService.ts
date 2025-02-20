import { ProjectRepository } from "../domain/repositories/ProjectRepository";
import { Project } from "../domain/models/Project";

export class ProjectService {
    constructor(private projectRepository: ProjectRepository) { }
    async getAllProjectsByUser(userId: number): Promise<Project[]> {
        return this.projectRepository.getAllProjectsByUser(userId);
    }

    async getProjectById(projectId: number, userId: number): Promise<Project | null> {
        return this.projectRepository.getProjectById(projectId, userId);
    }

    async getLast6ProjectsByUser(userId: number): Promise<Project[]> {
        return this.projectRepository.getLast6ProjectsByUser(userId);
    }

    async getPaginatedProjectsByUser(userId: number, page: number, limit: number): Promise<Project[]> {
        return this.projectRepository.getPaginatedProjectsByUser(userId, page, limit);
    }

    async createProject(project: Omit<Project, "id">): Promise<Project> {
        return this.projectRepository.createProject(project);
    }

    async updateProject(project: Project): Promise<Project> {
        return this.projectRepository.updateProject(project);
    }

    async deleteProject(projectId: number): Promise<void> {
        return this.projectRepository.deleteProject(projectId);
    }
}