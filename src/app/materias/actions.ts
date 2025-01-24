"use server";

import { db } from "@/lib/db";
import { IMateria } from "@/tipos/materia";
import { IUnidades } from "@/tipos/unidades";
import { ResultSetHeader } from "mysql2";

export const addMateria = async (materia: IMateria) => {
  const connection = await db();

  const qResult = await connection.execute(
    "INSERT INTO materias (nombre, maestro, id_usuario) VALUES (?, ?, ?)",
    [materia.nombre, materia.maestro, materia.id_usuario]
  );

  const [rows] = qResult as [ResultSetHeader, any];

  const materiaId = rows.insertId;
  for (const unidad of materia.unidades || []) {
    await addUnidad({ ...unidad, id_materia: materiaId });
  }
};

const addUnidad = async (unidad: IUnidades) => {
  const connection = await db();

  const qResult = await connection.execute(
    "INSERT INTO unidades (nombre, horas_totales, id_materia) VALUES (?, ?, ?)",
    [unidad.nombre, unidad.horas_totales, unidad.id_materia]
  );

  const [rows] = qResult;
  console.log(rows);
};

export const getMaterias = async (id_usuario: number) => {
  const connection = await db();

  const qResult = await connection.execute(
    `
    SELECT * FROM materias WHERE id_usuario = ?
    `,
    [id_usuario]
  );

  const [materias] = qResult;

  return materias as IMateria[];
};

export const getMateria = async (id: number, id_usuario: number) => {
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
    WHERE materias.id = ? AND materias.id_usuario = ?
    GROUP BY materias.id;
    `,
    [id, id_usuario]
  );

  const [rows] = qResult as [any[], any];

  if (rows.length === 0) {
    return null;
  }

  console.log(rows);

  const materia = rows[0]
    ? {
        id: rows[0].materia_id,
        nombre: rows[0].materia_nombre,
        maestro: rows[0].materia_maestro,
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
