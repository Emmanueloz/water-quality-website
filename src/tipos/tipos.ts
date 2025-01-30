export interface LoginRequestBody {
  Usuario: string;
  Contraseña: string;
}

export interface Usuario {
  id: number;
  userName: string;
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

export interface Game {
  id?: number;
  name: string;
  description: string;
  category: string;
  idUser?: number;
}
