'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from "zod";
import { profileSchema } from "@/schemas/validations"; // Asegúrate de que este esquema esté correctamente definido

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ email: "", password: "", confirmPassword: "", general: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError({ email: "", password: "", confirmPassword: "", general: "" });

    if (password !== confirmPassword) {
      setError((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }));
      setIsLoading(false);
      return;
    }

    try {
      profileSchema.parse({ email, password, confirmPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;
        setError({
          email: errors.email?.[0] || "",
          password: errors.password?.[0] || "",
          confirmPassword: errors.confirmPassword?.[0] || "",
          general: "",
        });
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // Enviamos solo email y password; la API se encargará de obtener el id del token
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Para asegurarnos de que se envíen las cookies
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
      } else {
        setError((prev) => ({ ...prev, general: data.message || "Error al actualizar el perfil" }));
      }
    } catch (err) {
      console.error("Error de conexión con el servidor:", err);
      setError((prev) => ({ ...prev, general: "Error de conexión con el servidor." }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <h1 className="mb-3 text-xl font-bold">Actualizar Perfil</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-3 border-2 border-gray-300 p-4 rounded-lg">
        <label htmlFor="email" className="font-semibold text-sm">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <p className="text-red-500 text-xs min-h-[16px]">{error.email}</p>

        <label htmlFor="password" className="font-semibold text-sm">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <p className="text-red-500 text-xs min-h-[16px]">{error.password}</p>

        <label htmlFor="confirmPassword" className="font-semibold text-sm">Confirmar Contraseña:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <p className="text-red-500 text-xs min-h-[16px]">{error.confirmPassword}</p>

        {/* Mostrar mensaje de error general */}
        {error.general && (
          <p className="text-red-500 text-xs text-center">{error.general}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || !email || !password || !confirmPassword}
          className={`p-2 rounded-lg font-semibold text-sm text-white ${
            isLoading || !email || !password || !confirmPassword
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Actualizando...' : 'Actualizar Perfil'}
        </button>
      </form>
    </div>
  );
}
