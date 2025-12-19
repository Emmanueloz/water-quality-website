"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/schemas/validations";
import { z } from "zod";
import {
  SecurityQuestion,
  SecurityQuestionText,
} from "@/domain/models/QuestionRecover";

export default function RegisterPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Nuevo campo de teléfono
  const [question1, setQuestion1] = useState<SecurityQuestion | "">("");
  const [question2, setQuestion2] = useState<SecurityQuestion | "">("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState({
    user: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    general: "",
    answer1: "",
    answer2: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    console.log("registro");

    e.preventDefault();
    setIsLoading(true);
    setError({
      user: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      general: "",
      answer1: "",
      answer2: "",
    });

    if (password !== confirmPassword) {
      console.log("contraseñas diferentes");
      setError((prev) => ({
        ...prev,
        confirmPassword: "Las contraseñas no coinciden",
      }));
      setIsLoading(false);
      return;
    }

    try {
      console.log("validando");
      registerSchema.parse({
        user,
        password,
        confirmPassword,
        email,
        phone,
        answer1,
        answer2,
      });
    } catch (error) {
      console.log("error de validacion");
      console.log(error);
      if (error instanceof z.ZodError) {
        const errors = error;
        console.log(errors);
        setError({
          user: "",
          password: "",
          confirmPassword: "",
          email: "",
          phone: "",
          general: "",
          answer1: "",
          answer2: "",
        });
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Usuario: user,
          Contraseña: password,
          Email: email,
          phone: phone,
          acceptTerms,
          answers: [
            {
              questionNum: question1,
              answer: answer1,
            },
            {
              questionNum: question2,
              answer: answer2,
            },
          ],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/login");
      } else {
        setError((prev) => ({
          ...prev,
          general: data.message || "Error al registrar el usuario",
        }));
      }
    } catch {
      setError((prev) => ({
        ...prev,
        general: "Error de conexión con el servidor.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <h1 className="mb-3 text-xl font-bold">Registro de Usuario</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-3xl gap-3 border-2 border-gray-300 p-4 rounded-lg"
      >
        <label htmlFor="user" className="font-semibold text-sm">
          Usuario:
        </label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-sm"
        />
        <p className="text-red-500 text-xs">{error.user}</p>

        <label htmlFor="email" className="font-semibold text-sm">
          Correo Electrónico:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-sm"
        />
        <p className="text-red-500 text-xs">{error.email}</p>

        <label htmlFor="phone" className="font-semibold text-sm">
          Teléfono:
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-sm"
        />
        <p className="text-red-500 text-xs">{error.phone}</p>

        <div className="flex justify-between gap-3">
          <div className="w-1/2">
            <label className="font-semibold text-sm">Pregunta 1:</label>
            <select
              value={question1}
              onChange={(e) =>
                setQuestion1(Number(e.target.value) as SecurityQuestion)
              }
              className="p-2 border rounded-lg text-sm w-full"
            >
              <option value={-1}>Selecciona una pregunta</option>
              {Object.values(SecurityQuestion)
                .filter(
                  (value) =>
                    typeof value === "number" &&
                    (value !== question2 || (value as number) === -1)
                )
                .map((value) => (
                  <option key={value} value={value}>
                    {SecurityQuestionText[value as SecurityQuestion]}
                  </option>
                ))}
            </select>
            <p className="text-red-500 text-xs">{error.answer1}</p>
          </div>

          <div className="w-1/2">
            <label className="font-semibold text-sm">Pregunta 2:</label>
            <select
              value={question2}
              onChange={(e) =>
                setQuestion2(Number(e.target.value) as SecurityQuestion)
              }
              className="p-2 border rounded-lg text-sm w-full"
            >
              <option value={-1}>Selecciona una pregunta</option>
              {Object.values(SecurityQuestion)
                .filter(
                  (value) =>
                    typeof value === "number" &&
                    (value !== question1 || (value as number) === -1)
                )
                .map((value) => (
                  <option key={value} value={value}>
                    {SecurityQuestionText[value as SecurityQuestion]}
                  </option>
                ))}
            </select>
            <p className="text-red-500 text-xs">{error.answer2}</p>
          </div>
        </div>

        <label className="font-semibold text-sm">Respuestas:</label>
        <input
          type="text"
          value={answer1}
          onChange={(e) => setAnswer1(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-sm"
          placeholder="Respuesta 1"
        />
        <input
          type="text"
          value={answer2}
          onChange={(e) => setAnswer2(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-sm"
          placeholder="Respuesta 2"
        />

        <label htmlFor="password" className="font-semibold text-sm">
          Contraseña:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg text-sm"
        />
        <p className="text-red-500 text-xs">{error.password}</p>

        <label htmlFor="confirmPassword" className="font-semibold text-sm">
          Confirmar Contraseña:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <p className="text-red-500 text-xs min-h-[16px]">
          {error.confirmPassword}
        </p>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="acceptTerms" className="text-xs">
            Acepto el{" "}
            <a href="/privacidad" className="text-blue-500 underline">
              aviso de privacidad
            </a>
          </label>
        </div>
        {error.general && (
          <p className="text-red-500 text-xs text-center">{error.general}</p>
        )}
        <button
          type="submit"
          disabled={isLoading || !acceptTerms}
          className={`p-2 rounded-lg text-sm text-white ${
            isLoading || !acceptTerms
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Registrando..." : "Registrar Usuario"}
        </button>
      </form>
    </div>
  );
}
