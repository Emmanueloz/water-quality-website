import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GameService } from "@/services/GameService";
import { GameRepositoryImpl } from "@/infrastructure/repositories/GameRepositorylmpl";
import { Game } from "@/domain/models/Game";
import {
    createGameSchema,
    updateGameSchema,
    validateData
} from "@/schemas/validations";

const gameRepository = new GameRepositoryImpl();
const gameService = new GameService(gameRepository);

const userIdSchema = z.number().int().positive();

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");
    const gameId = req.nextUrl.searchParams.get("gameId");
    const page = req.nextUrl.searchParams.get("page");
    const limit = req.nextUrl.searchParams.get("limit");


    console.log(req.nextUrl.searchParams);


    try {
        const validUserId = validateData(userIdSchema, Number(userId));
        console.log("User id valid juegos: ", validUserId);


        let games: Game[] = [];
        let game: Game | null = null;

        if (userId && !gameId && !page && !limit) {
            games = await gameService.getAllGamesByUser(validUserId);
        } else if (userId && gameId) {
            game = await gameService.getGamesById(
                Number(gameId),
                validUserId
            );
        } else if (page && limit) {
            games = await gameService.getPaginatedProjectsByUser(validUserId, Number(page), Number(limit));
        }

        return NextResponse.json({
            message: "juegos obtenidos correctamente",
            data: game ? game : games,
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

        const validatedData = validateData(createGameSchema.extend({ idUser: z.number().int().positive() }), data);

        const newGame = await gameService.createGame(validatedData);

        return NextResponse.json({
            message: "Juego creado correctamente",
            game: newGame,
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
    const gameId = Number(req.nextUrl.searchParams.get("gameId"));

    try {
        // Validate project ID
        const validGameId = validateData(
            z.number().int().positive(),
            gameId
        );

        const data = await req.json();

        const validatedData = validateData(
            updateGameSchema.extend({
                id: z.number().int().positive(),
                idUser: z.number().int().positive()
            }),
            { ...data, id: validGameId }
        );

        const game: Game = {
            id: validatedData.id,
            name: validatedData.name!,
            description: validatedData.description!,
            category: validatedData.category!,
            idUser: validatedData.idUser,
        };



        const updateGame = await gameService.updateGame(game);

        return NextResponse.json({
            message: "Juego actualizado correctamente",
            game: updateGame,
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
    const gameId = Number(req.nextUrl.searchParams.get("gameId"));

    try {
        // Validate project ID
        const validGameId = validateData(
            z.number().int().positive(),
            gameId
        );

        await gameService.deleteGame(validGameId);

        return NextResponse.json({
            message: "Juego eliminado correctamente"
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