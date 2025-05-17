"use server"
import { NextResponse } from "next/server";
import prisma from "@/utils/db";

interface ScoreInput {
    playerName: string;
    points: number;
}

interface UpdateScoreRequest {
    matchName : string;
    isWashedOut?: boolean;
    scores : ScoreInput[]
}

export async function POST(request: Request) {
    const body: UpdateScoreRequest = await request.json();
    const { matchName, isWashedOut, scores } = body;

    if (!matchName || !scores) {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    try {
        const match = await prisma.match.create({
            data: {
                matchName,
                isWashedOut,
                scores: {
                    create: scores.map((score) => ({
                        playerName: score.playerName,
                        points: score.points,
                    })),
                },
            },
            include: {
                scores: true,
            },
        });

        await Promise.all(
            scores.map(({playerName, points}) => 
                prisma.player.update({
                    where :{name: playerName},
                    data: { totalPoints : { increment: points }},
                })
            )
        );

        return NextResponse.json({ message: "Match updated successfully", match });
    }
    catch (error) {
        console.error("Error updating match:", error);
        return NextResponse.json({ error: "Failed to update match" }, { status: 500 });
    }

}
