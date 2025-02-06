"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { AuthContext } from "@/context/AuthProvider";
import { loginSchema } from "@/schemas/validations";
import { requestPasswordReset } from "../reset-password/actions";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email("Ingrese un correo válido").min(5, "El correo debe tener al menos 5 caracteres"),
});

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ user: "", password: "", general: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>(""); // Corregido
  const [resetPassword, setResetPassword] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { setIsAuthenticated, setUserProfile } = useContext(AuthContext);

  const sendResetPassword = async () => {
    const result = emailSchema.safeParse({ email }); // Corregido

    if (!result.success) {
      const errors = result.error.format();
      
      if (errors.email?._errors) {
        setEmailError(errors.email._errors[0]);
      }
    } else {
      setEmailError("");
      const response = await requestPasswordReset(email);
      setMessage(response.message);
      console.log("Email válido:", email);
    }}

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
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
        router.push("/");
      } else {
        setError((prev) => ({ ...prev, general: data.message || "Error al iniciar sesión" }));
      }
    } catch {
      setError((prev) => ({ ...prev, general: "Error de conexión con el servidor." }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      
      {!resetPassword && (<>
        <h1 className="text-2xl font-bold mb-6">Iniciar Sesión</h1>
        <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md gap-4 border-2 border-gray-300 p-6 rounded-lg"
      >
        <label htmlFor="user" className="font-semibold">Usuario:</label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        />
        <p className="text-red-500 text-sm min-h-[20px]">{error.user}</p>

        <label htmlFor="password" className="font-semibold">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        />
        <p className="text-red-500 text-sm min-h-[20px]">{error.password}</p>

        <button
          type="submit"
          disabled={isLoading}
          className={`p-3 text-white font-bold rounded-lg ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>

      <p className="mt-4 text-red-500 text-sm font-semibold min-h-[20px]">{error.general}</p>

      <div className="mt-6">
        <span>¿No tienes cuenta? </span>
        <Link href="/register" className="text-blue-500 font-semibold hover:underline">
          Regístrate aquí
        </Link>
      </div>
      </>) }

      {resetPassword && (<>
        <div className="flex flex-col w-full max-w-md gap-4 border-2 border-gray-300 p-6 rounded-lg">
        <label htmlFor="email" className="font-semibold">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg"
        />
        <p className="text-red-500 text-sm min-h-[20px]">{emailError}</p>
        </div>
        
        {message && <p className="text-green-500 text-lg min-h-[20px]">{message}</p>}

        <button
          onClick={sendResetPassword}
          className={`mt-4 p-3 text-white font-bold rounded-lg ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Recuperar contraseña
        </button>
      </>)}
      <p className="mt-6 text-blue-500 font-semibold hover:underline cursor-pointer" onClick={() => setResetPassword(!resetPassword)}>{resetPassword ? "Login" : "Recuperar contraseña"}</p>
    </div>
  );
}
