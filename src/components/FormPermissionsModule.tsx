"use client";

import { useEffect } from "react";

export const FormPermissionsModule = ({
  modules,
  privilegio,
  onChange,
  onChangePermissions,
}: {
  modules: IModule[];
  privilegio: IPrivilegio;
  onChange: (routeId: number) => void;
  onChangePermissions: (routeId: number, permission: string) => void;
}) => {
  useEffect(() => {
    console.log(privilegio);
  }, []);

  const isModuleChecked = (moduleId: number) => {
    return privilegio.idRoutes.includes(moduleId);
  };

  const isPermissionChecked = (moduleId: number, permission: string) => {
    const module = privilegio.modulesPermissions?.find(
      (m) => m.idRoute === moduleId
    );
    if (!module) {
      return false;
    }
    return module.permissions.includes(permission);
  };

  return (
    <>
      <label className="block mb-2">Módulos:</label>
      <div className="space-y-2">
        {modules.map((module) => (
          <details key={module.id} open={isModuleChecked(module.id)}>
            <summary className="flex items-center">
              <label key={module.id}>
                <input
                  type="checkbox"
                  checked={isModuleChecked(module.id)}
                  onChange={() => onChange(module.id)}
                  className="mr-2"
                />
                {module.name}
              </label>
            </summary>
            <div className="flex gap-1">
              <label>
                <input
                  type="checkbox"
                  checked={isPermissionChecked(module.id, "create")}
                  onChange={(e) =>
                    onChangePermissions(module.id, e.target.value)
                  }
                  name="permissions"
                  value="create"
                />
                Crear
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={isPermissionChecked(module.id, "read")}
                  onChange={(e) =>
                    onChangePermissions(module.id, e.target.value)
                  }
                  name="permissions"
                  value="read"
                />
                Leer
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={isPermissionChecked(module.id, "update")}
                  onChange={(e) =>
                    onChangePermissions(module.id, e.target.value)
                  }
                  name="permissions"
                  value="update"
                />
                Actualizar
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={isPermissionChecked(module.id, "delete")}
                  onChange={(e) =>
                    onChangePermissions(module.id, e.target.value)
                  }
                  name="permissions"
                  value="delete"
                />
                Borrar
              </label>
            </div>
          </details>
        ))}
      </div>
    </>
  );
};
