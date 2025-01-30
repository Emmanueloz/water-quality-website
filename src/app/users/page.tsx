"use client";
import { Usuario } from "@/tipos/tipos";
import { useState, useEffect } from "react";

const Page = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [rol, setRol] = useState("");
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
        loadUsers();
    }, []);

    const handleEditarUsuario = (usuario: Usuario) => {
        setSelectedUsuario(usuario);
        setRol(usuario.rol);
        setShowModal(true);
    };

    const saveChanges = async () => {
        if (!selectedUsuario) return;

        try {
            const response = await fetch(`/api/usuarios/${selectedUsuario.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rol }),
            });

            if (!response.ok) throw new Error("Error al actualizar");

            const usuarioActualizado = await response.json();
            
            setUsuarios(prev => 
                prev.map(u => u.id === usuarioActualizado.id ? usuarioActualizado : u)
            );
            
            setShowModal(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Usuarios</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {usuarios.length > 0 && usuarios.map((usuario) => (
                    <div
                        key={usuario.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div
                            className="cursor-pointer"
                            onClick={() => handleEditarUsuario(usuario)}
                        >
                            <h3 className="text-lg font-semibold">{usuario.Usuario}</h3>
                            <p className="text-gray-600">{usuario.rol}</p>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && selectedUsuario && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
                        
                        <div className="mb-4">
                            <label className="block mb-2">Nombre:</label>
                            <input
                                type="text"
                                value={selectedUsuario.Usuario}
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Rol:</label>
                            <select
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="Nivel básico">Nivel básico</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Editor">Editor</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={saveChanges}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
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