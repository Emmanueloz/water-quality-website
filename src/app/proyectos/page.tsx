"use client";

import React, { useContext, useState, useEffect } from "react";
import Select from "@/components/Select";
import { AuthContext } from "@/context/AuthProvider";

const categories = [
    { value: "Frontend", label: "Frontend" },
    { value: "Backend", label: "Backend" },
    { value: "Fullstack", label: "Fullstack" },
    { value: "Mobile", label: "Mobile" },
    { value: "UI/UX", label: "UI/UX" },
    { value: "DevOps", label: "DevOps" },
    { value: "Data Science", label: "Data Science" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Big Data", label: "Big Data" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Blockchain", label: "Blockchain" },
    { value: "IoT", label: "IoT" },
    { value: "Tools & Automation", label: "Tools & Automation" },

];

const statuses = [
    { value: "Completado", label: "Completado" },
    { value: "En Desarrollo", label: "En Desarrollo" },
    { value: "Pausado", label: "Pausado" },
    { value: "Cancelado", label: "Cancelado" }];

const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { userProfile, projects, setProjects } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<string>(categories[0].value);
    const [status, setStatus] = useState<string>(statuses[0].value);
    const [technologies, setTechnologies] = useState<string>("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const getAllProjectsPerUser = async () => {
        const response = await fetch(`/api/proyectos?userId=${userProfile?.id}`);
        const data = await response.json();
        if (response.ok) {
            console.log("Proyectos obtenidos:", data);
            setProjects(data.data);
        } else {
            console.error("Error al obtener los proyectos:", data.message);
        }
    };

    const cleanForm = () => {
        setName("");
        setDescription("");
        setCategory(categories[0].value);
        setStatus(statuses[0].value);
        setTechnologies("");
    };
    const closeModal = () => {
        setIsModalOpen(false);
        cleanForm();
    };

    useEffect(() => {
        if (userProfile?.id) {
            getAllProjectsPerUser();
        }
    }, [userProfile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(userProfile?.id);
        const response = await fetch("/api/proyectos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: description,
                category: category,
                status: status,
                technologies: technologies,
                idUser: userProfile?.id
            }),
        });
        const data = await response.json();

        if (response.ok) {
            console.log("Proyecto creado:", data);
            setProjects([...projects, data.project]);
        } else {
            console.error("Error al crear el proyecto:", data.message);
        }
        closeModal();
    };

    return (
        <div className="container mx-auto flex flex-col items-center justify-center p-4">
            <button
                onClick={openModal}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Crear Proyecto
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg  md:w-1/2 lg:w-1/3 flex flex-col gap-4  justify-center items-center">
                        <h2 className="text-xl font-bold mb-4">Crear Proyecto</h2>
                        <form onSubmit={handleSubmit} className="w-9/12" >
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Nombre</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2  rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <Select selectedValue={category} setSelectedValue={setCategory} options={categories} />
                            </div>
                            <div className="mb-4">
                                <Select selectedValue={status} setSelectedValue={setStatus} options={statuses} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Tecnologías
                                </label>
                                <textarea
                                    value={technologies}
                                    onChange={(e) => setTechnologies(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Descripción
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-96 flex flex-col items-center"
                    >
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;