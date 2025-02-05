export interface IMateriaRepository{
    addMateria(materia: IMateria): Promise<void>;
    addUnidades(materia: IMateria): Promise<void>;
    getMateria(id: number, id_usuario: number): Promise<IMateria>;
    getMaterias( id_usuario: number): Promise<IMateria[]>;
    deleteMateria(materia: IMateria): Promise<void>;
    updateMateria(materia: IMateria): Promise<void>;
    updateUnidades(materia: IMateria): Promise<void>;
}