// src/components/Leaderboard.tsx
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PixelatedAvatar from './PixelatedAvatar';

interface LeaderboardEntry {
  name: string;
  level: number;
  xp: number;
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Simulate fetching live data
    const fetchData = () => {
      // Replace this with actual data fetching logic
      const data = [
        { name: "Alice", level: 5, xp: 1200 },
        { name: "Bob", level: 4, xp: 900 },
        { name: "Charlie", level: 3, xp: 600 },
      ];
      setLeaderboardData(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="pixel-text">Top Stellar Explorers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((user, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="font-bold pixel-text">{index + 1}.</span>
                <PixelatedAvatar name={user.name} size={32} />
                <span className="pixel-text">{user.name}</span>
              </div>
              <div>
                <span className="mr-2 pixel-text">Level {user.level}</span>
                <span className="text-gray-400 pixel-text">{user.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
