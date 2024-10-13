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
        { name: "DeFi Challenge 1", description: "Provide liquidity to a pool", reward: 100, completed: false },
        { name: "Trading Challenge 1", description: "Execute a trade on a decentralized exchange", reward: 200, completed: true },
        { name: "DeFi Challenge 2", description: "Stake tokens in a yield farm", reward: 150, completed: false },
        { name: "Trading Challenge 2", description: "Analyze market trends and make a prediction", reward: 250, completed: true },
        { name: "DeFi Challenge 3", description: "Participate in a governance vote", reward: 300, completed: false },
        { name: "Trading Challenge 3", description: "Set up a stop-loss order", reward: 350, completed: true },
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
