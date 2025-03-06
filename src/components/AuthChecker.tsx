// components/AuthChecker.tsx
"use client";

import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { decodificarToken } from "../lib/jwt";
import { getTokenUser } from "@/app/login/actions";
import { AuthContext } from "@/context/AuthProvider";
// import {}

const AuthChecker = () => {
    const router = useRouter();
    const { isAuthenticated } = useContext(AuthContext);
    // let interval = null;

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
                router.push("/login");
            }
        };

        const checkAuth = async () => {
            const token = await getTokenUser();

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
        if (isAuthenticated) {
            checkAuth();
            setTimeout(checkAuth, 125000);
        }

        // checkAuth();
        // const interval = setInterval(checkAuth, 125000);
        // return () => clearInterval(interval);
    }, [router, isAuthenticated]);

    return null;
};

export default AuthChecker;