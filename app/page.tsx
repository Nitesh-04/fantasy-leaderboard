"use client"

import { useState } from 'react';
import { Trophy,TrendingUp} from 'lucide-react';

export default function IPLLeaderboard() {
  const [players] = useState([
    { id: 1, name: "k1dlov3r", totalPoints: 24,},
    { id: 2, name: "neats", totalPoints: 20,},
    { id: 3, name: "soberanish", totalPoints: 14,},
    { id: 4, name: "oik", totalPoints: 22,},
  ]);

  const [matches] = useState([
    { id: 1, name: "PBKS vs DC", points: [2, 0, 1, 3] },
    { id: 2, name: "RCB vs MI", points: [1, 2, 0, 1] },
    { id: 3, name: "CSK vs KKR", points: [3, 0, 2, 1] },
    { id: 4, name: "RR vs SRH", points: [1, 3, 0, 2] },
    { id: 5, name: "GT vs LSG", points: [0, 2, 1, 1] },
    { id: 6, name: "MI vs CSK", points: [2, 1, 0, 3] },
    { id: 7, name: "DC vs KKR", points: [1.5, 1.5, 1.5, 1.5] },
    { id: 8, name: "PBKS vs RR", points: [3, 1, 2, 0] },
    { id: 9, name: "SRH vs GT", points: [0, 3, 1, 2] },
    { id: 10, name: "RCB vs LSG", points: [2, 1, 3, 0] },
    { id: 11, name: "KKR vs MI", points: [1, 0, 2, 3] },
    { id: 12, name: "CSK vs PBKS", points: [1.5, 1.5, 1.5, 1.5] },
    { id: 13, name: "DC vs RCB", points: [0, 3, 1, 2] },
  ])

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
            <span className="text-sm text-gray-400">Last 13 matches</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-3 text-left">Match</th>
                  <th className="p-3 text-center">k1dlov3r</th>
                  <th className="p-3 text-center">neats</th>
                  <th className="p-3 text-center">soberanish</th>
                  <th className="p-3 text-center">oik</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">

                <tr className='bg-gray-1000'>
                  <td className='p-3'>Total Points</td>
                  {players.map((player) => (
                    <td className='p-3 text-center'>
                      <div key={player.id} className="">
                        <span className={"inline-block px-2 py-1 rounded bg-yellow-900/40 text-yellow-200 "}>{player.totalPoints}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {matches.map((match) => (
                  <tr key={match.id} className="hover:bg-gray-800">
                    <td className="p-3">{match.name}</td>
                    {match.points.map((point, idx) => (
                      <td key={idx} className="p-3 text-center">
                        <span className={`inline-block px-2 py-1 rounded`}>
                          {point}
                        </span>
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