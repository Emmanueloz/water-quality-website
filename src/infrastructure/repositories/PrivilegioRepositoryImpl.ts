import { db } from "@/lib/db";
import { PrivilegioRepository } from "@/domain/repositories/PrivilegioRepository";
import { ModuleRepositoryImpl } from "./ModuleRepositoryImpl";
import { ResultSetHeader } from "mysql2";


export class PrivilegioRepositoryImpl implements PrivilegioRepository {
    private static pool = db.getPool();
    
    async getAllPrivilegios(): Promise<IPrivilegio[]> {
        const [rows] = await PrivilegioRepositoryImpl.pool.execute(
            `SELECT p.id,
            p.name, 
            COALESCE(GROUP_CONCAT(pm.id_module ORDER BY pm.id_module), '') AS idRoutes
            FROM privilegios p
            LEFT JOIN priv_mod pm ON p.id = pm.id_privilegio
            GROUP BY p.id`
        );
    
        return (rows as any[]).map(row => ({
            id: row.id,
            name: row.name,
            idRoutes: row.idRoutes 
                ? row.idRoutes.split(',').map(Number) 
                : []
        }));
    }



    static async getPrivilegioByName(name: string): Promise<IPrivilegio | null> {
        try {
            const [rows] = await PrivilegioRepositoryImpl.pool.execute(
                `SELECT p.id,
                p.name
                FROM privilegios p
                WHERE p.name = ?
                `,
                [name]
            );
            const result = rows as IPrivilegio[];
            return result[0] || null;
        } catch (error) {
            console.error("Error verificando privilegio:", error);
            throw new Error("Error de validación de privilegio");
        }

    }
    async createPrivilegio(privilegio: Omit<IPrivilegio, "id">): Promise<IPrivilegio> {
        if(await PrivilegioRepositoryImpl.getPrivilegioByName(privilegio.name)) {
            throw new Error('Privilegio already exists');
        }

        if (!await ModuleRepositoryImpl.checkIfListModulesExist(privilegio.idRoutes)) {
            throw new Error('Some modules do not exist');
        }
        const [result] = await PrivilegioRepositoryImpl.pool.execute<ResultSetHeader>(
            `INSERT INTO privilegios (name) VALUES (?)`,
            [privilegio.name]
        );
        

        for (const idModule of privilegio.idRoutes) {
            await PrivilegioRepositoryImpl.pool.execute(
                `INSERT INTO priv_mod (id_privilegio, id_module) VALUES (?, ?)`,
                [result.insertId, idModule]
            );
        }
        return {
            id: result.insertId,
            name: privilegio.name,
            idRoutes: privilegio.idRoutes
        };
    }

    async updatePrivilegio(privilegio: IPrivilegio): Promise<IPrivilegio> {
        try {
            const existingPrivilegio = await PrivilegioRepositoryImpl.getPrivilegioByName(privilegio.name);
            if (existingPrivilegio && existingPrivilegio.id !== privilegio.id) {
                throw new Error('Privilegio already exists');
            }
    
            if (!await ModuleRepositoryImpl.checkIfListModulesExist(privilegio.idRoutes)) {
                throw new Error('Some modules do not exist');
            }
    
            await PrivilegioRepositoryImpl.pool.execute(
                `UPDATE privilegios SET name = ? WHERE id = ?`,
                [privilegio.name, privilegio.id]
            );
    
            await this.deletePrivilegioOnIntermediateTable(privilegio.id!);
    
            for (const idModule of privilegio.idRoutes) {
                await PrivilegioRepositoryImpl.pool.execute(
                    `INSERT INTO priv_mod (id_privilegio, id_module) VALUES (?, ?)`,
                    [privilegio.id, idModule]
                );
            }
            return {
                id: privilegio.id,
                name: privilegio.name,
                idRoutes: privilegio.idRoutes
            };
        } catch (error) {
            console.error("Error updating privilegio:", error);
            throw new Error("Error updating privilegio");
        }
    }

    async deletePrivilegioOnIntermediateTable(id: number): Promise<void> {
        await PrivilegioRepositoryImpl.pool.execute(
            `DELETE FROM priv_mod WHERE id_privilegio = ?`,
            [id]
        );
    }
}