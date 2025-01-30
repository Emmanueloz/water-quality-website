"use client";

import { useState } from "react";

export default function Admin() {
  const [usuario, setUsuario] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Usuario: usuario, Contraseña: contraseña }),
    });

    const data = await res.json();
    setMessage(data.message);
    if (res.ok) {
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
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
          className="p-3 text-white font-bold rounded-lg bg-blue-500 hover:bg-blue-600"
        >
          Crear Admin
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}
