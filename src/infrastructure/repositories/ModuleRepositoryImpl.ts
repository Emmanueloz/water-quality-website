import { db } from "@/lib/db";
import { ModuleRepository } from "@/domain/repositories/ModuleRepository";
import { ResultSetHeader } from "mysql2";

export class ModuleRepositoryImpl implements ModuleRepository {
    private pool = db.getPool();

    async getAllModules(): Promise<IModule[]> {
        const [rows] = await this.pool.execute("SELECT * FROM modulos");
        return rows as IModule[];
    }

    async getModuleById(id: number): Promise<IModule | null> {
        const [rows] = await this.pool.execute("SELECT * FROM modulos WHERE id = ?", [id]);
        return (rows as IModule[])[0] || null;
    }

    async createModule(module: Omit<IModule, "id">): Promise<IModule> {
        const [rows] = await this.pool.execute<ResultSetHeader>("INSERT INTO modulos (name) VALUES (?)", [module.name]);
        const { insertId } = rows;
        return { ...module, id: insertId };
    }

    async updateModule(module: IModule): Promise<IModule> {
        await this.pool.execute("UPDATE modulos SET ? WHERE id = ?", [module, module.id]);
        return module;
    }

    async deleteModule(id: number): Promise<void> {
        await this.pool.execute("DELETE FROM modulos WHERE id = ?", [id]);
    }   


    static async checkIfListModulesExist(idModules: number[]): Promise<boolean> {
        if (!idModules?.length) throw new Error("IDs de módulos requeridos");
        
        const connection = await db.getPool();
        
        try {
            const placeholders = idModules.map(() => "?").join(",");
            const [rows] = await connection.execute(
                `SELECT id FROM modulos WHERE id IN (${placeholders})`,
                idModules
            );
            
            return (rows as any[]).length === idModules.length;
        } catch (error) {
            console.error("Error verificando módulos:", error);
            throw new Error("Error de validación de módulos");
        }
    }
}