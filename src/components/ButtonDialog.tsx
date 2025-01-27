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
  const [isOpenDialog, setOpenDialog] = useState(true);
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
      <dialog ref={dialogRef} className="w-full mb-10 rounded-lg ">
        <div className="h-80 p-5 flex flex-col gap-1">
          <button className="hidden" onClick={() => setOpenDialog(false)}>
            X
          </button>
          <article className="flex-grow text-center ">
            <h3 className="text-xl font-bold">{title}</h3>
            <p>{message}</p>
          </article>
          <article className="flex flex-col gap-2">
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
              className="p-2 border border-gray-500 text-gray-500 rounded-lg hover:bg-gray-500  transition-colors duration-300"
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
