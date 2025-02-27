import {
  createQuestionRecoverUser,
  getQuestionRecoverUserById,
  updateQuestionRecoverUser,
} from "@/app/login/actions";
import { Profile } from "@/domain/models/profile";
import {
  QuestionRecoverUser,
  SecurityQuestion,
  SecurityQuestionText,
} from "@/domain/models/QuestionRecover";
import { useEffect, useState } from "react";

export default function EditQuestionRecover({
  userProfile,
}: {
  userProfile: Profile | null;
}) {
  const [question1, setQuestion1] = useState<SecurityQuestion | "">("");
  const [question2, setQuestion2] = useState<SecurityQuestion | "">("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [oldQuestions,setOldQuestions] = useState<QuestionRecoverUser[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const getQuestions = async (id: number) => {
    const questions = await getQuestionRecoverUserById(id, true);
    if (questions.length > 0) {
      setIsEdit(true);

      setQuestion1(questions[0].questionNum);
      setQuestion2(questions[1].questionNum);
      setAnswer1(questions[0].answer);
      setAnswer2(questions[1].answer);
      setOldQuestions(questions);
    } else {
      setIsEdit(false);
    }
  };

  const isValid = () => {
    const qt1 = question1 !== "" && Number(question1) >= 0;
    const qt2 = question2 !== "" && Number(question2) >= 0;

    const ans1 =
      answer1.trim() !== "" &&
      answer1.trim().length >= 3 &&
      answer1.trim().length <= 100;
    const ans2 =
      answer2.trim() !== "" &&
      answer2.trim().length >= 3 &&
      answer2.trim().length <= 100;

    return qt1 && qt2 && ans1 && ans2;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const valid = isValid();

    console.log(valid);

    if (!valid) {
      setError("Por favor ingresa un valor válido");
      return;
    }

    if (isEdit) {
      console.log("editando");
      
      const answers = oldQuestions.map((q, index) => {
        if (index === 0) {
          return {
            id: q.id,
            questionNum: question1 as number,
            answer: answer1,
            idUser: userProfile?.id ?? 0,
          };
        } else {
          return {
            id: q.id,
            questionNum: question2 as number,
            answer: answer2,
            idUser: userProfile?.id ?? 0,
          };
        }
      });

      await updateQuestionRecoverUser(userProfile?.id ?? 0, answers);
      setMessage("Cambios guardados");
      
    } else {
      console.log("agregando");

      const answers = [
        {
          id: 0,
          questionNum: question1 as number,
          answer: answer1,
          idUser: userProfile?.id ?? 0,
        },
        {
          id: 0,
          questionNum: question2 as number,
          answer: answer2,
          idUser: userProfile?.id ?? 0,
        },
      ];

      await createQuestionRecoverUser(userProfile?.id ?? 0, answers);
      setIsEdit(true)
    }

    setError("");
  };

  useEffect(() => {
    if (userProfile) {
      getQuestions(userProfile.id);
    }
  }, [userProfile]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md gap-3 border-2 border-gray-300 p-4 rounded-lg"
    >
      <span className="text-green-500">
        {message}
      </span>
      <section className="flex flex-col gap-2">
        <label htmlFor="question1" className="font-semibold text-sm">
          Pregunta 1
        </label>
        <select
          id="question1"
          value={question1}
          onChange={(e) =>
            setQuestion1(Number(e.target.value) as SecurityQuestion)
          }
          className="p-2 border rounded-lg text-sm w-full"
        >
          <option value={-1}>Selecciona una pregunta</option>
          {Object.values(SecurityQuestion)
            .filter(
              (value) =>
                typeof value === "number" &&
                (value !== question2 || (value as number) === -1)
            )
            .map((value) => (
              <option key={value} value={value}>
                {SecurityQuestionText[value as SecurityQuestion]}
              </option>
            ))}
        </select>
        <label htmlFor="answer1" className="font-semibold text-sm">
          Respuesta
        </label>
        <input
          type="text"
          id="answer1"
          minLength={3}
          maxLength={100}
          value={answer1}
          onChange={(value) => setAnswer1(value.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </section>
      <section className="flex flex-col gap-2">
        <label htmlFor="question2" className="font-semibold text-sm">
          Pregunta 2
        </label>
        <select
          id="question2"
          value={question2}
          onChange={(e) =>
            setQuestion2(Number(e.target.value) as SecurityQuestion)
          }
          className="p-2 border rounded-lg text-sm w-full"
        >
          <option value={-1}>Selecciona una pregunta</option>
          {Object.values(SecurityQuestion)
            .filter(
              (value) =>
                typeof value === "number" &&
                (value !== question1 || (value as number) === -1)
            )
            .map((value) => (
              <option key={value} value={value}>
                {SecurityQuestionText[value as SecurityQuestion]}
              </option>
            ))}
        </select>
        <label htmlFor="answer2" className="font-semibold text-sm">
          Respuesta
        </label>
        <input
          type="text"
          id="answer2"
          minLength={3}
          maxLength={100}
          value={answer2}
          onChange={(value) => setAnswer2(value.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </section>
      {error && <span className="text-red-500">{error}</span>}

      <button
        type="submit"
        className={`p-2 rounded-lg font-semibold text-sm text-white bg-blue-500 hover:bg-blue-600`}
      >
        {isEdit ? "Editar" : "Agregar"}
      </button>
    </form>
  );
}
