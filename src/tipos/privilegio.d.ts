interface IPrivilegio {
  id?: number;
  name?: string;
  userId?: number;
  idRoutes: number[];
  modulesPermissions?: IModulesPermissions[];
}

interface IModulesPermissions {
  idRoute: number;
  permissions: string[] | string;
}
