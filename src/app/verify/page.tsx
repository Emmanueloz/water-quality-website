"use client";
import { useEffect, useState, useContext } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContext } from "@/context/AuthProvider";


export default function VerifyPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");
    const { setIsAuthenticated, setUserProfile } = useContext(AuthContext);


    useEffect(() => {
        async function verifyToken() {
            try {
                const response = await fetch("/api/verifyAuth2FT", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token }),
                });
                const result = await response.json();

                if (result.success) {
                    setStatus("success");
                    setMessage("Verificación exitosa. Redirigiendo a la aplicación...");
                    Cookies.set("auth_token", result.token, { expires: 1, path: "/" });
                    setIsAuthenticated(true);
                    setUserProfile({
                        id: result.usuario.id,
                        userName: result.usuario.Usuario,
                        rol: result.usuario.rol,
                        exp: result.usuario.exp,
                        iat: result.usuario.iat,
                        modules: result.usuario.modules,
                    });
                    setTimeout(() => {
                        router.push("/");
                    }, 2000);
                } else {
                    setStatus("error");
                    setMessage("Token inválido o expirado. Redirigiendo al login...");
                    setTimeout(() => {
                        router.push("/");
                    }, 2000);
                }
            } catch (error) {
                setStatus("error");
                setMessage("Error al verificar el token. Redirigiendo al login...");
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        }

        if (token) {
            verifyToken();
        } else {
            setStatus("error");
            setMessage("Token no encontrado. Redirigiendo al login...");
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
                {status === "loading" && (
                    <div>
                        <svg
                            className="animate-spin h-10 w-10 text-blue-500 mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                        <p className="mt-4 text-gray-700 font-medium">
                            Verificando token, por favor espera...
                        </p>
                    </div>
                )}

                {status === "success" && (
                    <div>
                        <svg
                            className="h-12 w-12 text-green-500 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                        <p className="mt-4 text-green-600 font-bold">{message}</p>
                    </div>
                )}

                {status === "error" && (
                    <div>
                        <svg
                            className="h-12 w-12 text-red-500 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                        <p className="mt-4 text-red-600 font-bold">{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
