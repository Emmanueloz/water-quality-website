"use client";
import { useContext, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { AuthContext } from "@/context/AuthProvider";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { isAuthenticated, setIsAuthenticated, setUserProfile } =
    useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!user.trim() || !password.trim()) {
      setError("Por favor, complete todos los campos.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Usuario: user, Contraseña: password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("auth_token", data.token, { expires: 1, path: "/" }); // El token dura 1 día

        // Redirigir al usuario a la página principal
        setIsAuthenticated(true);
        setUserProfile({
          id: data.usuario.id,
          userName: data.usuario.Usuario,
          rol: data.usuario.rol,
          exp: data.usuario.exp,
          iat: data.usuario.iat,
          modules: data.usuario.modules
        });
        router.push("/");
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <h1 className="text-2xl font-bold mb-6">Iniciar Sesión</h1>
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
          value={user}
          onChange={(e) => setUser(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-lg"
        />

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

      {error && <p className="text-red-500 font-semibold mt-4">{error}</p>}

      <div className="mt-6">
        <span>¿No tienes cuenta? </span>
        <Link
          href="/register"
          className="text-blue-500 font-semibold hover:underline"
        >
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
}
