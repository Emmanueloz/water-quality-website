import { Profile } from "@/domain/models/profile";

export default function EditQuestionRecover({
  userProfile,
}: {
  userProfile: Profile | null;
}) {
  return (
    <form className="flex flex-col w-full max-w-md gap-3 border-2 border-gray-300 p-4 rounded-lg">
      <section className="flex flex-col gap-2">
        <label htmlFor="" className="font-semibold text-sm">
          Pregunta 1
        </label>
        <select className="p-2 border rounded-lg text-sm w-full">
          <option value={-1}>Selecciona una pregunta</option>
        </select>
        <label htmlFor="" className="font-semibold text-sm">
          Respuesta
        </label>
        <input
          type="text"
          id=""
          value=""
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </section>
      <section className="flex flex-col gap-2">
        <label htmlFor="" className="font-semibold text-sm">
          Pregunta 2
        </label>
        <select className="p-2 border rounded-lg text-sm w-full">
          <option value={-1}>Selecciona una pregunta</option>
        </select>
        <label htmlFor="" className="font-semibold text-sm">
          Respuesta
        </label>
        <input
          type="text"
          id=""
          value=""
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </section>
    </form>
  );
}
