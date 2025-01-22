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
  