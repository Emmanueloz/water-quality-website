"use client";
import { useState, useEffect, useContext } from "react";
import { z } from "zod";
import { getAllPrivilegios, createPrivilegio, updatePrivilegio } from "./action";
import { getAllModules } from "@/app/modulos/action";
import { AuthContext } from "@/context/AuthProvider";

// interface Module {
//     id: number;
//     name: string;
// }

// const modules: Module[] = [
//     { id: 1, name: "Proyectos" },   
//     { id: 2, name: "Juegos" },
//     { id: 3, name: "Materia" },
// ];

const privilegioSchema = z.object({
    name: z.string().trim().min(4, "El nombre es requerido"),
    idRoutes: z.array(z.number()).min(1, "Selecciona al menos un módulo")
});

const Page = () => {
    const { userProfile } = useContext(AuthContext);
    const [privilegios, setPrivilegios] = useState<IPrivilegio[]>([]);
    const [modules, setModules] = useState<IModule[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [nuevoPrivilegio, setNuevoPrivilegio] = useState<IPrivilegio>({
        name: "",
        idRoutes: [] as number[],
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fetchPrivilegios = async () => {
        try {
            const data = await getAllPrivilegios();
            setPrivilegios(data);
        } catch (error) {
            console.error("Error cargando privilegios:", error);
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

    useEffect(() => {
        if (userProfile?.rol === "usuario") {
            fetchModules();
            fetchPrivilegios();
        }
        
    }, [userProfile]);

    const handleOpenModal = (privilegio?: IPrivilegio) => {
        setErrors({});
        if (privilegio) {
            setNuevoPrivilegio({
                id: privilegio.id,
                name: privilegio.name,
                idRoutes: privilegio.idRoutes
            });
            setEditingId(privilegio.id);
        } else {
            setNuevoPrivilegio({
                name: "",
                idRoutes: []
            });
            setEditingId(null);
        }
        setShowModal(true);
    };

    const handleCheckboxChange = (routeId: number) => {
        setNuevoPrivilegio(prev => ({
            ...prev,
            idRoutes: prev.idRoutes.includes(routeId)
                ? prev.idRoutes.filter(r => r !== routeId)
                : [...prev.idRoutes, routeId]
        }));
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const validation = privilegioSchema.safeParse(nuevoPrivilegio);
            if (!validation.success) {
                const formattedErrors = validation.error.flatten().fieldErrors;
                setErrors(Object.fromEntries(
                    Object.entries(formattedErrors).map(([key, value]) => [key, value?.[0] ?? ""])
                ));
                return;
            }
            
            if (editingId) {
                const data = await updatePrivilegio(nuevoPrivilegio);
                setPrivilegios(prev => 
                    prev.map(p => p.id === editingId ? data : p)
                );
            } else {
                const data = await createPrivilegio(nuevoPrivilegio);
                setPrivilegios(prev => [...prev, data]);
            }

            setShowModal(false);
            setNuevoPrivilegio({ name: "", idRoutes: [] });
        } catch (error) {
            setErrors({ general: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Privilegios</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Agregar
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {privilegios.map((privilegio) => (
                    <div
                        key={privilegio.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full flex flex-col"
                    >
                        <h3 
                            className="text-lg font-semibold cursor-pointer"
                            onClick={() => handleOpenModal(privilegio)}
                        >
                            {privilegio.name}
                        </h3>
                        <div className="flex justify-between mt-4">
                            <button className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                                {privilegio.idRoutes.length} Rutas
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">
                            {editingId ? "Editar Privilegio" : "Nuevo Privilegio"}
                        </h2>

                        <div className="mb-4">
                            <label className="block mb-2">Nombre:</label>
                            <input
                                type="text"
                                value={nuevoPrivilegio.name}
                                onChange={(e) => setNuevoPrivilegio(prev => ({
                                    ...prev,
                                    name: e.target.value
                                }))}
                                className={`w-full px-3 py-2 border ${
                                    errors.name ? "border-red-500" : "border-gray-300"
                                } rounded-md`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Módulos:</label>
                            <div className="space-y-2">
                                {modules.map((module) => (
                                    <label key={module.id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={nuevoPrivilegio.idRoutes.includes(module.id)}
                                            onChange={() => handleCheckboxChange(module.id)}
                                            className="mr-2"
                                        />
                                        {module.name}
                                    </label>
                                ))}
                            </div>
                            {errors.idRoutes && (
                                <p className="text-red-500 text-sm mt-1">{errors.idRoutes}</p>
                            )}
                        </div>

                        {errors.general && (
                            <p className="text-red-500 text-sm mb-4">{errors.general}</p>
                        )}

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setNuevoPrivilegio({ name: "", idRoutes: [] });
                                    setErrors({});
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ${
                                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            >
                                {isSubmitting 
                                    ? "Procesando..." 
                                    : editingId 
                                        ? "Actualizar" 
                                        : "Guardar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;