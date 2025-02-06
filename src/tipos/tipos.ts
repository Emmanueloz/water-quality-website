import { strict } from "assert";

export interface LoginRequestBody {
  Usuario: string;
  Contraseña: string;
  acceptTerms:boolean;
  Email: string;
}

export interface Usuario {
  id: number;
  Usuario: string;
  userName: string;
  email: string;
  rol: string;
  Contraseña: string;
  privilegio?: string;
  modules:[] | string
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
