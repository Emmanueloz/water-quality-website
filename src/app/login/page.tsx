"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { AuthContext } from "@/context/AuthProvider";
import { loginSchema } from "@/schemas/validations";
import { z } from "zod";
import PasswordRecovery from "@/components/PasswordRecovery";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ user: "", password: "", general: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const router = useRouter();

  const {
    isAuthenticated,
    setIsCountNewSession,
    setIsAuthenticated,
    setUserProfile,
  } = useContext(AuthContext);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    setError({ user: "", password: "", general: "" });

    try {
      loginSchema.parse({ user, password });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;
        setError({
          user: errors.user?.[0] || "",
          password: errors.password?.[0] || "",
          general: "",
        });
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Usuario: user, Contraseña: password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("auth_token", data.token, { expires: 1, path: "/" });
        setIsAuthenticated(true);
        setUserProfile({
          id: data.usuario.id,
          userName: data.usuario.Usuario,
          rol: data.usuario.rol,
          exp: data.usuario.exp,
          iat: data.usuario.iat,
          modules: data.usuario.modules,
        });
        router.push("/profile?tab=sessions");
      } else {
        setError((prev) => ({
          ...prev,
          general: data.message || "Error al iniciar sesión",
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

  useEffect(() => {
    setIsCountNewSession(0);
    if (isAuthenticated) {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      {!resetPassword && (
        <>
          <h1 className="text-2xl font-bold mb-6">Iniciar Sesión</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-md gap-4 border-2 border-gray-300 p-6 rounded-lg"
          >
            <label htmlFor="user" className="font-semibold">
              Usuario:
            </label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg"
            />
            <p className="text-red-500 text-sm min-h-[20px]">{error.user}</p>

            <label htmlFor="password" className="font-semibold">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg"
            />
            <p className="text-red-500 text-sm min-h-[20px]">
              {error.password}
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className={`p-3 text-white font-bold rounded-lg ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          <p className="mt-4 text-red-500 text-sm font-semibold min-h-[20px]">
            {error.general}
          </p>

          <div className="mt-6">
            <span>¿No tienes cuenta? </span>
            <Link
              href="/register"
              className="text-blue-500 font-semibold hover:underline"
            >
              Regístrate aquí
            </Link>
          </div>
        </>
      )}

      {resetPassword && <PasswordRecovery />}
      <p
        className="mt-6 text-blue-500 font-semibold hover:underline cursor-pointer"
        onClick={() => setResetPassword(!resetPassword)}
      >
        {resetPassword ? "Login" : "Recuperar contraseña"}
      </p>
    </div>
  );
}
