import { ModuleRepository } from "@/domain/repositories/ModuleRepository";

export class ModuleService {
    constructor(private repository: ModuleRepository) {}

    async getAllModules() {
        return this.repository.getAllModules();
    }

    async getModuleById(id: number) {
        return this.repository.getModuleById(id);
    }

    async createModule(module: Omit<IModule, "id">) {
        return this.repository.createModule(module);
    }

    async updateModule(module: IModule) {
        return this.repository.updateModule(module);
    }

    async deleteModule(id: number) {
        return this.repository.deleteModule(id);
    }
}