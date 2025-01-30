"use server";
import { PrivilegioService } from "@/services/PrivilegioService";
import { PrivilegioRepositoryImpl } from "@/infrastructure/repositories/PrivilegioRepositoryImpl";


const privilegioRepository = new PrivilegioRepositoryImpl();
const privilegioService = new PrivilegioService(privilegioRepository);

export const getAllPrivilegios = async () => {
    return await privilegioService.getAllPrivilegios();
};

export const createPrivilegio = async (privilegio: IPrivilegio) => {
    return await privilegioService.createPrivilegio(privilegio);
};

export const updatePrivilegio = async (privilegio: IPrivilegio) => {
    return await privilegioService.updatePrivilegio(privilegio);
};
