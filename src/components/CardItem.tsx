import Link from 'next/link';
import React from 'react';
import { Project, Game } from '@/tipos/tipos';

type CardItemProps = {
    nameModule: string;
    id: number;
    title: string;
    subtitle: string;
    item: Project | Game;
    openModal: (data?: any) => void;
    handleDelete: (id?: number) => void;
}

export default function CardItem({ nameModule, id, title, subtitle, openModal, item, handleDelete }: CardItemProps) {
    return <div
        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-96 flex flex-col"
    >
        <Link href={`/${nameModule}/${id}`}>
            <h3 className="text-lg font-semibold">{title}</h3>
        </Link>
        <p className="text-sm text-gray-600 mt-2 flex-grow">{subtitle}</p>
        <div className="flex justify-between mt-4">
            <button
                onClick={() => openModal(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
            >
                Editar
            </button>
            <button
                onClick={() => handleDelete(id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
                Eliminar
            </button>
        </div>
    </div>
}
