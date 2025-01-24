"use server";

import { db } from "@/lib/db";
import { IMateria } from "@/tipos/materia";

export const addMateria = async (materia: IMateria) => {
  const connection = await db();

  const qResult = await connection.execute(
    "INSERT INTO materias (nombre, maestro, id_usuario) VALUES (?, ?, ?)",
    [materia.nombre, materia.maestro, materia.id_usuario]
  );

  const [rows] = qResult;
  console.log(rows);
};

const addUnidad = () => {};

export const getMaterias = async (id_usuario: number) => {
  const connection = await db();

  const qResult = await connection.execute(
    `
    SELECT 
      materias.id AS materia_id,
      materias.nombre AS materia_nombre,
      materias.maestro AS materia_maestro,
      GROUP_CONCAT(unidades.id ORDER BY unidades.id) AS unidades_ids,
      GROUP_CONCAT(unidades.nombre ORDER BY unidades.id) AS unidades_nombres,
      GROUP_CONCAT(unidades.horas_totales ORDER BY unidades.id) AS unidades_horas_totales
    FROM materias
    LEFT JOIN unidades ON unidades.id_materia = materias.id
    WHERE materias.id_usuario = ?
    GROUP BY materias.id;
    `,
    [id_usuario]
  );

  const [rows] = qResult as any[];

  const materias = rows.map((row: any) => ({
    id: row.materia_id,
    nombre: row.materia_nombre,
    maestro: row.materia_maestro,
    unidades: row.unidades_ids
      ? row.unidades_ids.split(",").map((id: any, index: any) => ({
          id: Number(id),
          nombre: row.unidades_nombres.split(",")[index],
          horas_totales: parseFloat(
            row.unidades_horas_totales.split(",")[index]
          ),
        }))
      : [],
  }));

  return materias as IMateria[];
};
