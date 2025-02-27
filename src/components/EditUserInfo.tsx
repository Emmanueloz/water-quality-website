"use client";

import { useEffect, useState } from "react";
import { useInfoSchema } from "@/schemas/validations";
import { updateEmail, updateUserInfo } from "@/app/profile/actions";
import { Profile } from "@/domain/models/profile";
import {  set, z } from "zod";

export default function EditUserInfo({
  userProfile,
}: {
  userProfile: Profile | null;
}) {
  const [email, setEmail] = useState(userProfile?.email ?? "");
  const [phone, setPhone] = useState(userProfile?.phone ?? "");
  const [error, setError] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      useInfoSchema.parse({ email, phone });

      await updateUserInfo(userProfile?.id ?? 0, email, phone);
      setError("");
      setErrorPhone("");
      setMessage("Datos actualizado");
    } catch (error) {
      console.log(error);

      setMessage("");
      if (error instanceof z.ZodError) {
        const formattedErrors = error.flatten().fieldErrors;
        console.log(formattedErrors);
        if (formattedErrors.email) {
          setError(formattedErrors.email.toString());
        } else if (formattedErrors.phone) {
          setErrorPhone(formattedErrors.phone.toString());
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userProfile) {
      return;
    }

    setEmail(userProfile?.email ?? "");
    setPhone(userProfile?.phone ?? "");
  }, [userProfile]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md gap-3 border-2 border-gray-300 p-4 rounded-lg"
    >
      <span className="text-green-500">{message}</span>
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
      <label htmlFor="phone" className="font-semibold text-sm">
        Nuevo teléfono:
      </label>
      <input
        type="string"
        id="phone"
        minLength={10}
        maxLength={10}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
      />
      {errorPhone && <p className="text-red-500 text-xs">{errorPhone}</p>}

      <button
        type="submit"
        disabled={isLoading || !email || !phone}
        className={`p-2 rounded-lg font-semibold text-sm text-white ${
          isLoading || !email || !phone
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isLoading ? "Actualizando..." : "Actualizar Email"}
      </button>
    </form>
  );
}
