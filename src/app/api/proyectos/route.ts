import { NextRequest, NextResponse } from "next/server";
import { ProjectService } from "@/services/ProjectService";
import { ProjectRepositoryImpl } from "@/infrastructure/repositories/ProjectRepositoryImpl";
import { Project } from "@/domain/models/Project";

const projectRepository = new ProjectRepositoryImpl();
const projectService = new ProjectService(projectRepository);

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");
    const projectId = req.nextUrl.searchParams.get("projectId");
    if (!userId ) {
        return NextResponse.json({ message: "El ID de usuario es requerido" }, { status: 400 });
    }
    if (userId && isNaN(Number(userId))) {
        return NextResponse.json({ message: "El ID de usuario debe ser un número" }, { status: 400 });
    }
    
    try {
        let projects: Project[] = [];
        let project: Project | null = null;
        if(userId && !projectId){
            projects = await projectService.getAllProjectsByUser(Number(userId));
        }else if(userId && projectId){
            project = await projectService.getProjectById(Number(projectId), Number(userId));
        }
        return NextResponse.json({
            message: "Proyectos obtenidos correctamente",
            data: project ? project : projects,
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
        return NextResponse.json({ message: "Los campos son requeridos" }, { status: 400 });
    }
    if (name.length > 100 || description.length > 500 || category.length > 50 || technologies.length > 200) {
        return NextResponse.json({ message: "Longitud de campos excedida" }, { status: 400 });
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
