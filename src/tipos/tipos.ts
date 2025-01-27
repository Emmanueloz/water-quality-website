export interface LoginRequestBody {
    Usuario: string;
    Contraseña: string;
  }
  
  export interface Usuario {
    id: number;
    Usuario: string;
    Contraseña: string;
    rol: string;
  }
export interface UserProfile{
  id: number;
  userName: string;
  rol: string;
}

export interface Project{
  id?: number;
  name: string;
  description: string;
  category: string;
  status: string;
  technologies: string;
  idUser?: number;
}
