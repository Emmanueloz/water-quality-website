// components/WelcomeMessage.tsx
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

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
      Bienvenido, {userProfile?.userName}
    </div>
  );
};

export default WelcomeMessage;
