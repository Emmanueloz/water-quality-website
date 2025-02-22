"use client";
import { requestPasswordResetByEmail } from "@/app/reset-password/actions";
import { useState } from "react";
import { z } from "zod";

const emailSchema = z.object({
    email: z.string().trim().email("Ingrese un correo válido").min(5, "El correo debe tener al menos 5 caracteres"),
});


export default function PasswordRecoveryByEmail() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<string>(""); // Corregido
    const [message, setMessage] = useState("");

    const sendResetPassword = async () => {
        const result = emailSchema.safeParse({ email }); // Corregido

        if (!result.success) {
            const errors = result.error.format();

            if (errors.email?._errors) {
                setEmailError(errors.email._errors[0]);
            }
        } else {
            setEmailError("");
            const response = await requestPasswordResetByEmail(email);
            setMessage(response.message);
            console.log("Email válido:", email);
        }
    }
    return (
        <>
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
                className={`mt-4 p-3 text-white font-bold rounded-lgbg-blue-500 bg-blue-500 hover:bg-blue-600 
                    }`}
            >
                Recuperar contraseña
            </button>
        </>
    )
}
