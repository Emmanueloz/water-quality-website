"use client";

import React, { useState, useEffect } from "react";

interface Juego {
  id: number;
  nombre: string;
  descripcion: string;
}

const JuegosModule: React.FC = () => {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/juegos")
      .then((response) => response.json())
      .then((data) => setJuegos(data))
      .catch((error) => console.error("Error al obtener juegos:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const juegoData = { nombre, descripcion };
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `/api/juegos/${editingId}` : "/api/juegos";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(juegoData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el juego");
      }

      const result = await response.json();

      if (editingId) {
        setJuegos((prevJuegos) =>
          prevJuegos.map((juego) => (juego.id === editingId ? result : juego))
        );
      } else {
        setJuegos((prevJuegos) => [...prevJuegos, result]);
      }

      setNombre("");
      setDescripcion("");
      setEditingId(null);
    } catch (error) {
      console.error("Error al guardar el juego:", error);
    }
  };

  const handleEdit = (juego: Juego) => {
    setNombre(juego.nombre);
    setDescripcion(juego.descripcion);
    setEditingId(juego.id);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/juegos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el juego");
      }

      setJuegos((prevJuegos) => prevJuegos.filter((juego) => juego.id !== id));
    } catch (error) {
      console.error("Error al eliminar el juego:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestión de Juegos</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Actualizar" : "Agregar"}
        </button>
      </form>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Descripción</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map((juego) => (
            <tr key={juego.id}>
              <td className="border border-gray-300 p-2">{juego.id}</td>
              <td className="border border-gray-300 p-2">{juego.nombre}</td>
              <td className="border border-gray-300 p-2">{juego.descripcion}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <button
                  onClick={() => handleEdit(juego)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(juego.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JuegosModule;
