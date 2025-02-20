import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ProjectService } from "@/services/ProjectService";
import { ProjectRepositoryImpl } from "@/infrastructure/repositories/ProjectRepositoryImpl";
import { Project } from "@/domain/models/Project";
import {
    createProjectSchema,
    updateProjectSchema,
    validateData
} from "@/schemas/validations";

const projectRepository = new ProjectRepositoryImpl();
const projectService = new ProjectService(projectRepository);

const userIdSchema = z.number().int().positive();

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");
    const projectId = req.nextUrl.searchParams.get("projectId");
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");

    try {
        const validUserId = validateData(userIdSchema, Number(userId));

        let projects: Project[] = [];
        let project: Project | null = null;

        if (userId && !projectId && !page && !limit) {
            projects = await projectService.getAllProjectsByUser(validUserId);
        } else if (userId && projectId) {
            project = await projectService.getProjectById(
                Number(projectId),
                validUserId
            );
        } else if (page && limit) {
            projects = await projectService.getPaginatedProjectsByUser(validUserId, Number(page), Number(limit));
        }

        return NextResponse.json({
            message: "Proyectos obtenidos correctamente",
            data: project ? project : projects,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "ID de usuario inválido" },
                { status: 400 }
            );
        }
        console.error(error);
        return NextResponse.json(
            { message: "Error en el servidor" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const validatedData = validateData(createProjectSchema.extend({ idUser: z.number().int().positive() }), data);

        const newProject = await projectService.createProject(validatedData);

        return NextResponse.json({
            message: "Proyecto creado correctamente",
            project: newProject,
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }
        console.error(error);
        return NextResponse.json(
            { message: "Error en el servidor" },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    const projectId = Number(req.nextUrl.searchParams.get("projectId"));

    try {
        // Validate project ID
        const validProjectId = validateData(
            z.number().int().positive(),
            projectId
        );

        const data = await req.json();

        const validatedData = validateData(
            updateProjectSchema.extend({
                id: z.number().int().positive(),
                idUser: z.number().int().positive()
            }),
            { ...data, id: validProjectId }
        );

        const project: Project = {
            id: validatedData.id,
            name: validatedData.name!,
            description: validatedData.description!,
            category: validatedData.category!,
            status: validatedData.status!,
            technologies: validatedData.technologies!,
            idUser: validatedData.idUser,
        };



        const updatedProject = await projectService.updateProject(project);

        return NextResponse.json({
            message: "Proyecto actualizado correctamente",
            project: updatedProject,
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }
        console.error(error);
        return NextResponse.json(
            { message: "Error en el servidor" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    const projectId = Number(req.nextUrl.searchParams.get("projectId"));

    try {
        // Validate project ID
        const validProjectId = validateData(
            z.number().int().positive(),
            projectId
        );

        await projectService.deleteProject(validProjectId);

        return NextResponse.json({
            message: "Proyecto eliminado correctamente"
        });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }
        console.error(error);
        return NextResponse.json(
            { message: "Error en el servidor" },
            { status: 500 }
        );
    }
}