"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerSchema } from "@/schemas/validations";
import { z } from "zod";

export default function RegisterPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState({ user: "", password: "", confirmPassword: "", general: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setError({ user: "", password: "", confirmPassword: "", general: "" });

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }));
      setIsLoading(false);
      return;
    }

    // Validar el formulario con Zod
    try {
      registerSchema.parse({ user, password, confirmPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;
        setError({
          user: errors.user?.[0] || "",
          password: errors.password?.[0] || "",
          confirmPassword: errors.confirmPassword?.[0] || "",
          general: "",
        });
        setIsLoading(false);
        return;
      }
    }

    // Enviar datos al backend
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Usuario: user, Contraseña: password, acceptTerms}),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login'); // Redirigir al login si el registro es exitoso
      } else {
        // Mostrar mensaje de error del backend
        setError((prev) => ({ ...prev, general: data.message || "Error al registrar el usuario" }));
      }
    } catch {
      setError((prev) => ({ ...prev, general: "Error de conexión con el servidor." }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <h1 className="mb-3 text-xl font-bold">Registro de Usuario</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-3 border-2 border-gray-300 p-4 rounded-lg">
        <label htmlFor="user" className="font-semibold text-sm">Usuario:</label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <p className="text-red-500 text-xs min-h-[16px]">{error.user}</p>

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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="acceptTerms" className="text-xs">
            Acepto el <a href="/privacidad" className="text-blue-500 underline">aviso de privacidad</a>
          </label>
        </div>

        {/* Mostrar mensaje de error general */}
        {error.general && (
          <p className="text-red-500 text-xs text-center">{error.general}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || !acceptTerms}
          className={`p-2 rounded-lg font-semibold text-sm text-white ${
            isLoading || !acceptTerms ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Registrando...' : 'Registrar Usuario'}
        </button>
      </form>
    </div>
  );
}