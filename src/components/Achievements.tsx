  // src/components/Achievements.tsx
  import React, { useState, useEffect } from "react";
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
  
  interface Achievement {
    name: string;
    description: string;
    completed: boolean;
  }
  
  export default function Achievements() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    useEffect(() => {
      // Simulate fetching live data
      const fetchData = () => {
        // Replace this with actual data fetching logic
        const data = [
          { name: "Liquidity Provider", description: "Provide liquidity to a DeFi pool", completed: true },
          { name: "Meme Trader", description: "Trade a meme coin successfully", completed: false },
          { name: "Yield Farmer", description: "Stake tokens in a yield farm", completed: false },
          { name: "Governance Guru", description: "Participate in a DeFi governance vote", completed: true },
          { name: "HODLer", description: "Hold a meme coin through a market dip", completed: false },
          { name: "Whale Watcher", description: "Track a whale's trading activity", completed: true },
          { name: "Pump and Dump Survivor", description: "Survive a pump and dump scheme", completed: false },
          { name: "DeFi Explorer", description: "Explore a new DeFi protocol", completed: true },
          { name: "Meme Coin Collector", description: "Collect 5 different meme coins", completed: false },
          { name: "Market Analyst", description: "Predict a market trend correctly", completed: true },
        ];
        setAchievements(data);
      };

      fetchData();
      const interval = setInterval(fetchData, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <Card key={index} className={`bg-gray-800 border-gray-700 ${achievement.completed ? 'border-green-500' : ''}`}>
            <CardHeader>
              <CardTitle className="pixel-text">{achievement.name}</CardTitle>
              <CardDescription>{achievement.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {achievement.completed ? (
                <span className="text-green-400 pixel-text">Completed!</span>
              ) : (
                <span className="text-yellow-400 pixel-text">In Progress</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
