"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Player {
  id: string | number;
  name: string;
  totalPoints: number;
}

interface AddScoresModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
}

export default function AddScoresModal({ isOpen, onClose, players }: AddScoresModalProps) {
  const [matchName, setMatchName] = useState("");
  const [isWashedOut, setIsWashedOut] = useState(false);
  const [points, setPoints] = useState<number[]>([]);
  const [addDisable, setaddDisable] = useState(false);

  useEffect(() => {
    if (isWashedOut) {
      setPoints(players.map(() => 1.5));
    } else {
      setPoints(players.map(() => 0));
    }
  }, [isWashedOut, players]);

  const handlePointChange = (index: number, value: string) => {
    const newPoints = [...points];
    newPoints[index] = parseFloat(value) || 0;
    setPoints(newPoints);
  };

  const handleSubmit = async () => {
    setaddDisable(true);
    const body = {
        matchName,
        isWashedOut,
        scores: players.map((player, index) => ({
        playerName: player.name,
        points: points[index],
    })),
    };

    try {
      const res = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to add match scores");
      alert("Match scores added successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error submitting scores.");
    }
    finally
    {
      setaddDisable(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-gray-900 w-full max-w-lg rounded-xl p-6 shadow-lg border border-gray-700 text-white relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Add Match Scores</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Match Name</label>
          <input
            type="text"
            value={matchName}
            onChange={(e) => setMatchName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            id="washedOut"
            type="checkbox"
            checked={isWashedOut}
            onChange={() => setIsWashedOut(!isWashedOut)}
            className="mr-2"
          />
          <label htmlFor="washedOut">Washed Out</label>
        </div>

        <div className="space-y-2 mb-4">
        {players.map((player, index) => (
            <div key={player.id} className="flex justify-between items-center">
            <span>{player.name}</span>
            <input
                type="number"
                step="0.5"
                value={points[index]}
                disabled={isWashedOut}
                onChange={(e) => handlePointChange(index, e.target.value)}
                className="w-24 px-2 py-1 rounded bg-gray-800 border border-gray-700"
            />
            </div>
        ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={addDisable}
          className="mt-2 w-full bg-orange-500 hover:bg-orange-600 py-2 rounded font-semibold"
        >
          Submit Scores
        </button>
      </div>
    </div>
  );
}
