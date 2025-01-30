"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { Game } from "@/tipos/tipos";
import Select from "@/components/Select";
import { gameSchema } from "@/schemas/validations";
import { z } from "zod";

const categories = [
    { value: "Acción ", label: "Acción" },
    { value: "Aventura ", label: "Aventura " },
    { value: "Estrategia", label: "Estrategia" },
    { value: "Battle Royale", label: "Battle Royale" },
    { value: "Deportes", label: "Deportes" },];

const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentGame, setCurrentGame] = useState<Game | null>(null);
    const [category, setCategory] = useState<string>(categories[0].value);
    const [formErrors, setFormErrors] = useState<{
        name?: string;
        description?: string;
        category?: string;
    }>({});

    const { userProfile, games, setGames } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: category
        });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        try {
            gameSchema.parse(formData);
            setFormErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = error.flatten().fieldErrors;
                setFormErrors({
                    name: errors.name?.[0],
                    description: errors.description?.[0],
                    category: errors.category?.[0]
                });
            }
            return false;
        }
    };
    const handleDeleteProject = async (gameId: number | undefined) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este proyecto?");

        if (confirmDelete) {
            try {
                const response = await fetch(`/api/juegos?gameId=${gameId}`, {
                    method: "DELETE",
                });
                const data = await response.json();
                if (response.ok) {
                    setGames(games.filter(p => p.id !== gameId));
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

        const gameData = {
            ...formData,
            idUser: userProfile?.id,
            category: category,
        };

        try {
            let response;
            if (isEditMode && currentGame) {
                response = await fetch(`/api/juegos?gameId=${currentGame.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(gameData),
                });
            } else {
                response = await fetch("/api/juegos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(gameData),
                });
            }

            const result = await response.json();

            if (response.ok) {
                if (isEditMode && currentGame) {
                    setGames(games.map(g =>
                        g.id === currentGame.id ? result.game : g
                    ));
                } else {
                    setGames([...games, result.game]);
                }
                closeModal();
            } else {
                console.error("Error al guardar el juego:", result.message);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const openModal = (game?: Game) => {
        if (game) {
            setIsEditMode(true);
            setCurrentGame(game);
            setFormData({
                name: game.name,
                description: game.description,
                category: game.category,
            });
            setCategory(game.category);
        } else {
            setIsEditMode(false);
            setCurrentGame(null);
            setFormData({
                name: "",
                description: "",
                category: categories[0].value,
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
        });
        setCategory(categories[0].value);
        setFormErrors({});
    };
    const getAllGamesPerUser = async () => {
        const response = await fetch(`/api/juegos?userId=${userProfile?.id}`);
        const data = await response.json();
        if (response.ok) {
            setGames(data.data);
        } else {
            console.error("Error al obtener los juegos:", data.message);
        }
    };

    useEffect(() => {
        if (userProfile?.id) {
            getAllGamesPerUser();
        }
    }, [userProfile]);

    return (
        <div className="container mx-auto flex flex-col items-center justify-center p-4">
            <button
                onClick={() => openModal()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Agregar Juego
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg md:w-1/2 lg:w-1/3 flex flex-col gap-4 justify-center items-center">
                        <h2 className="text-xl font-bold mb-4">
                            {isEditMode ? "Editar " : "Crear "}
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
                {games.map((game) => (
                    <div
                        key={game.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-96 flex flex-col"
                    >
                        <h3 className="text-lg font-semibold">{game.name}</h3>
                        <p className="text-sm text-gray-600 mt-2 flex-grow">{game.description}</p>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => openModal(game)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteProject(game.id)}
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