import { PrivilegioRepository } from "@/domain/repositories/PrivilegioRepository";

export class PrivilegioService {
    constructor(private repository: PrivilegioRepository) {}

    async getAllPrivilegios(): Promise<IPrivilegio[]> {
        return this.repository.getAllPrivilegios(); 
    }

    async createPrivilegio(privilegio: Omit<IPrivilegio, "id">): Promise<IPrivilegio> {
        return this.repository.createPrivilegio(privilegio);
    }

    async updatePrivilegio(privilegio: IPrivilegio): Promise<IPrivilegio> {
        return this.repository.updatePrivilegio(privilegio);
    }
}