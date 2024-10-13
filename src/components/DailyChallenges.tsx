import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Challenge {
  name: string;
  description: string;
  reward: number;
  completed: boolean;
}

export default function DailyChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    // Simulate fetching live data
    const fetchData = () => {
      // Replace this with actual data fetching logic
      const data = [
        { name: "Challenge 1", description: "Complete task 1", reward: 100, completed: false },
        { name: "Challenge 2", description: "Complete task 2", reward: 200, completed: true },
      ];
      setChallenges(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge, index) => (
        <Card key={index} className={`bg-gray-800 border-gray-700 ${challenge.completed ? 'border-green-500' : ''}`}>
          <CardHeader>
            <CardTitle className="pixel-text">{challenge.name}</CardTitle>
            <CardDescription>{challenge.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2 pixel-text">Reward: {challenge.reward} XP</p>
            {challenge.completed ? (
              <span className="text-green-400 pixel-text">Completed!</span>
            ) : (
              <Button className="w-full pixel-text">Start Challenge</Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
