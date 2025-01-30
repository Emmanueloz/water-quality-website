export interface LoginRequestBody {
  Usuario: string;
  Contraseña: string;
}

export interface Usuario {
  id: number;
  Usuario: string;
  Contraseña: string;
  rol: string;
  privilegio: string;
}

export interface Project {
  id?: number;
  name: string;
  description: string;
  category: string;
  status: string;
  technologies: string;
  idUser?: number;
}
