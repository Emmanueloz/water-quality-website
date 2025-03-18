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
            COALESCE(GROUP_CONCAT(pm.id_module ORDER BY pm.id_module), '') AS idRoutes,
            JSON_ARRAYAGG(
                JSON_OBJECT('idRoute', pm.id_module, 'permissions',  pm.permissions)
                ) AS modulesPermissions
            FROM privilegios p
            LEFT JOIN priv_mod pm ON p.id = pm.id_privilegio
            GROUP BY p.id`
    );

    const result = (rows as any[]).map((row) => {
      const permissions = JSON.parse(row.modulesPermissions) as any[];

      const modulesPermissions = permissions.map((permission) => {
        return {
          idRoute: permission.idRoute,
          permissions: permission.permissions
            ? permission.permissions.split(",")
            : [],
        };
      });

      return {
        id: row.id,
        name: row.name,
        idRoutes: row.idRoutes ? row.idRoutes.split(",").map(Number) : [],
        modulesPermissions: modulesPermissions,
      };
    });

    return result;
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
  async createPrivilegio(
    privilegio: Omit<IPrivilegio, "id">
  ): Promise<IPrivilegio> {

    for (const idModule of privilegio.idRoutes) {
      await PrivilegioRepositoryImpl.pool.execute(
        `INSERT INTO user_permissions (user_id, module_id) VALUES (?, ?)`,
        [privilegio.userId, idModule]
      );
    }
    return {
      idRoutes: privilegio.idRoutes,
    };
  }

  async updatePrivilegio(privilegio: IPrivilegio): Promise<IPrivilegio> {
    try {
      await this.deletePrivilegioOnIntermediateTable(privilegio.userId!);
      for (const idModule of privilegio.idRoutes) {
        if (idModule) {
          const module = privilegio.modulesPermissions?.find(
            (m) => m.idRoute === idModule
          );
          const permissions = Array.isArray(module?.permissions)
            ? module?.permissions.join(",")
            : [];
          await PrivilegioRepositoryImpl.pool.execute(
            `INSERT INTO user_permissions (user_id, module_id, permissions) VALUES (?, ?, ?)`,
            [privilegio.userId, idModule, permissions]
          );
        }
      }
      return {
        idRoutes: privilegio.idRoutes,
        modulesPermissions: privilegio.modulesPermissions,
      };
    } catch (error) {
      console.error("Error updating privilegio:", error);
      throw new Error("Error updating privilegio");
    }
  }

  async deletePrivilegioOnIntermediateTable(id: number): Promise<void> {
    await PrivilegioRepositoryImpl.pool.execute(
      `DELETE FROM user_permissions WHERE user_id = ?`,
      [id]
    );
  }
}
