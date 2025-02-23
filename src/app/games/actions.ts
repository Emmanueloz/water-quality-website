"use server";
import { GameRepositoryImpl } from "@/infrastructure/repositories/GameRepositorylmpl";

export const getNameGame = async (id: number, idUsuario: number) => {
    return GameRepositoryImpl.getNameGame(id, idUsuario);
};