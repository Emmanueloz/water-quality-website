"use client";
import { useState } from "react";
import FormMaterias from "@/components/FormMaterias";

export default function ModalFormMaterias({
  id_usuario,
  materia,
}: {
  id_usuario: number;
  materia?: IMateria | null;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button
        className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-500 transition-all duration-300"
        type="button"
        onClick={handleModalToggle} // Abre o cierra el modal
      >
        {materia ? "Editar Materia" : "Agregar Materia"}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="modalFormMateria"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="relative p-6 w-full max-w-lg h-full md:h-auto bg-white rounded-xl shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-300">
              <h3 className="text-2xl font-semibold text-gray-900">
                {materia ? "Editar Materia" : "Agregar Materia"}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-900 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-2"
                onClick={handleModalToggle} // Cierra el modal
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 7.586l4.293-4.293a1 1 0 111.414 1.414L11.414 9l4.293 4.293a1 1 0 11-1.414 1.414L10 10.414l-4.293 4.293a1 1 0 11-1.414-1.414L8.586 9 4.293 4.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
            </div>
            <div className="px-4 py-6">
              {/* Aquí se carga el formulario FormMaterias */}
              <FormMaterias id_usuario={id_usuario} materia={materia} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
