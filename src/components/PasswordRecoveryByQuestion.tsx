import { useState } from "react";

export default function PasswordRecoveryByQuestion() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  

  return (
    <form className="flex flex-col w-full max-w-md gap-4 border-2 border-gray-300 p-6 rounded-lg">
      <label className="font-semibold">Usuario</label>
      <input
        type="text"
        maxLength={50}
        className="w-full p-3 border border-gray-300 rounded-lg mt-2"
        placeholder="Usuario"
      />
      <span className="text-red-500">{error}</span>
      <button className="w-full p-3 mt-2 bg-blue-600 text-white rounded-lg">
        Buscar
      </button>
    </form>
  );
}
