
import { db } from "@/lib/db";
import { Project } from "@/domain/models/Project";
import { ProjectRepository } from "@/domain/repositories/ProjectRepository";
import { ResultSetHeader } from "mysql2";


export class ProjectRepositoryImpl implements ProjectRepository {
    private static pool = db.getPool();
    async verifyRoleForUser(userId: number): Promise<boolean> {
        const [rows] = await ProjectRepositoryImpl.pool.execute(
            `SELECT r.Rol FROM Usuarios u
                JOIN Rol r ON u.roles = r.id
                WHERE u.id = ?`,
            [userId]
        );
        return (rows as { Rol: string }[])[0].Rol === "admin";
    }

    async getAllProjectsByUser(userId: number): Promise<Project[]> {
        const isAdmin = await this.verifyRoleForUser(userId);
        if (isAdmin) {
            const [rows] = await ProjectRepositoryImpl.pool.execute(
                `SELECT p.id, p.name, p.description, p.category, p.status, p.technologies, u.Usuario as nameUser
       FROM projects p 
       JOIN Usuarios  u ON p.id_user = u.id`
            );
            return rows as Project[];
        }
        const [rows] = await ProjectRepositoryImpl.pool.execute(
            `SELECT p.id, p.name, p.description, p.category, p.status, p.technologies
       FROM projects p
       WHERE p.id_user = ?`,
            [userId]
        );
        return rows as Project[];
    }

    async getProjectById(projectId: number, userId: number): Promise<Project | null> {
        const isAdmin = await this.verifyRoleForUser(userId);
        if (isAdmin) {
            const [rows] = await ProjectRepositoryImpl.pool.execute(
                `SELECT p.id, p.name, p.description, p.category, p.status, p.technologies, u.Usuario as nameUser
       FROM projects p 
       JOIN Usuarios  u ON p.id_user = u.id
       WHERE p.id = ?`,
                [projectId]
            );
            return (rows as Project[])[0] || null;
        }
        const [rows] = await ProjectRepositoryImpl.pool.execute(
            `SELECT p.id, p.name, p.description, p.category, p.status, p.technologies
       FROM projects p
       WHERE p.id = ? AND p.id_user = ?`,
            [projectId, userId]
        );
        return (rows as Project[])[0] || null;
    }
    static async getNameProject(id: number, userId: number): Promise<string | null> {
        const qResult = await ProjectRepositoryImpl.pool.execute(
            `
            SELECT 
              projects.name AS project_name
            FROM projects
            WHERE projects.id = ? AND projects.id_user = ?
            `,
            [id, userId]
        );

        const [rows] = qResult as any[];

        return rows[0]?.project_name;
    }

    async getLast6ProjectsByUser(userId: number): Promise<Project[]> {
        const isAdmin = await this.verifyRoleForUser(userId);
        if (isAdmin) {
            const [rows] = await ProjectRepositoryImpl.pool.execute(
                `SELECT p.id, p.name, p.description, p.category, p.status, p.technologies, u.Usuario as nameUser
       FROM projects p 
       JOIN Usuarios  u ON p.id_user = u.id
       ORDER BY p.id DESC
       LIMIT 6`,
            );
            return rows as Project[];
        }
        const [rows] = await ProjectRepositoryImpl.pool.execute(
            `SELECT p.id, p.name, p.description, p.category, p.status, p.technologies
       FROM projects p
       WHERE p.id_user = ? ORDER BY p.id DESC LIMIT 6`,
            [userId]
        );
        return rows as Project[];
    }
    async getPaginatedProjectsByUser(userId: number, page: number, limit: number): Promise<Project[]> {
        const isAdmin = await this.verifyRoleForUser(userId);
        if (isAdmin) {
            const [rows] = await ProjectRepositoryImpl.pool.execute(
                `SELECT p.id, p.name, p.description, p.category, p.status, p.technologies, u.Usuario as nameUser
       FROM projects p 
       JOIN Usuarios  u ON p.id_user = u.id
       LIMIT ? OFFSET ?`,
                [limit, (page - 1) * limit]
            );
            return rows as Project[];
        }
        const [rows] = await ProjectRepositoryImpl.pool.execute(
            `SELECT p.id, p.name, p.description, p.category, p.status, p.technologies
       FROM projects p
       WHERE p.id_user = ? LIMIT ? OFFSET ?`,
            [userId, limit, (page - 1) * limit]
        );
        return rows as Project[];
    }

    async createProject(project: Omit<Project, "id">): Promise<Project> {
        const [result] = await ProjectRepositoryImpl.pool.execute<ResultSetHeader>(
            `INSERT INTO projects (name, description, category, status, technologies, id_user)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [project.name, project.description, project.category, project.status, project.technologies, project.idUser]
        );

        const newProject: Project = {
            id: result.insertId,
            ...project,
        };

        return newProject;
    }

    async updateProject(project: Project): Promise<Project> {
        await ProjectRepositoryImpl.pool.execute(
            `UPDATE projects
       SET name = ?, description = ?, category = ?, status = ?, technologies = ?
       WHERE id = ?`,
            [project.name, project.description, project.category, project.status, project.technologies, project.id]
        );

        return project;
    }

    async deleteProject(projectId: number): Promise<void> {
        await ProjectRepositoryImpl.pool.execute(
            `DELETE FROM projects
       WHERE id = ?`,
            [projectId]
        );
    }
}