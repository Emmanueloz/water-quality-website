import { QuestionRecoverUser } from "@/domain/models/QuestionRecover";
import { strict } from "assert";



export interface LoginRequestBody {
  Usuario: string;
  Contraseña: string;
  acceptTerms: boolean;
  phone: string;
  Email: string;
  question: number;
  answers: QuestionRecoverUser[];
}

export interface Usuario {
  id: number;
  Usuario: string;
  userName: string;
  email: string;
  rol: string;
  Contraseña: string;
  privilegio?: string;
  modules: [] | string;
  isTwoFactorEnabled?: boolean;
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
