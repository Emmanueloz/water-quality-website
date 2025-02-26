"use client";

import EditEmail from "@/components/EditEmail";
import EditPassword from "@/components/EditPassword";
import { AuthContext } from "@/context/AuthProvider";
import { Profile } from "@/domain/models/profile";
import { useContext, useEffect, useState } from "react";
import { getProfileById } from "./actions";
import { get } from "http";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"email" | "password">("email");

  const { userProfile } = useContext(AuthContext);

  const [userData, setUserData] = useState<Profile | null>(null);

  const getProfile = async () => {
    const data = await getProfileById(userProfile?.id ?? 0);
    setUserData(data );
  };

  useEffect(() => {
    if (userProfile) {
      getProfile();
    }
  }, [userProfile]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <h1 className="mb-3 text-xl font-bold">Actualizar Perfil</h1>
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
            activeTab === "email" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("email")}
        >
          Editar Email
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
            activeTab === "password" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Editar Contraseña
        </button>
      </div>
      {activeTab === "email" ? (
        <EditEmail userProfile={userData} />
      ) : (
        <EditPassword userProfile={userData} />
      )}
    </div>
  );
}
