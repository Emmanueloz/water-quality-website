// components/WelcomeMessage.tsx
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import Link from "next/link";

interface WelcomeMessageProps {
  className?: string; // Acepta className como prop
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ className }) => {
  const { isAuthenticated, userProfile } = useContext(AuthContext);

  if (!isAuthenticated) {
    return null; // No mostrar el mensaje si no está autenticado
  }

  return (
    <div className={className ? className : "text-white"}>
      <Link href="/profile" className=" hover:underline">
        Bienvenido, {userProfile?.userName}
      </Link>
    </div>
  );
};

export default WelcomeMessage;
