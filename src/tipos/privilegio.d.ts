interface IPrivilegio {
  id?: number;
  name: string;
  idRoutes: number[];
  modulesPermissions?: IModulesPermissions[];
}

interface IModulesPermissions {
  idRoute: number;
  permissions: string[] | string;
}
