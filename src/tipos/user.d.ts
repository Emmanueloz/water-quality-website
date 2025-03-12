interface UserProfile {
  id: number;
  userName: string;
  password?: string;
  rol: string;
  iat: number;
  exp: number;
  modules: [] | string;
  modulesPermissions: IModulesPermissions[];
}
