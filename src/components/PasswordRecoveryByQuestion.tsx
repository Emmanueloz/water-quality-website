"use client";
import { getQuestionRecoverUserByUser } from "@/app/login/actions";
import {
  QuestionRecoverUser,
  SecurityQuestion,
  SecurityQuestionText,
} from "@/domain/models/QuestionRecover";
import { useEffect, useState } from "react";

export default function PasswordRecoveryByQuestion() {
  const [question, setQuestion] = useState<QuestionRecoverUser | null>(null);
  const [user, setUser] = useState("");
  const [answer, setAnswer] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [isQuestion, setIsQuestion] = useState(false);

  const handleSubmitSearchUser = async () => {
    setLoading(true);
    setError("");

    if (!user) {
      setError("Por favor ingresa un usuario");
      setLoading(false);
      return;
    }

    const questionRecoverUser = await getQuestionRecoverUserByUser(user);

    if (!questionRecoverUser) {
      setError("Usuario no encontrado");
      setLoading(false);
      return;
    }

    setQuestion(questionRecoverUser);
    setIsQuestion(true);

    setLoading(false);
  };

  useEffect(() => {
    console.log(question);
    
    console.log("questionNum:", question?.questionNum);
    console.log("SecurityQuestionText:", SecurityQuestionText);
  }, [question]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col w-full max-w-md gap-4 border-2 border-gray-300 p-6 rounded-lg"
    >
      {!isQuestion && (
        <>
          <label className="font-semibold">Usuario</label>
          <input
            type="text"
            maxLength={50}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <span className="text-red-500">{error}</span>
          <button
            onClick={handleSubmitSearchUser}
            className="w-full p-3 mt-2 bg-blue-600 text-white rounded-lg"
          >
            Buscar
          </button>
        </>
      )}
      {isQuestion && (
        <>
          <label className="font-semibold">
            {
              SecurityQuestionText[
                question?.questionNum as keyof typeof SecurityQuestionText
              ]
            }
          </label>

          <input
            type="text"
            maxLength={50}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            placeholder="Pregunta"
          />
          <span className="text-red-500">{error}</span>
          <button className="w-full p-3 mt-2 bg-blue-600 text-white rounded-lg">
            Buscar
          </button>
        </>
      )}
    </form>
  );
}
