"use client";
import { Profile } from "@/domain/models/profile";
import { SetStateAction, useEffect, useState } from "react";
import { getProfileById, updateTwoFactorEnabled } from "@/app/profile/actions";

export default function EnableAuth2Factor({
    userProfile,
    setUserProfile,
}: {
    userProfile: Profile | null;
    setUserProfile: React.Dispatch<SetStateAction<Profile | null>>
}) {
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(userProfile?.isTwoFactorEnabled);
    const [isLoading, setIsLoading] = useState(false);

    const handleEnableTwoFactor = async () => {
        if (!userProfile || isLoading) return;
        setIsLoading(true);
        await updateTwoFactorEnabled(userProfile.id, !isTwoFactorEnabled);
        setIsTwoFactorEnabled(!isTwoFactorEnabled);
        setIsLoading(false);
    };
    useEffect(() => {
        if (!userProfile) return;

        const fetchProfile = async () => {
            const updatedProfile = await getProfileById(userProfile.id);
            if (updatedProfile) {
                setUserProfile(updatedProfile);
                setIsTwoFactorEnabled(updatedProfile.isTwoFactorEnabled);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between w-full max-w-md">
            <div>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Autenticación de Dos Factores
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Añade una capa extra de seguridad a tu cuenta.
                </p>
            </div>

            <button
                onClick={handleEnableTwoFactor}
                className={`relative flex items-center w-12 h-6 rounded-full transition-all ${isTwoFactorEnabled ? "bg-blue-500" : "bg-gray-300"
                    }`}
                disabled={isLoading}
            >
                <div
                    className={`absolute w-6 h-6 bg-white rounded-full shadow-md transition-all ${isTwoFactorEnabled ? "translate-x-6" : "translate-x-0"
                        }`}
                />
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </button>
        </div>
    );
}
