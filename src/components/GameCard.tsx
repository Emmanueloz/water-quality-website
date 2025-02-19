"use client";
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthProvider';
import { Game } from '@/domain/models/Game';
type GameProps = {
    id: number;
}

const GameCard: React.FC<GameProps> = ({ id }) => {
    const { userProfile } = useContext(AuthContext);
    const [game, setGame] = useState<Game | null>(null);

    const getGameById = async () => {
        const response = await fetch(`/api/juegos?userId=${userProfile?.id}&gameId=${id}`);
        const data = await response.json();
        if (response.ok) {
            console.log("Juegos obtenido:", data);
            setGame(data.data);
        } else {
            console.error("Error al obtener los juegos:", data.message);
        }
    };

    useEffect(() => {
        if (userProfile?.id) {
            getGameById();
        }
    }, [userProfile]);
    return (
        <div className="flex justify-center items-center ">
            <div
                key={game?.id}
                className="bg-white border mt-5 border-gray-200 rounded-xl shadow-sm w-3/5 overflow-hidden"
            >
                <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 truncate text-center">{game?.name}</h3>

                    <div className="space-y-2 w-4/5 mx-auto">
                        {game?.nameUser && <div className="flex items-center ">
                            <span className="text-base font-bold text-gray-500 w-auto mr-3">Usuario:</span>
                            <p className="text-base text-center text-gray-700 truncate">{game?.nameUser}</p>
                        </div>}
                        <div className="flex items-cente">
                            <span className="text-base font-medium text-gray-500 w-auto mr-3">Categoría:</span>
                            <p className="text-base text-gray-700">{game?.category}</p>
                        </div>
                        <div className="flex items-center ">
                            <span className="text-base font-bold text-gray-500 w-auto mr-3">Descripción:</span>
                            <p className="text-base text-center text-gray-700 truncate">{game?.description}</p>
                        </div>
                        <div className="flex items-center">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameCard