"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { Game } from "@/tipos/tipos";
import Select from "@/components/Select";
import { gameSchema } from "@/schemas/validations";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { z } from "zod";
import CardItem from "@/components/CardItem";
import { isHavePermission } from "@/utils/isHavePermission";

const categories = [
  { value: "Acción ", label: "Acción" },
  { value: "Aventura ", label: "Aventura " },
  { value: "Estrategia", label: "Estrategia" },
  { value: "Battle Royale", label: "Battle Royale" },
  { value: "Deportes", label: "Deportes" },
];

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

  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para el término de búsqueda

  const { userProfile, games, setGames } = useContext(AuthContext);

  const {
    items,
    isLoading,
    hasMore,
    lastItemRef,
    isMounted,
    setHasMore,
    setItems,
    setIsMounted,
    cleanState,
  } = useInfiniteScroll<Game>(async (page, userProfile) => {
    return await getGamesPaginated(page, 6, userProfile?.id ?? 0);
  }, 1);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: category,
  });

  // Filtrar juegos en tiempo real
  const filteredGames = games.filter((game) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      game.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      game.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getGamesPaginated = async (
    page: number,
    limit: number,
    userId: number
  ) => {
    const response = await fetch(
      `/api/juegos?userId=${userId}&page=${page}&limit=${limit}`
    );
    const data = await response.json();
    console.log(data);
    return data.data;
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
          category: errors.category?.[0],
        });
      }
      return false;
    }
  };

  const handleDeleteGame = async (gameId: number | undefined) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este proyecto?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`/api/juegos?gameId=${gameId}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          setGames(games.filter((p) => p.id !== gameId));
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
          setItems(
            items.map((g) => (g.id === currentGame.id ? result.game : g))
          );
          setGames(
            games.map((g) => (g.id === currentGame.id ? result.game : g))
          );
        } else {
          if (!hasMore) {
            setItems([...items, result.game]);
          }
          setGames([...games, result.game]);
        }
        closeModal();
      } else {
        console.error("Error al guardar el proyecto:", result.message);
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
      setGames(data.data ?? []);
    } else {
      console.error("Error al obtener los juegos:", data.message);
    }
  };

  // useEffect(() => {
  //   if (userProfile?.id) {
  //     getAllGamesPerUser();
  //   }
  // }, [userProfile]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      cleanState();
    };
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-4">
      {/* Campo de búsqueda */}
      {/* <input
        type="text"
        placeholder="Buscar por nombre o descripción..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      /> */}

      {(userProfile?.rol.toLowerCase() === "admin" ||
        isHavePermission(2, "create", userProfile)) && (
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Agregar Juego
        </button>
      )}

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
                  className={`w-full px-3 py-2 rounded-md border ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="block text-sm font-medium mb-1">
                  Categoria
                </label>
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
                <label className="block text-sm font-medium mb-1">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    formErrors.description ? "border-red-500" : ""
                  }`}
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
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 w-full gap-4 lg:max-h-[500px] overflow-y-auto border border-1">
        {(userProfile?.rol.toLowerCase() === "admin" ||
          isHavePermission(2, "read", userProfile)) &&
          items.map((game) => (
            <CardItem
              key={game.id}
              id={game.id!}
              nameModule="games"
              title={game.name}
              subtitle={game.description}
              item={game}
              openModal={
                userProfile?.rol.toLowerCase() === "admin" ||
                isHavePermission(2, "update", userProfile)
                  ? openModal
                  : undefined
              }
              handleDelete={
                userProfile?.rol.toLowerCase() === "admin" ||
                isHavePermission(2, "delete", userProfile)
                  ? handleDeleteGame
                  : undefined
              }
            />
          ))}
        {hasMore && <div ref={lastItemRef}></div>}
        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
