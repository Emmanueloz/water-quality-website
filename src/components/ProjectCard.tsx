"use client";
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthProvider';
import { Project } from '@/domain/models/Project';
type ProjectProps = {
    id: number;
}

const ProjectCard: React.FC<ProjectProps> = ({ id }) => {
    const { userProfile } = useContext(AuthContext);
    const [project, setProject] = useState<Project | null>(null);

    const getProjectById = async () => {
        const response = await fetch(`/api/proyectos?userId=${userProfile?.id}&projectId=${id}`);
        const data = await response.json();
        if (response.ok) {
            console.log("Proyecto obtenido:", data);
            setProject(data.data);
        } else {
            console.error("Error al obtener los proyectos:", data.message);
        }
    };

    useEffect(() => {
        if (userProfile?.id) {
            getProjectById();
        }
    }, [userProfile]);
    return (
        <div className="flex justify-center items-center ">
            <div
                key={project?.id}
                className="bg-white border mt-5 border-gray-200 rounded-xl shadow-sm w-3/5 overflow-hidden"
            >
                <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 truncate text-center">{project?.name}</h3>

                    <div className="space-y-2 w-4/5 mx-auto">
                       {project?.nameUser &&  <div className="flex items-center ">
                            <span className="text-base font-bold text-gray-500 w-auto mr-3">Usuario:</span>
                            <p className="text-base text-center text-gray-700 truncate">{project?.nameUser}</p>
                        </div>}
                        <div className="flex items-center ">
                            <span className="text-base font-bold text-gray-500 w-auto mr-3">Descripción:</span>
                            <p className="text-base text-center text-gray-700 truncate">{project?.description}</p>
                        </div>

                        <div className="flex items-cente">
                            <span className="text-base font-medium text-gray-500 w-auto mr-3">Categoría:</span>
                            <p className="text-base text-gray-700">{project?.category}</p>
                        </div>

                        <div className="flex items-center">
                            <span className="text-base font-medium text-gray-500 w-auto mr-3">Status:</span>
                            <span
                                className={`text-base px-2 py-1 rounded-full ${project?.status === 'Completado'
                                    ? 'bg-green-100 text-green-800'
                                    : project?.status === 'En Proceso'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}
                            >
                                {project?.status}
                            </span>
                        </div>

                        <div className="flex items-center w-auto mr-3">
                            <span className="text-base font-medium text-gray-500 w-24">Tecnologías:</span>
                            <p className="text-base text-gray-700 truncate">{project?.technologies}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard