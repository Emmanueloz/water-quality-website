import EditUserInfo from "@/components/EditUserInfo";
import EditPassword from "@/components/EditPassword";
import { getProfileById } from "./actions";
import EditQuestionRecover from "@/components/EditQuestionRecover";
import Link from "next/link";
import { getUserToken } from "@/utils/getUserToken";
import ManageMySessions from "@/components/ManageMySessions";
import EnableAuth2Factor from "@/components/EnableAuth2Factor";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { tab } = await searchParams;

  const listTabs = [
    "email",
    "password",
    "question-recover",
    "sessions",
    "enable-2fa",
  ];

  let activeTab = "email";
  if (tab && typeof tab === "string" && listTabs.includes(tab)) {
    activeTab = tab;
  }

  const getProfile = async () => {
    const user = await getUserToken();
    const userID = user.id ?? 0;
    return await getProfileById(userID);
  };

  const userData = await getProfile();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 overflow-hidden bg-gray-50">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Perfil</h1>
      
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-wrap justify-center gap-3 mb-6 text-center">
        {[
          { label: "Editar usuario", value: "email" },
          { label: "Editar Contraseña", value: "password" },
          { label: "Editar Preguntas", value: "question-recover" },
          { label: "Doble Factor", value: "enable-2fa" },
          { label: "Mis sesiones", value: "sessions" },
        ].map(({ label, value }) => (
          <Link
            key={value}
            href={`/profile/?tab=${value}`}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg ${
              activeTab === value
                ? "bg-blue-500 text-white scale-105"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
      
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white shadow-xl rounded-xl p-8 flex flex-col items-center max-h-[70vh] overflow-y-auto">
        {activeTab === "email" && <EditUserInfo userProfile={userData} />}
        {activeTab === "password" && <EditPassword userProfile={userData} />}
        {activeTab === "question-recover" && <EditQuestionRecover userProfile={userData} />}
        {activeTab === "sessions" && <ManageMySessions userProfile={userData} />}
        {activeTab === "enable-2fa" && <EnableAuth2Factor userProfile={userData} />}
      </div>
    </div>
  );
}
