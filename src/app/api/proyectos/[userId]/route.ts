import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/services/ProjectService";
import { ProjectRepositoryImpl } from "@/infrastructure/repositories/ProjectRepositoryImpl";

const projectRepository = new ProjectRepositoryImpl();
const projectService = new ProjectService(projectRepository);
export async function GET(req: NextRequest, { params }: { params: { userId: number } }) {
    const { userId } = params;
    console.log(typeof userId);

    if (!userId) {
        return NextResponse.json({ message: "El ID de usuario es requerido" }, { status: 400 });
    }

    try {
        const projects = await projectService.getAllProjectsByUser(userId);
        return NextResponse.json({
            message: "Proyectos obtenidos correctamente",
            projects,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error en el servidor" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const { name, description, category, status, technologies, idUser } = await req.json();

    if (!name || !description || !category || !status || !technologies || !idUser) {
        return NextResponse.json(
            { message: "Todos los campos son requeridos" },
            { status: 400 }
        );
    }

    try {
        const newProject = await projectService.createProject({
            name,
            description,
            category,
            status,
            technologies,
            idUser,
        });

        return NextResponse.json({
            message: "Proyecto creado correctamente",
            project: newProject,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error en el servidor" },
            { status: 500 }
        );
    }
}