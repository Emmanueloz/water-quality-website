"use client";

import { useEffect, useRef, useState } from "react";

function ButtonDialog({
  title,
  label,
  message,
  accentColor,
  handleAccept,
}: {
  title: string;
  label: string;
  message: string;
  accentColor: string;
  handleAccept: () => void;
}) {
  const [isOpenDialog, setOpenDialog] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpenDialog) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpenDialog]);

  return (
    <>
      <button
        className={`p-2 border border-${accentColor} text-${accentColor} rounded-lg hover:bg-${accentColor} hover:text-white transition-colors duration-300`}
        onClick={() => setOpenDialog(true)}
      >
        {label}
      </button>
      <dialog
        ref={dialogRef}
        className="w-full mb-10 rounded-lg md:w-96 md:m-auto"
      >
        <div className="h-80 p-5 flex flex-col gap-2 md:h-min">
          <button
            className="hidden absolute md:block top-2 right-2"
            onClick={() => setOpenDialog(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#9ca3af"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
          <article className="flex-grow text-center">
            <h3 className="text-xl font-bold">{title}</h3>
            <p>{message}</p>
          </article>
          <article className="flex flex-col gap-2 md:flex-row-reverse">
            <button
              onClick={() => {
                handleAccept();
                setOpenDialog(false);
              }}
              className={`p-2  rounded-lg bg-${accentColor} text-white transition-colors duration-300`}
            >
              {label}
            </button>
            <button
              className="p-2 border border-gray-400 text-gray-400 rounded-lg hover:bg-gray-400 hover:text-white  transition-colors duration-300"
              onClick={() => setOpenDialog(false)}
            >
              Cancelar
            </button>
          </article>
        </div>
      </dialog>
    </>
  );
}

export { ButtonDialog };
