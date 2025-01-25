"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { Project } from "@/tipos/tipos";
import Select from "@/components/Select";
import { projectSchema } from "@/schemas/validations";
import { z } from "zod";

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
    { value: "Cancelado", label: "Cancelado" }
];

const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [category, setCategory] = useState<string>(categories[0].value);
    const [status, setStatus] = useState<string>(statuses[0].value);
    const [formErrors, setFormErrors] = useState<{
        name?: string;
        description?: string;
        category?: string;
        status?: string;
        technologies?: string;
    }>({});

    const { userProfile, projects, setProjects } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: category,
        status: status,
        technologies: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        try {
            projectSchema.parse(formData);
            setFormErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = error.flatten().fieldErrors;
                setFormErrors({
                    name: errors.name?.[0],
                    description: errors.description?.[0],
                    category: errors.category?.[0],
                    status: errors.status?.[0],
                    technologies: errors.technologies?.[0]
                });
            }
            return false;
        }
    };
    const handleDeleteProject = async (projectId: number | undefined) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este proyecto?");

        if (confirmDelete) {
            try {
                const response = await fetch(`/api/proyectos?projectId=${projectId}`, {
                    method: "DELETE",
                });
                const data = await response.json();
                if (response.ok) {
                    setProjects(projects.filter(p => p.id !== projectId));
                } else {
                    console.error("Error al eliminar el proyecto:", data.message);
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const projectData = {
            ...formData,
            idUser: userProfile?.id,
            category: category,
            status: status
        };

        try {
            let response;
            if (isEditMode && currentProject) {
                response = await fetch(`/api/proyectos?projectId=${currentProject.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(projectData),
                });
            } else {
                response = await fetch("/api/proyectos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(projectData),
                });
            }

            const result = await response.json();

            if (response.ok) {
                if (isEditMode && currentProject) {
                    setProjects(projects.map(p =>
                        p.id === currentProject.id ? result.project : p
                    ));
                } else {
                    setProjects([...projects, result.project]);
                }
                closeModal();
            } else {
                console.error("Error al guardar el proyecto:", result.message);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const openModal = (project?: Project) => {
        if (project) {
            setIsEditMode(true);
            setCurrentProject(project);
            setFormData({
                name: project.name,
                description: project.description,
                category: project.category,
                status: project.status,
                technologies: project.technologies
            });
            setCategory(project.category);
            setStatus(project.status);
        } else {
            setIsEditMode(false);
            setCurrentProject(null);
            setFormData({
                name: "",
                description: "",
                category: categories[0].value,
                status: statuses[0].value,
                technologies: ""
            });
        }
        setFormErrors({});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            name: "",
            description: "",
            category: categories[0].value,
            status: statuses[0].value,
            technologies: ""
        });
        setCategory(categories[0].value);
        setStatus(statuses[0].value);
        setFormErrors({});
    };
    const getAllProjectsPerUser = async () => {
        const response = await fetch(`/api/proyectos?userId=${userProfile?.id}`);
        const data = await response.json();
        if (response.ok) {
            setProjects(data.data);
        } else {
            console.error("Error al obtener los proyectos:", data.message);
        }
    };

    useEffect(() => {
        if (userProfile?.id) {
            getAllProjectsPerUser();
        }
    }, [userProfile]);

    return (
        <div className="container mx-auto flex flex-col items-center justify-center p-4">
            <button
                onClick={() => openModal()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Crear Proyecto
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg md:w-1/2 lg:w-1/3 flex flex-col gap-4 justify-center items-center">
                        <h2 className="text-xl font-bold mb-4">
                            {isEditMode ? "Editar Proyecto" : "Crear Proyecto"}
                        </h2>
                        <form onSubmit={handleSubmit} className="w-9/12">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 rounded-md ${formErrors.name ? 'border-red-500' : ''}`}
                                />
                                {formErrors.name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formErrors.name}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <Select
                                    selectedValue={category}
                                    setSelectedValue={setCategory}
                                    options={categories}
                                />
                                {formErrors.category && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formErrors.category}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <Select
                                    selectedValue={status}
                                    setSelectedValue={setStatus}
                                    options={statuses}
                                />
                                {formErrors.status && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formErrors.status}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Tecnologías</label>
                                <textarea
                                    name="technologies"
                                    value={formData.technologies}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md ${formErrors.technologies ? 'border-red-500' : ''}`}
                                />
                                {formErrors.technologies && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formErrors.technologies}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Descripción</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-md ${formErrors.description ? 'border-red-500' : ''}`}
                                />
                                {formErrors.description && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formErrors.description}
                                    </p>
                                )}
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
                                    {isEditMode ? "Editar" : "Crear"}
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
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-96 flex flex-col"
                    >
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-600 mt-2 flex-grow">{project.description}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => openModal(project)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;