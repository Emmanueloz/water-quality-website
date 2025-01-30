"use server";

import { db } from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export const addMateria = async (materia: IMateria) => {
  const connection = db.getPool();

  const qResult = await connection.execute(
    "INSERT INTO materias (nombre, maestro, id_usuario) VALUES (?, ?, ?)",
    [materia.nombre, materia.maestro, materia.id_usuario]
  );

  const [rows] = qResult as [ResultSetHeader, any];

  console.log(rows);
  console.log(materia);

  const materiaId = rows.insertId;
  for (const unidad of materia.unidades || []) {
    console.log(unidad);

    await addUnidad({ ...unidad, id_materia: materiaId });
  }
};

const addUnidad = async (unidad: IUnidades) => {
  const connection = db.getPool();

  const qResult = await connection.execute(
    "INSERT INTO unidades (nombre, horas_totales, id_materia) VALUES (?, ?, ?)",
    [unidad.nombre, unidad.horas_totales, unidad.id_materia]
  );

  const [rows] = qResult;
  console.log(rows);
};

export const getMaterias = async (id_usuario: number) => {
  const connection = db.getPool();

  const qResult = await connection.execute(
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
};

export const getMateria = async (id: number, id_usuario: number) => {
  const connection = db.getPool();

  const qResult = await connection.execute(
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
};

export const deleteMateria = async (materia: IMateria) => {
  const connection = db.getPool();

  const qResult = await connection.execute(
    `
    DELETE FROM materias WHERE materias.id = ? AND materias.id_usuario = ?
    `,
    [materia.id, materia.id_usuario]
  );

  const [rows] = qResult as [any[], any];

  console.log(rows);
};

export const updateMateria = async (materia: IMateria) => {
  const connection = db.getPool();

  const qResult = await connection.execute(
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
};

export const updateUnidades = async (
  materia: IMateria,
  oldMateria: IMateria
) => {
  const connection = db.getPool();

  const getId = (u: IUnidades) => u.id;

  const idsAnterior = new Set(oldMateria.unidades?.map(getId));
  const idsActualizada = new Set(materia.unidades?.map(getId));

  const newListUni = materia.unidades?.filter(
    (u) => !idsAnterior.has(getId(u))
  );

  const delListUnit = oldMateria.unidades?.filter(
    (u) => !idsActualizada.has(getId(u))
  );

  const updListUnit = materia.unidades?.filter((u) =>
    idsAnterior.has(getId(u))
  );

  //connection.execute()

  const insertQuery = `
    INSERT INTO unidades (nombre, horas_totales, id_materia) 
    VALUES ${newListUni?.map((u) => "(?,?,?)").toString()}
  `;

  const delQuery = `
    DELETE FROM unidades
      WHERE id IN (${delListUnit?.map((u) => "?").toString()})
    `;

  /**
     * UPDATE cursos    
SET posicion = CASE Id
    WHEN 1 THEN 11
    WHEN 2 THEN 15
END
WHERE Id IN (1,2)
     */

  console.log(newListUni, delListUnit, updListUnit);

  console.log(insertQuery, delQuery);
};
