"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { passwordSchema } from "@/schemas/validations";
import { updatePassword } from "@/app/profile/actions";
import { Profile } from "@/domain/models/profile";

export default function EditPassword({
  userProfile,
}: {
  userProfile: Profile | null;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    try {
      passwordSchema.parse({ password, confirmPassword });

      await updatePassword(userProfile?.id ?? 0, password);

      setMessage("Contraseña actualizada");
    } catch (error) {
      setError("Formato de contraseña inválido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md gap-3 border-2 border-gray-300 p-4 rounded-lg"
    >
      <span className="text-green-500">
        {message}
      </span>
      <label htmlFor="password" className="font-semibold text-sm">
        Nueva Contraseña:
      </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <label htmlFor="confirmPassword" className="font-semibold text-sm">
        Confirmar Contraseña:
      </label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={isLoading || !password || !confirmPassword}
        className={`p-2 rounded-lg font-semibold text-sm text-white ${
          isLoading || !password || !confirmPassword
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Actualizando..." : "Actualizar Contraseña"}
      </button>
    </form>
  );
}
