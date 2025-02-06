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
  getMateria(id: number, id_usuario: number): Promise<IMateria> {
    throw new Error("Method not implemented.");
  }
  getMaterias(id_usuario: number): Promise<IMateria[]> {
    throw new Error("Method not implemented.");
  }
  deleteMateria(materia: IMateria): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateMateria(materia: IMateria): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateUnidades(materia: IMateria): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
