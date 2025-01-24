import { IUnidades } from "./unidades";

interface IMateria {
  id?: number;
  nombre: string;
  maestro: string;
  id_usuario: number;
  unidades?: IUnidades[];
}

export type { IMateria };
