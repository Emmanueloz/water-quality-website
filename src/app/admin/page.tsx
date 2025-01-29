// src/app/create-admin/page.tsx
"use client";

import { useState } from "react";

export default function CreateAdminPage() {
    const [usuario, setUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!usuario || !contraseña) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        const res = await fetch("/api/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Usuario: usuario, Contraseña: contraseña }),
        });

        const data = await res.json();

        if (res.ok) {
            setSuccess("Administrador creado correctamente.");
            setUsuario("");
            setContraseña("");
        } else {
            setError(data.message || "Error al crear el administrador.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
            <h1 className="text-2xl font-bold mb-6">Crear Administrador</h1>
            <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md gap-6 border-2 border-gray-300 p-6 rounded-lg"
      >
        <label htmlFor="user" className="font-semibold">
          Usuario:
        </label>
        <input
          type="text"
          id="user"
          name="user"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-lg"
        />

        <label htmlFor="password" className="font-semibold">
          Contraseña:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className= "p-3 text-white font-bold rounded-lg bg-blue-500 hover:bg-blue-600"
        >
            Crear Admin
        </button>
      </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
}
