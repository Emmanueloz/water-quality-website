"use server";
import { ProjectRepositoryImpl } from "@/infrastructure/repositories/ProjectRepositoryImpl";
export const getNameProject = async (id: number, idUsuario: number) => {
    return ProjectRepositoryImpl.getNameProject(id, idUsuario);
};