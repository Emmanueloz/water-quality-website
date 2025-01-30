export interface ModuleRepository {
    getAllModules(): Promise<IModule[]>;
    getModuleById(id: number): Promise<IModule | null>;
    createModule(module: Omit<IModule, "id">): Promise<IModule>;
    updateModule(module: IModule): Promise<IModule>;
    deleteModule(id: number): Promise<void>;
}