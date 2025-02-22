"use client";
import { useState } from "react";
import PasswordRecoveryByEmail from "./PasswordRecoveryByEmail";
import PasswordRecoveryBySMS from "./PasswordRecoveryBySMS";

export default function PasswordRecovery() {
    const [recoveryMethod, setRecoveryMethod] = useState<"email" | "questions" | "sms" | null>(null);
    const [securityAnswer, setSecurityAnswer] = useState("");

    return (
        <div className="flex flex-col items-center w-full max-w-md p-6 border-2 border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-xl font-semibold mb-4">Recuperar contraseña</h2>

            {/* Botones de selección */}
            <div className="flex gap-3 mb-4">
                <button
                    className={`p-3 rounded-lg font-bold ${recoveryMethod === "email" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setRecoveryMethod("email")}
                >
                    Por Email
                </button>
                <button
                    className={`p-3 rounded-lg font-bold ${recoveryMethod === "questions" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setRecoveryMethod("questions")}
                >
                    Por Preguntas
                </button>
                <button
                    className={`p-3 rounded-lg font-bold ${recoveryMethod === "sms" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                    onClick={() => setRecoveryMethod("sms")}
                >
                    Por Código SMS
                </button>
            </div>

            {/* Formulario dinámico */}
            {recoveryMethod === "email" && (
                <PasswordRecoveryByEmail />
            )}

            {recoveryMethod === "questions" && (
                <div className="w-full">
                    <label className="font-semibold">Respuesta de seguridad:</label>
                    <input
                        type="text"
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                    />
                </div>
            )}

            {recoveryMethod === "sms" && (
                <PasswordRecoveryBySMS />
            )}
        </div>
    );
}
