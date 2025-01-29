interface IGetMateriasInput {
  id_usuario: number;
  page: number;
  pageSize: number;
}

interface IGetMateriasOutput {
  materias: IMateria[];
  total: number;
  totalPages: number;
}
