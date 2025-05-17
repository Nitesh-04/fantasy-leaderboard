import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      include: {
        scores: {
          select: {
            playerName: true,
            points: true,
          },
        },
      },
      orderBy: { date: 'desc' },
    });

    const fixedPlayerOrder = ["k1dlov3r", "neats", "soberanish", "oik"];

    const formattedMatches = matches.map(match => {
      const points = fixedPlayerOrder.map(playerName => {
        const score = match.scores.find(s => s.playerName === playerName);
        return score ? score.points : 0;
      });

      return {
        id: match.id,
        name: match.matchName,
        points,
      };
    });

    return NextResponse.json(formattedMatches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}
