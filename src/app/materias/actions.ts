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

export const getMaterias = () => {};
