"use client";
import {
  getQuestionRecoverUserByUser,
  isValidAnswer,
} from "@/app/login/actions";
import { updatePassword } from "@/app/reset-password/actions";
import {
  QuestionRecoverUser,
  SecurityQuestionText,
} from "@/domain/models/QuestionRecover";
import { resetPasswordSchema } from "@/schemas/validations";
import { useState } from "react";

export default function PasswordRecoveryByQuestion() {
  const [userId, setUserId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<QuestionRecoverUser[]>([]);
  const [user, setUser] = useState("");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [message, setMessage] = useState("");

  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ password: "", confirmPassword: "" });

  const [showPassword, setShowPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const [isQuestion, setIsQuestion] = useState(false);

  const handleSubmitSearchUser = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    if (!user) {
      setError("Por favor ingresa un usuario");
      setLoading(false);
      return;
    }

    const questionsRecoverUser = await getQuestionRecoverUserByUser(user);

    if (!questionsRecoverUser || questionsRecoverUser.length === 0) {
      setError("Usuario no encontrado o no tiene respuestas");
      setLoading(false);
      return;
    }



    setUserId(questionsRecoverUser[0]?.idUser ?? 0);
    setQuestions(questionsRecoverUser);
    setIsQuestion(true);

    setLoading(false);
  };

  const validateAnswer = async () => {
    const validationResults = await Promise.all(
      Object.keys(answers).map(async (key) => {
        const id = parseInt(key);
        console.log(answers[id]);
        return isValidAnswer(id, answers[id] ?? "", userId ?? 0); // Server action
      })
    );

    return validationResults
  };

  const handleSubmitValidAnswer = async () => {
    const validationResults = await validateAnswer();

    console.log(validationResults);

    if (validationResults.every((answer) => answer)) {
      setIsValid(true);
      setError("Respuesta correcta");
    } else {
      setError("Respuestas incorrectas");
      setIsValid(false);
    }

    console.log(answers);
  };

  const handleSubmit = async () => {
    const result = resetPasswordSchema.safeParse(data);

    if (!result.success) {
      const errors = result.error.format();
      setErrorPassword({
        password: errors.password?._errors[0],
        confirmPassword: errors.confirmPassword?._errors[0],
      });
    } else {
      await updatePassword(userId ?? 0, data.password);

      setErrorPassword({});
      setIsValid(false);
      setData({ password: "", confirmPassword: "" });
      setUser("");
      setQuestions([]);
      setIsQuestion(false);
      setError("");
      setAnswers({});
      setMessage("Contraseña actualizada correctamente");
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col w-full max-w-md gap-4 border-2 border-gray-300 p-6 rounded-lg"
    >
      {!isQuestion && (
        <>
          {message && <p className="mt-4 text-center">{message}</p>}
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
      {isQuestion && !isValid && (
        <>
          {questions.map((question,key) => (
            <div key={question.id}>
              <label className="font-semibold">
                {`${key+1}.- ` }
                {
                  SecurityQuestionText[
                    question.questionNum as keyof typeof SecurityQuestionText
                  ]
                }
              </label>
              <input
                type="text"
                maxLength={50}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                placeholder="Respuesta"
                value={answers[question.id] ?? ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [question.id]: e.target.value })
                }
              />
            </div>
          ))}
          <span className="text-red-500">{error}</span>
          <button
            onClick={handleSubmitValidAnswer}
            className="w-full p-3 mt-2 bg-blue-600 text-white rounded-lg"
          >
            Buscar
          </button>
        </>
      )}
      {isValid && isQuestion && (
        <>
          <h3 className="font-semibold">
            Cambiar contraseña para el usuario:
            <span className="font-normal capitalize"> {user}</span>
          </h3>
          <div>
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className={`w-full p-3 border border-gray-300 rounded-lg mt-2 transition-all ${
                errorPassword.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errorPassword.password && (
              <span className="text-sm text-red-500 mt-1">
                {errorPassword.password}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="font-semibold">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
              className={`w-full p-3 border border-gray-300 rounded-lg mt-2 transition-all ${
                errorPassword.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {errorPassword.confirmPassword && (
              <span className="text-sm text-red-500 mt-1">
                {errorPassword.confirmPassword}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="mr-2"
              />
              <label
                htmlFor="showPassword"
                className="text-sm font-medium text-gray-700"
              >
                Mostrar contraseña
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-3 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition-all"
          >
            Confirmar
          </button>
        </>
      )}
    </form>
  );
}
