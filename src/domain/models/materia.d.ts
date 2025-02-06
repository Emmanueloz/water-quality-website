interface IMateria {
  id?: number;
  nombre: string;
  maestro: string;
  id_usuario: number;
  unidades?: IUnidades[];
}



interface ISearchMateria {
  [SearchAttributes]: number | string;
}