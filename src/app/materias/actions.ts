"use server";

import { MateriaRepositoryImpl } from "@/infrastructure/repositories/MateriaRepositoryImpl";

const materiaRepository = new MateriaRepositoryImpl();

export const addMateria = async (materia: IMateria) => {
 return await materiaRepository.addMateria(materia);
};

export const getMaterias = async (id_usuario: number) => {
  return materiaRepository.getMaterias(id_usuario);
};

export const getMateria = async (id: number, id_usuario: number) => {
  return materiaRepository.getMateria(id, id_usuario);
};

export const getNameMateria = async (id: number, id_usuario: number) => {
  return materiaRepository.getNameMateria(id, id_usuario);
};

export const deleteMateria = async (materia: IMateria) => {
  materiaRepository.deleteMateria(materia);
};

export const updateMateria = async (materia: IMateria) => {
  materiaRepository.updateMateria(materia);
};

export const updateUnidades = async (
  materia: IMateria,
  oldMateria: IMateria
) => {
  materiaRepository.updateUnidades(materia, oldMateria);
};

export const searchMateria = async (search: ISearchMateria) => {
  return materiaRepository.searchMateria(search);
};

export const getMateriasPaginated = async (
  page: number,
  limit: number,
  idUsuario: number
) => {
  return materiaRepository.getMateriasPaginated(page, limit, idUsuario);
};