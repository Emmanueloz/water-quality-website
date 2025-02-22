"use client";

import { requestPasswordResetBySMS, validateCodeSMS } from "@/app/reset-password/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";


const phoneSchema = z.object({ phone: z.string().trim().min(10, "El telefono debe tener 10 digitos").regex(/^\d{10}$/, "El telefono debe tener 10 digitos numéricos") });
const smsSchema = z.object({ codeSMS: z.string().trim().min(6, "El codigo debe tener 6 digitos").regex(/^\d{6}$/, "El codigo debe tener 6 digitos numéricos") });


export default function PasswordRecoveryBySMS() {
    const router = useRouter();

    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState<string>("");
    const [codeSMS, setCodeSMS] = useState("");
    const [codeSMSError, setCodeSMSError] = useState<string>("");
    const [message, setMessage] = useState("");
    const [isSMSSent, setIsSMSSent] = useState(false);


    const sendResetPassword = async () => {
        const result = phoneSchema.safeParse({ phone }); // Corregido

        if (!result.success) {
            const errors = result.error.format();

            if (errors.phone?._errors) {
                setPhoneError(errors.phone._errors[0]);
            }
        } else {
            setPhoneError("");
            const response = await requestPasswordResetBySMS(phone);
            setMessage(response.message);
            if (response.success) {
                setIsSMSSent(true);
            }
            console.log(" Telefono válido:", phone);
        }
    }

    const sendCodeSMS = async () => {
        const result = smsSchema.safeParse({ codeSMS });
        if (!result.success) {
            const errors = result.error.format();
            if (errors.codeSMS?._errors) {
                setCodeSMSError(errors.codeSMS._errors[0]);
            }
        } else {
            setCodeSMSError("");
            const response = await validateCodeSMS(codeSMS);
            setMessage(response.message);
            if (response.success) {
                setTimeout(() => {
                    router.push(`/reset-password?token=${response.token}`);
                }, 3000);
            }
            console.log("Codigo SMS valido:", codeSMS);
        }
    }

    return (
        <div className="flex flex-col w-full max-w-md gap-4 border-2 border-gray-300 p-6 rounded-lg">
            {!isSMSSent && (<>
                <label htmlFor="phone" className="font-semibold">Telefono:</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg"
                />
                <p className="text-red-500 text-sm min-h-[20px]">{phoneError}</p>

                {message && <p className="text-green-500 text-lg min-h-[20px]">{message}</p>}

            </>)}
            {isSMSSent && (<><div className="flex flex-col w-full max-w-md gap-4 border-2 border-gray-300 p-6 rounded-lg">
                <label htmlFor="codeSMS" className="font-semibold">Código SMS:</label>
                <input
                    type="text"
                    id="codeSMS"
                    value={codeSMS}
                    onChange={(e) => setCodeSMS(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg"
                />
                <p className="text-red-500 text-sm min-h-[20px]">{codeSMSError}</p>
            </div>

                {message && <p className="text-green-500 text-lg min-h-[20px]">{message}</p>}</>)}

            <button
                onClick={isSMSSent ? sendCodeSMS : sendResetPassword}
                className={`mt-4 p-3 text-white font-bold rounded-lgbg-blue-500 bg-blue-500 hover:bg-blue-600 
                    }`}
            >
                Enviar
            </button>
        </div>
    )
}
