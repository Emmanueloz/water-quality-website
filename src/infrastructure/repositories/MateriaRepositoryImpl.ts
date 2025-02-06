import { IMateriaRepository } from "@/domain/repositories/MateriaRepository";
import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export class MateriaRepositoryImpl implements IMateriaRepository {
  private pool = db.getPool();

  async addMateria(materia: IMateria): Promise<void> {
    const connection = db.getPool();

    const qResult = await connection.execute(
      "INSERT INTO materias (nombre, maestro, id_usuario) VALUES (?, ?, ?)",
      [materia.nombre, materia.maestro, materia.id_usuario]
    );

    const [rows] = qResult as [ResultSetHeader, any];

    console.log(rows);
    console.log(materia);

    const materiaId = rows.insertId;

    materia.id = materiaId;

    this.addUnidades(materia);
  }

  async addUnidades(materia: IMateria): Promise<void> {
    //INSERT INTO unidades (nombre, horas_totales, id_materia) VALUES
    const insertQuery = `
    INSERT INTO unidades (nombre, horas_totales, id_materia) 
    VALUES ${materia.unidades?.map(() => "(?,?,?)").join(",")}`;

    const insertValues = materia.unidades?.flatMap((u) => [
      u.nombre,
      u.horas_totales,
      materia.id,
    ]);

    const [insertResult] = await this.pool.execute(insertQuery, insertValues);

    console.log(insertResult);
  }

  async getMateria(id: number, id_usuario: number): Promise<IMateria | null> {
    const qResult = await this.pool.execute(
      `
      SELECT 
        materias.id AS materia_id,
        materias.nombre AS materia_nombre,
        materias.maestro AS materia_maestro,
        materias.id_usuario as id_usuario,
        GROUP_CONCAT(unidades.id ORDER BY unidades.id) AS unidades_ids,
        GROUP_CONCAT(unidades.nombre ORDER BY unidades.id) AS unidades_nombres,
        GROUP_CONCAT(unidades.horas_totales ORDER BY unidades.id) AS unidades_horas_totales
      FROM materias
      LEFT JOIN unidades ON unidades.id_materia = materias.id
      WHERE materias.id = ? AND materias.id_usuario = ?
      GROUP BY materias.id;
      `,
      [id, id_usuario]
    );

    const [rows] = qResult as [any[], any];

    if (rows.length === 0) {
      return null;
    }

    const materia = rows[0]
      ? {
          id: rows[0].materia_id,
          nombre: rows[0].materia_nombre,
          maestro: rows[0].materia_maestro,
          id_usuario: rows[0].id_usuario,
          unidades: rows[0].unidades_ids
            ? rows[0].unidades_ids
                .split(",")
                .map((id: string, index: number) => ({
                  id: parseInt(id),
                  nombre: rows[0].unidades_nombres.split(",")[index],
                  horas_totales: parseInt(
                    rows[0].unidades_horas_totales.split(",")[index]
                  ),
                }))
            : [],
        }
      : null;

    return materia as IMateria;
  }

  async getMaterias(id_usuario: number): Promise<IMateria[]> {
    const qResult = await this.pool.execute(
      `
      SELECT 
        materias.id AS materia_id,
        materias.nombre AS materia_nombre,
        materias.maestro AS materia_maestro
      FROM materias
      WHERE materias.id_usuario = ?
      `,
      [id_usuario]
    );

    const [rows] = qResult as any[];

    const materias = rows.map((row: any) => ({
      id: row.materia_id,
      nombre: row.materia_nombre,
      maestro: row.materia_maestro,
      unidades: [],
    }));

    return materias as IMateria[];
  }

  async deleteMateria(materia: IMateria): Promise<void> {
    const qResult = await this.pool.execute(
      `
    DELETE FROM materias WHERE materias.id = ? AND materias.id_usuario = ?
    `,
      [materia.id, materia.id_usuario]
    );

    const [rows] = qResult as [any[], any];

    console.log(rows);
  }

  async updateMateria(materia: IMateria): Promise<void> {
    const qResult = await this.pool.execute(
      `
      UPDATE materias 
      SET nombre = ?,
          maestro=?
      WHERE materias.id = ? AND materias.id_usuario = ?
      `,
      [materia.nombre, materia.maestro, materia.id, materia.id_usuario]
    );

    const [rows] = qResult as [any[], any];

    console.log(rows);
  }

  async updateUnidades(materia: IMateria, oldMateria: IMateria): Promise<void> {
    const getId = (u: IUnidades) => u.id;

    const idsAnterior = new Set(oldMateria.unidades?.map(getId));
    const idsActualizada = new Set(materia.unidades?.map(getId));

    const newListUni = materia.unidades?.filter(
      (u) => !idsAnterior.has(getId(u))
    );

    const delListUnit = oldMateria.unidades?.filter(
      (u) => !idsActualizada.has(getId(u))
    );

    const updListUnit = materia.unidades?.filter((u) => {
      return (
        idsAnterior.has(getId(u)) &&
        (u.nombre !==
          oldMateria.unidades?.find((ou) => getId(ou) === getId(u))?.nombre ||
          u.horas_totales !==
            oldMateria.unidades?.find((ou) => getId(ou) === getId(u))
              ?.horas_totales)
      );
    });

    if (newListUni && newListUni.length > 0) {
      const insertQuery = `
    INSERT INTO unidades (nombre, horas_totales, id_materia) 
    VALUES ${newListUni?.map(() => "(?,?,?)").join(",")}`;

      const insertValues = newListUni?.flatMap((u) => [
        u.nombre,
        u.horas_totales,
        materia.id,
      ]);

      const [insertResult] = await this.pool.execute(insertQuery, insertValues);

      console.log(insertResult);
    }

    if (delListUnit && delListUnit.length > 0) {
      const delQuery = `
    DELETE FROM unidades
    WHERE id IN (${delListUnit?.map(() => "?").join(",")})`;

      const delValues = delListUnit?.map((u) => u.id);
      const [delResult] = await this.pool.execute(delQuery, delValues);

      console.log(delResult);
    }

    if (updListUnit && updListUnit.length > 0) {
      const updQuery = `
    UPDATE unidades
    SET 
      nombre = CASE id 
        ${updListUnit?.map(() => "WHEN ? THEN ?").join(" ")}
      END,
      horas_totales = CASE id 
        ${updListUnit?.map(() => "WHEN ? THEN ?").join(" ")}
      END
    WHERE id IN (${updListUnit?.map(() => "?").join(",")})`;

      const updValues = updListUnit
        ?.flatMap((u) => [u.id, u.nombre])
        .concat(updListUnit?.flatMap((u) => [u.id, u.horas_totales]))
        .concat(updListUnit?.map((u) => u.id));

      console.log(updListUnit, updValues, updQuery);

      const [updResult] = await this.pool.execute(updQuery, updValues);
      console.log(updResult);
    }
  }

  async searchMateria(search: ISearchMateria): Promise<IMateria[]> {
    console.log(search);
    
    return [];
  }
}
