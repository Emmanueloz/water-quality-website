"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { emailSchema } from "@/schemas/validations";
import { updateEmail } from "@/app/profile/actions";
import { Profile } from "@/domain/models/profile";

export default function EditEmail({
  userProfile,
}: {
  userProfile: Profile | null;
}) {
  const [email, setEmail] = useState(userProfile?.email ?? "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      emailSchema.parse({ email });

      await updateEmail(userProfile?.id ?? 0, email);
     
    } catch (error) {
      console.log(error);

      setError("Formato de email inválido");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userProfile) {
      return;
    }

    setEmail(userProfile?.email ?? "");
  }, [userProfile]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md gap-3 border-2 border-gray-300 p-4 rounded-lg"
    >
      <label htmlFor="email" className="font-semibold text-sm">
        Nuevo Email:
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={isLoading || !email}
        className={`p-2 rounded-lg font-semibold text-sm text-white ${
          isLoading || !email
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Actualizando..." : "Actualizar Email"}
      </button>
    </form>
  );
}
