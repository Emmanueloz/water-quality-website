"use server";
import { GameRepositoryImpl } from "@/infrastructure/repositories/GameRepositorylmpl";
import { isHavePermissionInToken } from "@/utils/getUserToken";

export const getNameGame = async (id: number, idUsuario: number) => {
  const isHavePermission = await isHavePermissionInToken(2, "read");

  if (!isHavePermission) {
    return null;
  }
  return GameRepositoryImpl.getNameGame(id, idUsuario);
};
