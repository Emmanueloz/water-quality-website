// src/domain/models/Usuario.ts
export interface Admin {
    id?: number;
    Usuario: string; // Aquí cambia el campo 'email' por 'usuario'
    Contraseña: string;
    Roles: 'Admin';  // El rol puede ser 'user' o 'admin'
}
