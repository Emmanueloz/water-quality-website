import { Project } from "../models/Project";

export interface ProjectRepository {
    getAllProjectsByUser(userId: number): Promise<Project[]>;
    getProjectById(projectId: number, userId: number): Promise<Project | null>;
    createProject(project: Omit<Project, "id">): Promise<Project>;
    updateProject(project: Project): Promise<Project>;
    deleteProject(projectId: number): Promise<void>;
}