"use client";

import { deleteAllSessions, deleteSession } from "@/app/profile/actions";
import { ButtonDialog } from "./ButtonDialog";
import { useRouter } from "next/navigation";

export default function ButtonDeleteSession({
  mode,
  userId,
  token,
  currenToken,
}: {
  mode: "current" | "all";
  userId: number;
  token?: string;
  currenToken?: string;
}) {
  const router = useRouter();

  const handleAccept = async () => {
    if (mode === "current") {
      console.log("deleteSession", userId, token);
      await deleteSession(userId, token ?? "");
    } else {
      console.log("deleteAllSessions", userId, currenToken);
      deleteAllSessions(userId, currenToken ?? "");
    }
    router.push("/profile?tab=sessions");
  };

  return (
    <ButtonDialog
      title={
        mode === "current"
          ? "Estas seguro de eliminar"
          : "Cerrar todas las sesiones"
      }
      label="Cerrar sesión"
      message={`${
        mode === "current" ? "Esta sesión" : "Todas las sesiones"
      } será eliminada y tendrá que volver a iniciar sesión. ¿Estas seguro de eliminarla?`}
      accentColor="red-500"
      handleAccept={handleAccept}
    />
  );
}
