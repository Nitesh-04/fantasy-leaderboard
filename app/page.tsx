"use client";

import { useState, useEffect } from "react";
import { Trophy, TrendingUp } from "lucide-react";

interface Player {
  id: number | string;
  name: string;
  totalPoints: number;
}

interface Match {
  id: number | string;
  name: string;
  points: number[];
}

export default function IPLLeaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [playersRes, matchesRes] = await Promise.all([
          fetch("/api/players"),
          fetch("/api/matches"),
        ]);

        if (!playersRes.ok || !matchesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const playersData: Player[] = await playersRes.json();
        const matchesData: Match[] = await matchesRes.json();

        setPlayers(playersData);
        setMatches(matchesData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-950">
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Trophy className="text-orange-500 mr-3" size={36} />
            <h1 className="text-3xl font-bold">IPL Fantasy Leaderboard</h1>
          </div>
          <div className="bg-orange-500 px-4 py-2 rounded-lg flex items-center">
            <TrendingUp className="mr-2" />
            <span className="font-bold">Season 2025</span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-800">
          <div className="bg-gray-800 text-gray-300 p-4 flex justify-between items-center">
            <h2 className="font-bold text-lg">Match History</h2>
            <span className="text-sm text-gray-400">Last {matches.length} matches</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-3 text-left">Match</th>
                  {players.map((player) => (
                    <th key={player.id} className="p-3 text-center">
                      {player.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="bg-gray-1000">
                  <td className="p-3">Total Points</td>
                  {players.map((player) => (
                    <td key={player.id} className="p-3 text-center">
                      <div>
                        <span className="inline-block px-2 py-1 rounded bg-yellow-900/40 text-yellow-200 ">
                          {player.totalPoints}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {matches.map((match) => (
                  <tr key={match.id} className="hover:bg-gray-800">
                    <td className="p-3">{match.name}</td>
                    {match.points.map((point, idx) => (
                      <td key={idx} className="p-3 text-center">
                        <span className="inline-block px-2 py-1 rounded">{point}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
