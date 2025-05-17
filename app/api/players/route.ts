import prisma from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      select: {
        id: true,
        name: true,
        totalPoints: true,
      },
    });

    const fixedPlayerOrder = ["k1dlov3r", "neats", "soberanish", "oik"];

    players.sort((a, b) => {
      return fixedPlayerOrder.indexOf(a.name) - fixedPlayerOrder.indexOf(b.name);
    });

    return NextResponse.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}
