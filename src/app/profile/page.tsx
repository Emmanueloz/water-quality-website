"use client";

import EditUserInfo from "@/components/EditUserInfo";
import EditPassword from "@/components/EditPassword";
import { AuthContext } from "@/context/AuthProvider";
import { Profile } from "@/domain/models/profile";
import { useContext, useEffect, useState } from "react";
import { getProfileById } from "./actions";
import EditQuestionRecover from "@/components/EditQuestionRecover";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "email" | "password" | "question-recover"
  >("email");

  const { userProfile } = useContext(AuthContext);

  const [userData, setUserData] = useState<Profile | null>(null);

  const getProfile = async () => {
    const data = await getProfileById(userProfile?.id ?? 0);
    console.log(data);
    
    setUserData(data);
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
          Editar usuario
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
            activeTab === "password" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Editar Contraseña
        </button>

        <button
          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
            activeTab === "question-recover"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("question-recover")}
        >
          Editar Preguntas
        </button>
      </div>
      {activeTab === "email" && <EditUserInfo userProfile={userData} />}
      {activeTab === "password" && <EditPassword userProfile={userData} />}
      {activeTab === "question-recover" && (
        <EditQuestionRecover userProfile={userData} />
      )}
    </div>
  );
}
