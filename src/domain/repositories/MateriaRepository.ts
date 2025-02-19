export interface IMateriaRepository {
  addMateria(materia: IMateria): Promise<IMateria>;
  addUnidades(materia: IMateria): Promise<void>;
  getMateria(id: number, id_usuario: number): Promise<IMateria | null>;
  getMaterias(id_usuario: number): Promise<IMateria[]>;
  getMateriasPaginated(page: number, limit: number, id_usuario: number): Promise<IMateria[]>;
  deleteMateria(materia: IMateria): Promise<void>;
  updateMateria(materia: IMateria): Promise<void>;
  updateUnidades(materia: IMateria, oldMateria: IMateria): Promise<void>;
  searchMateria(search: ISearchMateria): Promise<IMateria[]>;
}
