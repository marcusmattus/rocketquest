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
          { name: "Achievement 1", description: "Achieve task 1", completed: true },
          { name: "Achievement 2", description: "Achieve task 2", completed: false },
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
