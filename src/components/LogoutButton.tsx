import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Sesión cerrada exitosamente");
        setIsAuthenticated(false); // Actualizar estado local
        router.push("/"); // Redirigir a la página principal
      } else {
        const errorData = await response.json();
        console.error("Error al cerrar sesión:", errorData.message);
        alert("No se pudo cerrar la sesión. Inténtalo nuevamente.");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Ocurrió un error. Inténtalo más tarde.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold px-2 rounded"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
