"use client";
import { Usuario } from "@/tipos/tipos";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { FormPermissionsModule } from "@/components/FormPermissionsModule";
import { getAllModules } from "../modulos/action";
import { updatePrivilegio } from "../privilegios/action";

const Page = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modules, setModules] = useState<IModule[]>([]);
  const [nuevoPrivilegio, setNuevoPrivilegio] = useState<IPrivilegio>({
    name: "",
    idRoutes: [] as number[],
  });

  const loadUsers = async () => {
    try {
      const response = await fetch("/api/usuarios");
      const data = await response.json();
      setUsuarios(data.usuarios);
      console.log("Usuarios cargados:", data.usuarios);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadUsers();
      fetchModules();
    }
  }, [isAuthenticated]);

  const handleEditarUsuario = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    if (usuario.modulesPermissions.length > 0) {
      const idRoutes = usuario.modulesPermissions?.map((m) => m.idRoute) ?? [];
      setNuevoPrivilegio({
        idRoutes,
        modulesPermissions: usuario.modulesPermissions,
      });
    }
    setShowModal(true);
  };

  const handleCheckboxChange = (routeId: number) => {
    setNuevoPrivilegio((prev) => ({
      ...prev,
      idRoutes: prev.idRoutes.includes(routeId)
        ? prev.idRoutes.filter((r) => r !== routeId)
        : [...prev.idRoutes, routeId],
      modulesPermissions: prev.idRoutes.includes(routeId)
        ? prev.modulesPermissions?.filter((r) => r.idRoute !== routeId)
        : [
            ...(prev.modulesPermissions ?? []),
            {
              idRoute: routeId,
              permissions: ["create", "read", "update", "delete"],
            },
          ],
    }));
  };

  const handleCheckboxChangePermissions = (
    routeId: number,
    permission: string,
    checked: boolean
  ) => {
    console.log(routeId, permission);

    const module = nuevoPrivilegio.modulesPermissions?.find(
      (m) => m.idRoute === routeId
    );

    if (!module) {
      setNuevoPrivilegio((prev) => ({
        ...prev,
        modulesPermissions: [
          ...(prev.modulesPermissions ?? []),
          { idRoute: routeId, permissions: [permission] },
        ],
      }));
    } else {
      setNuevoPrivilegio((prev) => {
        if (!checked) {
          return {
            ...prev,
            modulesPermissions: prev.modulesPermissions?.map((m) =>
              m.idRoute === routeId
                ? {
                    ...m,
                    permissions: Array.isArray(m.permissions)
                      ? m.permissions.filter((p) => p !== permission)
                      : [],
                  }
                : m
            ),
          };
        }

        return {
          ...prev,
          modulesPermissions: prev.modulesPermissions?.map((m) =>
            m.idRoute === routeId
              ? { ...m, permissions: [...m.permissions, permission] }
              : m
          ),
        };
      });
    }
  };

  const fetchModules = async () => {
    try {
      const data = await getAllModules();
      setModules(data);
    } catch (error) {
      console.error("Error cargando privilegios:", error);
    }
  };

  const saveChanges = async () => {
    if (!selectedUsuario) return;

    try {
      const data = await updatePrivilegio({
        userId: selectedUsuario.id,
        ...nuevoPrivilegio,
      });
      console.log(data);
      loadUsers();
      setShowModal(false);
    } catch (error) {
      console.error("Error actualizando usuario:");
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Usuarios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {usuarios.length > 0 &&
          usuarios.map((usuario) => (
            <div
              key={usuario.id}
              className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl"
            >
              <div
                className="cursor-pointer"
                onClick={() => handleEditarUsuario(usuario)}
              >
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {usuario.Usuario}
                </h3>
              </div>
            </div>
          ))}
      </div>

      {showModal && selectedUsuario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-90 max-w-full space-y-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Editar Usuario
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700">Nombre:</label>
              <input
                type="text"
                value={selectedUsuario.Usuario}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <FormPermissionsModule
                modules={modules}
                privilegio={nuevoPrivilegio}
                onChange={handleCheckboxChange}
                onChangePermissions={handleCheckboxChangePermissions}
              />
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={saveChanges}
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
