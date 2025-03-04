import EditUserInfo from "@/components/EditUserInfo";
import EditPassword from "@/components/EditPassword";

import { getProfileById } from "./actions";
import EditQuestionRecover from "@/components/EditQuestionRecover";
import Link from "next/link";
import { getUserToken } from "@/utils/getUserToken";
import ManageMySessions from "@/components/ManageMySessions";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { tab } = await searchParams;

  const listTabs = ["email", "password", "question-recover", "sessions"];

  let activeTab = "email";

  if (tab && typeof tab === "string" && listTabs.includes(tab)) {
    activeTab = tab;
  }

  const getProfile = async () => {
    const user = await getUserToken();
    const userID = user.id ?? 0;

    const data = await getProfileById(userID);
    console.log(data);

    return data;
  };

  console.log(activeTab, tab);

  const userData = await getProfile();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <h1 className="mb-3 text-xl font-bold">Actualizar Perfil</h1>
      <div className="flex gap-4 mb-4">
        <Link
          href="/profile/?tab=email"
          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
            activeTab === "email" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Editar usuario
        </Link>
        <Link
          href="/profile/?tab=password"
          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
            activeTab === "password" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Editar Contraseña
        </Link>

        <Link
          href="/profile/?tab=question-recover"
          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
            activeTab === "question-recover"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Editar Preguntas
        </Link>
        <Link
          href="/profile/?tab=sessions"
          className={`px-4 py-2 rounded-lg font-semibold text-sm ${
            activeTab === "sessions" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Mis sesiones
        </Link>
      </div>
      {activeTab === "email" && <EditUserInfo userProfile={userData} />}
      {activeTab === "password" && <EditPassword userProfile={userData} />}
      {activeTab === "question-recover" && (
        <EditQuestionRecover userProfile={userData} />
      )}
      {activeTab === "sessions" && <ManageMySessions userProfile={userData} />}
    </div>
  );
}
