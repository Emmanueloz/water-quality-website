// src/services/UsuarioService.ts
import { AdminRepositoryImpl } from "@/infrastructure/repositories/AdminRepositoryImpl";
import { Admin} from "@/domain/models/Admin";

export class AdminService {
    private usuarioRepository: AdminRepositoryImpl;

    constructor(usuarioRepository: AdminRepositoryImpl) {
        this.usuarioRepository = usuarioRepository;
    }

    // Crea un nuevo administrador
    async createAdmin(user: Omit<Admin, "id">, adminUserId: number): Promise<Admin> {
        return this.usuarioRepository.createAdmin(user, adminUserId);
    }
}
