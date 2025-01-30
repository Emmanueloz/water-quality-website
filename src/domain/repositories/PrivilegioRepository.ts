
export interface PrivilegioRepository {
    getAllPrivilegios(): Promise<IPrivilegio[]>;
    createPrivilegio(privilegio: Omit<IPrivilegio, "id">): Promise<IPrivilegio>;
    updatePrivilegio(privilegio: IPrivilegio): Promise<IPrivilegio>;
}