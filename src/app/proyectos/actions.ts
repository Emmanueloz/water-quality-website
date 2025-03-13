"use server";
import { ProjectRepositoryImpl } from "@/infrastructure/repositories/ProjectRepositoryImpl";
import { isHavePermissionInToken } from "@/utils/getUserToken";
export const getNameProject = async (id: number, idUsuario: number) => {
  const isHavePermission = await isHavePermissionInToken(3, "read");

  if (!isHavePermission) {
    return null;
  }
  return ProjectRepositoryImpl.getNameProject(id, idUsuario);
};
