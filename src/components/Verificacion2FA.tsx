import { useEffect, useState } from "react";

export default function Verificacion2FA() {
    const [timeLeft, setTimeLeft] = useState(120);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="text-center p-6">
            <h2 className="text-xl font-bold">Verifica tu inicio de sesión</h2>
            <p>Revisa tu correo electrónico y haz clic en el enlace de verificación.</p>
            <p>Tiempo restante: {timeLeft} segundos</p>
        </div>
    );
}
