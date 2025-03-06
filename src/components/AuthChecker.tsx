// components/AuthChecker.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { decodificarToken } from "../lib/jwt";

const AuthChecker = () => {
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                // Llamar a la API de logout
                await fetch('/api/logout', {
                    method: 'POST',
                    credentials: 'include' // Incluye las cookies
                });
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            } finally {
                // Limpiar siempre el cliente
                localStorage.removeItem("token");
                router.push("/login");
            }
        };

        const checkAuth = () => {
            const token = localStorage.getItem("token");

            if (!token) {
                handleLogout();
                return;
            }

            const decoded = decodificarToken(token);
            const isExpired = decoded?.exp ? Date.now() > decoded.exp * 1000 : true;

            if (isExpired || !decoded) {
                handleLogout();
            }
        };

        checkAuth();
        const interval = setInterval(checkAuth, 125000);
        return () => clearInterval(interval);
    }, [router]);

    return null;
};

export default AuthChecker;